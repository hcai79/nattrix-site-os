<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/** Private offer records keep merchant destinations separate from editorial HTML. */
final class Offers {
    public const PRODUCT_ID = '_nattrix_offer_product_id';
    public const MERCHANT = '_nattrix_offer_merchant';
    public const DESTINATION_URL = '_nattrix_offer_destination_url';
    public const NETWORK = '_nattrix_offer_network';
    public const STATUS = '_nattrix_offer_status';
    public const STATUSES = array( 'active', 'paused', 'expired' );

    public static function register(): void {
        register_post_meta( Content_Types::OFFER_POST_TYPE, self::PRODUCT_ID, array( 'type' => 'integer', 'single' => true, 'show_in_rest' => false, 'sanitize_callback' => array( self::class, 'sanitize_product_id' ), 'auth_callback' => array( self::class, 'can_manage' ) ) );
        register_post_meta( Content_Types::OFFER_POST_TYPE, self::MERCHANT, array( 'type' => 'string', 'single' => true, 'show_in_rest' => false, 'sanitize_callback' => 'sanitize_text_field', 'auth_callback' => array( self::class, 'can_manage' ) ) );
        register_post_meta( Content_Types::OFFER_POST_TYPE, self::DESTINATION_URL, array( 'type' => 'string', 'single' => true, 'show_in_rest' => false, 'sanitize_callback' => array( self::class, 'sanitize_destination_url' ), 'auth_callback' => array( self::class, 'can_manage' ) ) );
        register_post_meta( Content_Types::OFFER_POST_TYPE, self::NETWORK, array( 'type' => 'string', 'single' => true, 'show_in_rest' => false, 'sanitize_callback' => 'sanitize_key', 'auth_callback' => array( self::class, 'can_manage' ) ) );
        register_post_meta( Content_Types::OFFER_POST_TYPE, self::STATUS, array( 'type' => 'string', 'single' => true, 'show_in_rest' => false, 'sanitize_callback' => array( self::class, 'sanitize_status' ), 'auth_callback' => array( self::class, 'can_manage' ) ) );
    }

    public static function sanitize_product_id( $value ): int {
        $id = absint( $value );
        return Meta::is_product( $id ) ? $id : 0;
    }

    public static function sanitize_destination_url( $value ): string {
        return esc_url_raw( trim( (string) $value ), array( 'http', 'https' ) );
    }

    public static function sanitize_status( $value ): string {
        $value = sanitize_key( (string) $value );
        return in_array( $value, self::STATUSES, true ) ? $value : 'paused';
    }

    public static function can_manage(): bool {
        return current_user_can( Rest_API::MANAGE_CAPABILITY );
    }
}
