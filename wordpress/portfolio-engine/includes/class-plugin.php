<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Plugin {
    private static ?Plugin $instance = null;

    private Content_Types $content_types;
    private Meta_Models $meta_models;
    private Meta_Boxes $meta_boxes;
    private Rest_Controller $rest_controller;
    private Settings $settings;

    public static function instance(): Plugin {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {
        $this->content_types   = new Content_Types();
        $this->meta_models     = new Meta_Models();
        $this->meta_boxes      = new Meta_Boxes( $this->meta_models );
        $this->rest_controller = new Rest_Controller();
        $this->settings        = new Settings();
    }

    public function boot(): void {
        add_action( 'init', array( $this->content_types, 'register' ) );
        add_action( 'init', array( $this->meta_models, 'register' ) );
        $this->meta_boxes->register();
        add_action( 'rest_api_init', array( $this->rest_controller, 'register_routes' ) );
        add_action( 'admin_menu', array( $this->settings, 'register_menu' ) );
        add_action( 'admin_init', array( $this->settings, 'register' ) );
    }

    public static function activate(): void {
        $plugin = self::instance();
        $plugin->content_types->register();
        $plugin->meta_models->register();
        $plugin->content_types->grant_administrator_capabilities();
        flush_rewrite_rules();
    }

    public static function deactivate(): void {
        flush_rewrite_rules();
    }
}
