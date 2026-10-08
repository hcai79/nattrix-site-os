<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Settings {
    public const OPTION_NAME = 'nattrix_portfolio_engine_settings';

    public function register(): void {
        register_setting(
            'nattrix_portfolio_engine',
            self::OPTION_NAME,
            array(
                'type' => 'array',
                'sanitize_callback' => array( $this, 'sanitize' ),
                'default' => array(),
            )
        );
        add_settings_section(
            'nattrix_portfolio_engine_general',
            __( 'Site configuration', 'nattrix-portfolio-engine' ),
            static function (): void {
                echo '<p>' . esc_html__( 'These settings identify the site and disclosure policy. Do not store API keys, passwords, or affiliate credentials here.', 'nattrix-portfolio-engine' ) . '</p>';
            },
            'nattrix-portfolio-engine'
        );
        add_settings_field(
            'nattrix_site_id',
            __( 'Site ID', 'nattrix-portfolio-engine' ),
            array( $this, 'render_site_id' ),
            'nattrix-portfolio-engine',
            'nattrix_portfolio_engine_general'
        );
        add_settings_field(
            'nattrix_affiliate_disclosure',
            __( 'Affiliate disclosure label', 'nattrix-portfolio-engine' ),
            array( $this, 'render_disclosure_label' ),
            'nattrix-portfolio-engine',
            'nattrix_portfolio_engine_general'
        );
    }

    public function register_menu(): void {
        add_options_page(
            __( 'Nattrix Portfolio Engine', 'nattrix-portfolio-engine' ),
            __( 'Portfolio Engine', 'nattrix-portfolio-engine' ),
            'manage_options',
            'nattrix-portfolio-engine',
            array( $this, 'render_page' )
        );
    }

    public function sanitize( $input ): array {
        if ( ! is_array( $input ) ) {
            return array();
        }
        return array(
            'site_id' => sanitize_key( $input['site_id'] ?? '' ),
            'affiliate_disclosure_label' => sanitize_text_field( $input['affiliate_disclosure_label'] ?? '' ),
        );
    }

    public function render_site_id(): void {
        $settings = get_option( self::OPTION_NAME, array() );
        printf(
            '<input class="regular-text" type="text" name="%1$s[site_id]" value="%2$s" pattern="[a-z0-9-]+" />',
            esc_attr( self::OPTION_NAME ),
            esc_attr( $settings['site_id'] ?? '' )
        );
    }

    public function render_disclosure_label(): void {
        $settings = get_option( self::OPTION_NAME, array() );
        printf(
            '<input class="regular-text" type="text" name="%1$s[affiliate_disclosure_label]" value="%2$s" />',
            esc_attr( self::OPTION_NAME ),
            esc_attr( $settings['affiliate_disclosure_label'] ?? '' )
        );
    }

    public function render_page(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }
        echo '<div class="wrap"><h1>' . esc_html__( 'Nattrix Portfolio Engine', 'nattrix-portfolio-engine' ) . '</h1><form action="options.php" method="post">';
        settings_fields( 'nattrix_portfolio_engine' );
        do_settings_sections( 'nattrix-portfolio-engine' );
        submit_button();
        echo '</form></div>';
    }
}
