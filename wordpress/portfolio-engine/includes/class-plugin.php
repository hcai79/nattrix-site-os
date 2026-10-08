<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Plugin {
    private static ?Plugin $instance = null;

    public static function instance(): Plugin {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {}

    public function boot(): void {
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-content-types.php';
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-meta.php';
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-offers.php';
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-admin.php';
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-rest-api.php';

        add_action( 'init', array( $this, 'register_content_types' ) );
        add_action( 'init', array( $this, 'register_metadata' ), 20 );
        add_action( 'admin_init', array( $this, 'register_settings' ) );
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
    }

    public function register_content_types(): void {
        Content_Types::register();
    }

    public function register_metadata(): void {
        Meta::register();
        Offers::register();
    }

    public function register_settings(): void {
        Admin::register_settings();
    }

    public function register_rest_routes(): void {
        Rest_API::register_routes();
    }

    /**
     * Add the least-privilege capability to administrators on activation.
     * Existing content and options are deliberately retained on deactivation.
     */
    public static function activate(): void {
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-content-types.php';
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-admin.php';
        require_once NATTRIX_PORTFOLIO_ENGINE_DIR . 'includes/class-rest-api.php';
        Content_Types::register();
        self::add_capabilities();
        add_option( Admin::OPTION_SITE_KEY, '' );
        flush_rewrite_rules();
    }

    public static function deactivate(): void {
        flush_rewrite_rules();
    }

    private static function add_capabilities(): void {
        $administrator = get_role( 'administrator' );

        if ( null === $administrator ) {
            return;
        }

        foreach ( Content_Types::capabilities() as $capability ) {
            $administrator->add_cap( $capability );
        }

        $administrator->add_cap( Rest_API::MANAGE_CAPABILITY );
    }
}
