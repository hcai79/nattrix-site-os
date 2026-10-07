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
        add_action( 'init', array( $this, 'register_content_types' ) );
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
    }

    public function register_content_types(): void {
        // Milestone 2: product, core-page metadata, offers, and taxonomies.
    }

    public function register_rest_routes(): void {
        // Milestone 2: authenticated portfolio endpoints.
    }
}
