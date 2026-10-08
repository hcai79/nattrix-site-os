<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/** Minimal per-site configuration. Operational data stays in WordPress for v0.1. */
final class Admin {
    public const OPTION_SITE_KEY = 'nattrix_portfolio_engine_site_key';

    public static function register_settings(): void {
        register_setting(
            'nattrix_portfolio_engine',
            self::OPTION_SITE_KEY,
            array( 'type' => 'string', 'sanitize_callback' => array( self::class, 'sanitize_site_key' ), 'default' => '' )
        );

        add_settings_section( 'nattrix_portfolio_engine_site', __( 'Site configuration', 'nattrix-portfolio-engine' ), '__return_null', 'nattrix-portfolio-engine' );
        add_settings_field( self::OPTION_SITE_KEY, __( 'Site key', 'nattrix-portfolio-engine' ), array( self::class, 'render_site_key' ), 'nattrix-portfolio-engine', 'nattrix_portfolio_engine_site' );
        add_action( 'admin_menu', array( self::class, 'add_settings_page' ) );
    }

    public static function add_settings_page(): void {
        add_options_page( __( 'Portfolio Engine', 'nattrix-portfolio-engine' ), __( 'Portfolio Engine', 'nattrix-portfolio-engine' ), Rest_API::MANAGE_CAPABILITY, 'nattrix-portfolio-engine', array( self::class, 'render_settings_page' ) );
    }

    public static function sanitize_site_key( $value ): string {
        return sanitize_key( (string) $value );
    }

    public static function render_site_key(): void {
        printf( '<input class="regular-text" id="%1$s" name="%1$s" type="text" value="%2$s" pattern="[a-z0-9_-]+" />', esc_attr( self::OPTION_SITE_KEY ), esc_attr( (string) get_option( self::OPTION_SITE_KEY, '' ) ) );
        echo '<p class="description">' . esc_html__( 'A stable, lowercase identifier for this portfolio site. It is configuration, not a credential.', 'nattrix-portfolio-engine' ) . '</p>';
    }

    public static function render_settings_page(): void {
        if ( ! current_user_can( Rest_API::MANAGE_CAPABILITY ) ) {
            wp_die( esc_html__( 'You are not allowed to manage Portfolio Engine settings.', 'nattrix-portfolio-engine' ) );
        }
        echo '<div class="wrap"><h1>' . esc_html__( 'Portfolio Engine', 'nattrix-portfolio-engine' ) . '</h1><form action="options.php" method="post">';
        settings_fields( 'nattrix_portfolio_engine' );
        do_settings_sections( 'nattrix-portfolio-engine' );
        submit_button();
        echo '</form></div>';
    }
}
