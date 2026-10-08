<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Content_Types {
    public const PRODUCT_POST_TYPE = 'nattrix_product';
    public const BRAND_TAXONOMY = 'nattrix_product_brand';
    public const CATEGORY_TAXONOMY = 'nattrix_product_category';

    /** @var string[] */
    private array $product_capabilities = array(
        'edit_nattrix_product', 'read_nattrix_product', 'delete_nattrix_product',
        'edit_nattrix_products', 'edit_others_nattrix_products', 'publish_nattrix_products',
        'read_private_nattrix_products', 'delete_nattrix_products', 'delete_private_nattrix_products',
        'delete_published_nattrix_products', 'delete_others_nattrix_products',
        'edit_private_nattrix_products', 'edit_published_nattrix_products',
    );

    public function register(): void {
        register_post_type(
            self::PRODUCT_POST_TYPE,
            array(
                'labels' => array(
                    'name' => __( 'Products', 'nattrix-portfolio-engine' ),
                    'singular_name' => __( 'Product', 'nattrix-portfolio-engine' ),
                    'add_new_item' => __( 'Add Product', 'nattrix-portfolio-engine' ),
                    'edit_item' => __( 'Edit Product', 'nattrix-portfolio-engine' ),
                ),
                'public' => false,
                'show_ui' => true,
                'show_in_menu' => true,
                'show_in_rest' => true,
                'rest_base' => 'nattrix-products',
                'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions' ),
                'capability_type' => array( 'nattrix_product', 'nattrix_products' ),
                'map_meta_cap' => true,
                'has_archive' => false,
                'rewrite' => false,
                'query_var' => false,
                'menu_icon' => 'dashicons-archive',
                'show_in_nav_menus' => false,
                'exclude_from_search' => true,
            )
        );

        $this->register_taxonomies();
    }

    public function grant_administrator_capabilities(): void {
        $administrator = get_role( 'administrator' );
        if ( ! $administrator ) {
            return;
        }
        foreach ( array_merge( $this->product_capabilities, array( 'manage_nattrix_product_terms' ) ) as $capability ) {
            $administrator->add_cap( $capability );
        }
    }

    private function register_taxonomies(): void {
        $capabilities = array(
            'manage_terms' => 'manage_nattrix_product_terms',
            'edit_terms' => 'manage_nattrix_product_terms',
            'delete_terms' => 'manage_nattrix_product_terms',
            'assign_terms' => 'edit_nattrix_products',
        );
        register_taxonomy(
            self::BRAND_TAXONOMY,
            array( self::PRODUCT_POST_TYPE ),
            array(
                'labels' => array( 'name' => __( 'Product Brands', 'nattrix-portfolio-engine' ) ),
                'hierarchical' => false,
                'show_ui' => true,
                'show_in_rest' => true,
                'public' => false,
                'rewrite' => false,
                'capabilities' => $capabilities,
            )
        );
        register_taxonomy(
            self::CATEGORY_TAXONOMY,
            array( self::PRODUCT_POST_TYPE ),
            array(
                'labels' => array( 'name' => __( 'Product Categories', 'nattrix-portfolio-engine' ) ),
                'hierarchical' => true,
                'show_ui' => true,
                'show_in_rest' => true,
                'public' => false,
                'rewrite' => false,
                'capabilities' => $capabilities,
            )
        );
    }
}
