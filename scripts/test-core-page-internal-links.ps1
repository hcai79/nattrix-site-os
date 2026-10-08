[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [string]$InventoryPath,

    [Parameter(Mandatory)]
    [string]$SiteUrl,

    [Parameter(Mandatory)]
    [string]$OutputPath,

    [ValidateRange(1, 1000)]
    [int]$MaxPages = 40,

    [ValidateRange(0, 10000)]
    [int]$ThrottleMilliseconds = 250
)

$ErrorActionPreference = 'Stop'

$siteBase = [Uri]$SiteUrl
if ($siteBase.Scheme -ne 'https') {
    throw 'SiteUrl must use HTTPS.'
}

$inventory = Import-Csv -LiteralPath $InventoryPath
if (-not $inventory -or -not ($inventory[0].PSObject.Properties.Name -contains 'url')) {
    throw 'InventoryPath must be a CSV with a url column.'
}

$pages = $inventory | Select-Object -First $MaxPages
$links = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$linkSources = @{}

foreach ($page in $pages) {
    if ([string]::IsNullOrWhiteSpace($page.url)) {
        continue
    }

    try {
        $response = Invoke-WebRequest -Uri $page.url -UseBasicParsing -ErrorAction Stop
        foreach ($match in [regex]::Matches($response.Content, '(?i)<a\b[^>]*?\bhref\s*=\s*["'']([^"'']+)["'']')) {
            $href = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
            if ($href.StartsWith('#') -or $href.StartsWith('mailto:') -or $href.StartsWith('tel:')) {
                continue
            }

            try {
                $target = [Uri]::new([Uri]$page.url, $href)
                if ($target.Host -eq $siteBase.Host -and $target.Scheme -eq 'https') {
                    $normalizedTarget = $target.GetLeftPart([UriPartial]::Path).TrimEnd('/') + '/'
                    $null = $links.Add($normalizedTarget)
                    if (-not $linkSources.ContainsKey($normalizedTarget)) {
                        $linkSources[$normalizedTarget] = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
                    }
                    $null = $linkSources[$normalizedTarget].Add($page.url)
                }
            } catch {
                Write-Warning "Skipped malformed href '$href' found on $($page.url)."
            }
        }
    } catch {
        Write-Warning "Could not read source page $($page.url): $($_.Exception.Message)"
    }

    if ($ThrottleMilliseconds -gt 0) {
        Start-Sleep -Milliseconds $ThrottleMilliseconds
    }
}

$results = foreach ($link in $links | Sort-Object) {
    try {
        $response = Invoke-WebRequest -Uri $link -MaximumRedirection 0 -UseBasicParsing -ErrorAction Stop
        [pscustomobject]@{
            source_scope = Split-Path -Leaf $InventoryPath
            source_urls = ($linkSources[$link] | Sort-Object) -join ';'
            url = $link
            status_code = [int]$response.StatusCode
            result = 'ok'
        }
    } catch {
        $status = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { $null }
        [pscustomobject]@{
            source_scope = Split-Path -Leaf $InventoryPath
            source_urls = ($linkSources[$link] | Sort-Object) -join ';'
            url = $link
            status_code = $status
            result = $_.Exception.Message
        }
    }

    if ($ThrottleMilliseconds -gt 0) {
        Start-Sleep -Milliseconds $ThrottleMilliseconds
    }
}

$outputDirectory = Split-Path -Parent $OutputPath
if ($outputDirectory -and -not (Test-Path -LiteralPath $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}

$results | Export-Csv -LiteralPath $OutputPath -NoTypeInformation
Write-Host "Checked $($results.Count) unique internal URLs from $($pages.Count) source page(s). Results: $OutputPath"
