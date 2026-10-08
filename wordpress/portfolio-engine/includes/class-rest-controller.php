<?php

namespace Nattrix\PortfolioEngine;

use WP_Error;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Rest_Controller {
    public const NAMESPACE = 'nattrix/v1';

    public function register_routes(): void {
        register_rest_route(
            self::NAMESPACE,
            '/health',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array( $this, 'health' ),
                'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ),
            )
        );
        register_rest_route(
            self::NAMESPACE,
            '/products/(?P<id>\d+)/offers',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array( $this, 'get_product_offers' ),
                'permission_callback' => array( $this, 'can_read_product_offers' ),
                'args' => array(
                    'id' => array(
                        'validate_callback' => static fn( $value ): bool => absint( $value ) > 0,
                    ),
                ),
            )
        );
        register_rest_route(
            self::NAMESPACE,
            '/core-pages',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array( $this, 'get_core_pages' ),
                'permission_callback' => static fn(): bool => current_user_can( 'edit_pages' ) || current_user_can( 'edit_posts' ),
                'args' => array(
                    'per_page' => array(
                        'default' => 50,
                        'sanitize_callback' => 'absint',
                        'validate_callback' => static fn( $value ): bool => absint( $value ) >= 1 && absint( $value ) <= 100,
                    ),
                ),
            )
        );
    }

    public function health(): WP_REST_Response {
        $settings = get_option( Settings::OPTION_NAME, array() );
        return new WP_REST_Response(
            array(
                'version' => NATTRIX_PORTFOLIO_ENGINE_VERSION,
                'site_id' => $settings['site_id'] ?? '',
                'mode' => 'local_wordpress',
            )
        );
    }

    public function can_read_product_offers( WP_REST_Request $request ): bool {
        $post_id = absint( $request['id'] );
        return Content_Types::PRODUCT_POST_TYPE === get_post_type( $post_id ) && current_user_can( 'edit_post', $post_id );
    }

    /** @return WP_REST_Response|WP_Error */
    public function get_product_offers( WP_REST_Request $request ) {
        $post_id = absint( $request['id'] );
        if ( Content_Types::PRODUCT_POST_TYPE !== get_post_type( $post_id ) ) {
            return new WP_Error( 'nattrix_product_not_found', __( 'Product not found.', 'nattrix-portfolio-engine' ), array( 'status' => 404 ) );
        }
        return new WP_REST_Response(
            array(
                'product_id' => $post_id,
                'offers' => get_post_meta( $post_id, 'nattrix_affiliate_offers', true ) ?: array(),
            )
        );
    }

    public function get_core_pages( WP_REST_Request $request ): WP_REST_Response {
        $query = new WP_Query(
            array(
                'post_type' => array( 'post', 'page' ),
                'post_status' => array( 'publish', 'draft', 'pending', 'private' ),
                'posts_per_page' => absint( $request->get_param( 'per_page' ) ),
                'meta_query' => array(
                    array(
                        'key' => 'nattrix_is_core_page',
                        'value' => '1',
                    ),
                ),
                'orderby' => 'meta_value_num',
                'meta_key' => 'nattrix_core_priority',
                'order' => 'DESC',
            )
        );

        $items = array();
        foreach ( $query->posts as $post ) {
            if ( ! current_user_can( 'edit_post', $post->ID ) ) {
                continue;
            }
            $items[] = array(
                'id' => $post->ID,
                'post_type' => $post->post_type,
                'status' => $post->post_status,
                'title' => get_the_title( $post ),
                'cluster' => get_post_meta( $post->ID, 'nattrix_core_cluster', true ),
                'page_type' => get_post_meta( $post->ID, 'nattrix_core_page_type', true ),
                'priority' => absint( get_post_meta( $post->ID, 'nattrix_core_priority', true ) ),
                'review_state' => get_post_meta( $post->ID, 'nattrix_core_review_state', true ),
            );
        }
        return new WP_REST_Response( array( 'items' => $items ) );
    }
}
