<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/** Core Page metadata shared by public posts, pages, and product profiles. */
final class Meta {
    public const PREFIX = '_nattrix_';
    public const CORE_PAGE_TYPE = self::PREFIX . 'core_page_type';
    public const CORE_CLUSTER = self::PREFIX . 'core_cluster';
    public const CORE_STATUS = self::PREFIX . 'core_status';
    public const CORE_PRODUCT_IDS = self::PREFIX . 'core_product_ids';
    public const CORE_PAGE_META = array( self::CORE_PAGE_TYPE, self::CORE_CLUSTER, self::CORE_STATUS, self::CORE_PRODUCT_IDS );

    public const PAGE_TYPES = array( 'buying-guide', 'comparison', 'product-profile', 'hub' );
    public const STATUSES = array( 'planned', 'validated', 'briefed', 'drafted', 'qa', 'human-review', 'approved', 'published', 'ranking', 'monetized', 'winner', 'rework' );

    public static function register(): void {
        foreach ( array( 'post', 'page', Content_Types::PRODUCT_POST_TYPE ) as $post_type ) {
            self::register_for_post_type( $post_type );
        }
    }

    public static function sanitize_page_type( $value ): string {
        $value = sanitize_key( (string) $value );
        return in_array( $value, self::PAGE_TYPES, true ) ? $value : '';
    }

    public static function sanitize_status( $value ): string {
        $value = sanitize_key( (string) $value );
        return in_array( $value, self::STATUSES, true ) ? $value : '';
    }

    public static function sanitize_cluster( $value ): string {
        return sanitize_text_field( (string) $value );
    }

    public static function sanitize_product_ids( $value ): array {
        $ids = is_array( $value ) ? $value : explode( ',', (string) $value );
        $ids = array_values( array_unique( array_filter( array_map( 'absint', $ids ) ) ) );

        return array_values(
            array_filter(
                $ids,
                static function ( int $id ): bool {
                    return self::is_product( $id );
                }
            )
        );
    }

    public static function is_product( int $post_id ): bool {
        return Content_Types::PRODUCT_POST_TYPE === get_post_type( $post_id );
    }

    private static function register_for_post_type( string $post_type ): void {
        register_post_meta( $post_type, self::CORE_PAGE_TYPE, array( 'type' => 'string', 'single' => true, 'show_in_rest' => true, 'sanitize_callback' => array( self::class, 'sanitize_page_type' ), 'auth_callback' => array( self::class, 'can_edit_meta' ) ) );
        register_post_meta( $post_type, self::CORE_CLUSTER, array( 'type' => 'string', 'single' => true, 'show_in_rest' => true, 'sanitize_callback' => array( self::class, 'sanitize_cluster' ), 'auth_callback' => array( self::class, 'can_edit_meta' ) ) );
        register_post_meta( $post_type, self::CORE_STATUS, array( 'type' => 'string', 'single' => true, 'show_in_rest' => true, 'sanitize_callback' => array( self::class, 'sanitize_status' ), 'auth_callback' => array( self::class, 'can_edit_meta' ) ) );
        register_post_meta( $post_type, self::CORE_PRODUCT_IDS, array( 'type' => 'array', 'single' => true, 'show_in_rest' => array( 'schema' => array( 'type' => 'array', 'items' => array( 'type' => 'integer' ) ) ), 'sanitize_callback' => array( self::class, 'sanitize_product_ids' ), 'auth_callback' => array( self::class, 'can_edit_meta' ) ) );
    }

    public static function can_edit_meta( bool $allowed, string $meta_key, int $post_id ): bool {
        return current_user_can( 'edit_post', $post_id );
    }
}
