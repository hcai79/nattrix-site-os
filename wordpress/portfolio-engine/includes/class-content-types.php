<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/** Registers portable content models without assuming a site's theme or URL structure. */
final class Content_Types {
    public const PRODUCT_POST_TYPE = 'nattrix_product';
    public const OFFER_POST_TYPE = 'nattrix_offer';
    public const BRAND_TAXONOMY = 'nattrix_product_brand';
    public const CATEGORY_TAXONOMY = 'nattrix_product_category';

    public static function register(): void {
        register_post_type(
            self::PRODUCT_POST_TYPE,
            array(
                'labels' => array( 'name' => __( 'Products', 'nattrix-portfolio-engine' ), 'singular_name' => __( 'Product', 'nattrix-portfolio-engine' ) ),
                'public' => true,
                'show_in_rest' => true,
                'has_archive' => true,
                'rewrite' => array( 'slug' => 'products' ),
                'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
                'capability_type' => array( 'nattrix_product', 'nattrix_products' ),
                'map_meta_cap' => true,
            )
        );

        register_post_type(
            self::OFFER_POST_TYPE,
            array(
                'labels' => array( 'name' => __( 'Affiliate Offers', 'nattrix-portfolio-engine' ), 'singular_name' => __( 'Affiliate Offer', 'nattrix-portfolio-engine' ) ),
                'public' => false,
                'show_ui' => true,
                'show_in_menu' => 'edit.php?post_type=' . self::PRODUCT_POST_TYPE,
                'show_in_rest' => false,
                'supports' => array( 'title', 'revisions' ),
                'capability_type' => array( 'nattrix_offer', 'nattrix_offers' ),
                'map_meta_cap' => true,
            )
        );

        self::register_taxonomies();
    }

    public static function capabilities(): array {
        return array(
            'edit_nattrix_product', 'read_nattrix_product', 'delete_nattrix_product',
            'edit_nattrix_products', 'edit_others_nattrix_products', 'publish_nattrix_products', 'read_private_nattrix_products', 'delete_nattrix_products', 'delete_private_nattrix_products', 'delete_published_nattrix_products', 'delete_others_nattrix_products', 'edit_private_nattrix_products', 'edit_published_nattrix_products',
            'edit_nattrix_offer', 'read_nattrix_offer', 'delete_nattrix_offer',
            'edit_nattrix_offers', 'edit_others_nattrix_offers', 'publish_nattrix_offers', 'read_private_nattrix_offers', 'delete_nattrix_offers', 'delete_private_nattrix_offers', 'delete_published_nattrix_offers', 'delete_others_nattrix_offers', 'edit_private_nattrix_offers', 'edit_published_nattrix_offers',
        );
    }

    private static function register_taxonomies(): void {
        $args = array(
            'hierarchical' => false,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'capabilities' => array( 'manage_terms' => 'manage_nattrix_portfolio', 'edit_terms' => 'manage_nattrix_portfolio', 'delete_terms' => 'manage_nattrix_portfolio', 'assign_terms' => 'edit_nattrix_products' ),
        );

        register_taxonomy( self::BRAND_TAXONOMY, array( self::PRODUCT_POST_TYPE ), array_merge( $args, array( 'labels' => array( 'name' => __( 'Product Brands', 'nattrix-portfolio-engine' ), 'singular_name' => __( 'Product Brand', 'nattrix-portfolio-engine' ) ), 'rewrite' => array( 'slug' => 'product-brand' ) ) ) );
        register_taxonomy( self::CATEGORY_TAXONOMY, array( self::PRODUCT_POST_TYPE ), array_merge( $args, array( 'hierarchical' => true, 'labels' => array( 'name' => __( 'Product Categories', 'nattrix-portfolio-engine' ), 'singular_name' => __( 'Product Category', 'nattrix-portfolio-engine' ) ), 'rewrite' => array( 'slug' => 'product-category' ) ) ) );
    }
}
