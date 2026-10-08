<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Meta_Models {
    private const CORE_PAGE_TYPES = array( 'buying_guide', 'comparison', 'product_profile', 'hub' );
    private const REVIEW_STATES = array( 'draft', 'needs_review', 'approved' );
    private const OFFER_STATUSES = array( 'active', 'inactive', 'expired' );

    public function register(): void {
        foreach ( array( 'post', 'page' ) as $post_type ) {
            $this->register_core_page_meta( $post_type );
        }
        register_post_meta(
            Content_Types::PRODUCT_POST_TYPE,
            'nattrix_affiliate_offers',
            array(
                'single' => true,
                'type' => 'array',
                'show_in_rest' => array( 'schema' => array( 'type' => 'array', 'items' => array( 'type' => 'object' ) ) ),
                'sanitize_callback' => array( $this, 'sanitize_offers' ),
                'auth_callback' => array( $this, 'can_edit_meta' ),
            )
        );
    }

    public function sanitize_offers( $offers ): array {
        if ( ! is_array( $offers ) ) {
            return array();
        }
        $sanitized = array();
        $seen_ids = array();
        foreach ( $offers as $offer ) {
            if ( ! is_array( $offer ) ) {
                continue;
            }
            $offer_id = sanitize_key( $offer['offer_id'] ?? '' );
            $status = sanitize_key( $offer['status'] ?? 'inactive' );
            if ( '' === $offer_id || isset( $seen_ids[ $offer_id ] ) || ! in_array( $status, self::OFFER_STATUSES, true ) ) {
                continue;
            }
            $destination_url = $this->sanitize_offer_url( $offer['destination_url'] ?? '' );
            if ( '' === $destination_url ) {
                continue;
            }
            $seen_ids[ $offer_id ] = true;
            $sanitized[] = array(
                'offer_id' => $offer_id,
                'merchant_name' => sanitize_text_field( $offer['merchant_name'] ?? '' ),
                'destination_url' => $destination_url,
                'affiliate_url' => $this->sanitize_offer_url( $offer['affiliate_url'] ?? '' ),
                'disclosure_label' => sanitize_text_field( $offer['disclosure_label'] ?? '' ),
                'status' => $status,
            );
        }
        return $sanitized;
    }

    public function sanitize_core_page_type( $value ): string {
        $value = sanitize_key( $value );
        return in_array( $value, self::CORE_PAGE_TYPES, true ) ? $value : '';
    }

    public function sanitize_review_state( $value ): string {
        $value = sanitize_key( $value );
        return in_array( $value, self::REVIEW_STATES, true ) ? $value : 'draft';
    }

    public function sanitize_priority( $value ): int {
        return min( 100, max( 0, absint( $value ) ) );
    }

    public function sanitize_boolean( $value ): bool {
        return filter_var( $value, FILTER_VALIDATE_BOOLEAN );
    }

    public function can_edit_meta( $allowed, $meta_key, $post_id ): bool {
        return current_user_can( 'edit_post', $post_id );
    }

    private function sanitize_offer_url( $value ): string {
        $url = esc_url_raw( $value );
        $scheme = wp_parse_url( $url, PHP_URL_SCHEME );
        return in_array( $scheme, array( 'https', 'http' ), true ) ? $url : '';
    }

    private function register_core_page_meta( string $post_type ): void {
        $common = array( 'single' => true, 'show_in_rest' => true, 'auth_callback' => array( $this, 'can_edit_meta' ) );
        register_post_meta( $post_type, 'nattrix_is_core_page', $common + array( 'type' => 'boolean', 'sanitize_callback' => array( $this, 'sanitize_boolean' ) ) );
        register_post_meta( $post_type, 'nattrix_core_cluster', $common + array( 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ) );
        register_post_meta( $post_type, 'nattrix_core_page_type', $common + array( 'type' => 'string', 'sanitize_callback' => array( $this, 'sanitize_core_page_type' ) ) );
        register_post_meta( $post_type, 'nattrix_core_priority', $common + array( 'type' => 'integer', 'sanitize_callback' => array( $this, 'sanitize_priority' ) ) );
        register_post_meta( $post_type, 'nattrix_core_review_state', $common + array( 'type' => 'string', 'sanitize_callback' => array( $this, 'sanitize_review_state' ) ) );
    }
}
