<?php
/**
 * Plugin Name: Nattrix Portfolio Engine
 * Description: Shared structured-content and automation layer for Nattrix portfolio sites.
 * Version: 0.1.0
 * Author: Nattrix
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'NATTRIX_PORTFOLIO_ENGINE_VERSION', '0.1.0' );
define( 'NATTRIX_PORTFOLIO_ENGINE_FILE', __FILE__ );
define( 'NATTRIX_PORTFOLIO_ENGINE_DIR', plugin_dir_path( __FILE__ ) );

require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-plugin.php';
require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-content-types.php';
require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-meta-models.php';
require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-rest-controller.php';
require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-settings.php';

register_activation_hook( __FILE__, array( '\Nattrix\PortfolioEngine\Plugin', 'activate' ) );
register_deactivation_hook( __FILE__, array( '\Nattrix\PortfolioEngine\Plugin', 'deactivate' ) );

add_action(
    'plugins_loaded',
    static function () {
        \Nattrix\PortfolioEngine\Plugin::instance()->boot();
    }
);
