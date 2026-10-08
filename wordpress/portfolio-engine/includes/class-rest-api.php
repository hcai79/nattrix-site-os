<?php

namespace Nattrix\PortfolioEngine;

use WP_Error;
use WP_REST_Request;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/** Authenticated integration API. It intentionally exposes no public affiliate destination URLs. */
final class Rest_API {
    public const NAMESPACE = 'nattrix-portfolio/v1';
    public const MANAGE_CAPABILITY = 'manage_nattrix_portfolio';

    public static function register_routes(): void {
        register_rest_route( self::NAMESPACE, '/products', array( 'methods' => 'GET', 'callback' => array( self::class, 'get_products' ), 'permission_callback' => array( self::class, 'can_manage' ) ) );
        register_rest_route( self::NAMESPACE, '/core-pages', array( 'methods' => 'GET', 'callback' => array( self::class, 'get_core_pages' ), 'permission_callback' => array( self::class, 'can_manage' ) ) );
        register_rest_route( self::NAMESPACE, '/offers', array( array( 'methods' => 'GET', 'callback' => array( self::class, 'get_offers' ), 'permission_callback' => array( self::class, 'can_manage' ) ), array( 'methods' => 'POST', 'callback' => array( self::class, 'create_offer' ), 'permission_callback' => array( self::class, 'can_manage' ), 'args' => self::offer_arguments() ) ) );
    }

    public static function can_manage(): bool {
        return current_user_can( self::MANAGE_CAPABILITY );
    }

    public static function get_products( WP_REST_Request $request ): array {
        return self::posts_to_records( get_posts( array( 'post_type' => Content_Types::PRODUCT_POST_TYPE, 'post_status' => array( 'publish', 'draft', 'private' ), 'numberposts' => -1 ) ) );
    }

    public static function get_core_pages( WP_REST_Request $request ): array {
        return self::posts_to_records( get_posts( array( 'post_type' => array( 'post', 'page', Content_Types::PRODUCT_POST_TYPE ), 'post_status' => array( 'publish', 'draft', 'private' ), 'numberposts' => -1, 'meta_query' => array( array( 'key' => Meta::CORE_PAGE_TYPE, 'compare' => 'EXISTS' ) ) ) ) );
    }

    public static function get_offers( WP_REST_Request $request ): array {
        $offers = get_posts( array( 'post_type' => Content_Types::OFFER_POST_TYPE, 'post_status' => array( 'publish', 'draft', 'private' ), 'numberposts' => -1 ) );
        return array_map( array( self::class, 'offer_to_record' ), $offers );
    }

    public static function create_offer( WP_REST_Request $request ) {
        $product_id = Offers::sanitize_product_id( $request->get_param( 'product_id' ) );
        $merchant = sanitize_text_field( (string) $request->get_param( 'merchant' ) );
        $url = Offers::sanitize_destination_url( $request->get_param( 'destination_url' ) );

        if ( ! $product_id || '' === $merchant || '' === $url ) {
            return new WP_Error( 'nattrix_invalid_offer', __( 'A valid product ID, merchant, and HTTP(S) destination URL are required.', 'nattrix-portfolio-engine' ), array( 'status' => 400 ) );
        }

        $offer_id = wp_insert_post( array( 'post_type' => Content_Types::OFFER_POST_TYPE, 'post_status' => 'publish', 'post_title' => sprintf( '%s offer for product %d', $merchant, $product_id ) ), true );
        if ( is_wp_error( $offer_id ) ) {
            return $offer_id;
        }

        update_post_meta( $offer_id, Offers::PRODUCT_ID, $product_id );
        update_post_meta( $offer_id, Offers::MERCHANT, $merchant );
        update_post_meta( $offer_id, Offers::DESTINATION_URL, $url );
        update_post_meta( $offer_id, Offers::NETWORK, sanitize_key( (string) $request->get_param( 'network' ) ) );
        update_post_meta( $offer_id, Offers::STATUS, Offers::sanitize_status( $request->get_param( 'status' ) ) );

        return self::offer_to_record( get_post( $offer_id ) );
    }

    private static function offer_arguments(): array {
        return array(
            'product_id' => array( 'required' => true, 'sanitize_callback' => 'absint' ),
            'merchant' => array( 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ),
            'destination_url' => array( 'required' => true, 'sanitize_callback' => array( Offers::class, 'sanitize_destination_url' ) ),
            'network' => array( 'required' => false, 'sanitize_callback' => 'sanitize_key' ),
            'status' => array( 'required' => false, 'sanitize_callback' => array( Offers::class, 'sanitize_status' ) ),
        );
    }

    private static function posts_to_records( array $posts ): array {
        return array_map(
            static function ( $post ): array {
                return array(
                    'id' => (int) $post->ID,
                    'title' => get_the_title( $post ),
                    'post_type' => $post->post_type,
                    'status' => $post->post_status,
                    'core_page' => array( 'type' => get_post_meta( $post->ID, Meta::CORE_PAGE_TYPE, true ), 'cluster' => get_post_meta( $post->ID, Meta::CORE_CLUSTER, true ), 'status' => get_post_meta( $post->ID, Meta::CORE_STATUS, true ), 'product_ids' => Meta::sanitize_product_ids( get_post_meta( $post->ID, Meta::CORE_PRODUCT_IDS, true ) ) ),
                );
            },
            $posts
        );
    }

    private static function offer_to_record( $offer ): array {
        return array( 'id' => (int) $offer->ID, 'title' => get_the_title( $offer ), 'product_id' => (int) get_post_meta( $offer->ID, Offers::PRODUCT_ID, true ), 'merchant' => get_post_meta( $offer->ID, Offers::MERCHANT, true ), 'destination_url' => get_post_meta( $offer->ID, Offers::DESTINATION_URL, true ), 'network' => get_post_meta( $offer->ID, Offers::NETWORK, true ), 'status' => get_post_meta( $offer->ID, Offers::STATUS, true ) );
    }
}
