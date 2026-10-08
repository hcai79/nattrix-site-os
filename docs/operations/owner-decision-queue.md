# Owner Decision Queue

This queue prevents setup work from blocking while preserving decisions that should not be guessed.

## Required before any live publishing

1. Confirm who may approve content publication, metadata changes, taxonomy changes, and affiliate updates for each site.
2. Confirm the disclosure language and the source of truth for affiliate relationships.
3. Confirm whether existing content may be materially rewritten or only upgraded in narrowly scoped sections.
4. Confirm analytics and Search Console access, or designate a manual export workflow.
5. Confirm whether staging exists for each WordPress site and whether the Portfolio Engine can be installed there.

## Required before automation expands

1. Define a budget, quality threshold, and monthly content cadence.
2. Select the model-provider account and the per-task model tiers to use in production automation.
3. Approve a data-retention policy for research, prompts, generated images, and reviewer feedback.
4. Define the first two sites to onboard and the owner of each site package.

## Recommended, not blocking

1. Add a CI runtime with PHP and the WordPress test library so Portfolio Engine tests run on every pull request.
2. Add a shared content inventory format that can be imported from each CMS.
3. Establish performance baselines for traffic, conversions, and revenue before broad content changes.
