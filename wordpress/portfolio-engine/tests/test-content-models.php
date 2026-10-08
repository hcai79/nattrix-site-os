<?php

use Nattrix\PortfolioEngine\Content_Types;
use Nattrix\PortfolioEngine\Meta;
use Nattrix\PortfolioEngine\Offers;
use Nattrix\PortfolioEngine\Rest_API;

class Test_Content_Models extends WP_UnitTestCase {
    public function test_product_and_taxonomies_are_registered(): void {
        $this->assertTrue( post_type_exists( Content_Types::PRODUCT_POST_TYPE ) );
        $this->assertTrue( taxonomy_exists( Content_Types::BRAND_TAXONOMY ) );
        $this->assertTrue( taxonomy_exists( Content_Types::CATEGORY_TAXONOMY ) );
        $this->assertTrue( get_post_type_object( Content_Types::PRODUCT_POST_TYPE )->show_in_rest );
    }

    public function test_core_metadata_accepts_only_configured_values_and_product_ids(): void {
        $product_id = self::factory()->post->create( array( 'post_type' => Content_Types::PRODUCT_POST_TYPE ) );
        $post_id = self::factory()->post->create();

        $this->assertSame( 'buying-guide', Meta::sanitize_page_type( 'buying-guide' ) );
        $this->assertSame( '', Meta::sanitize_page_type( 'unknown-type' ) );
        $this->assertSame( 'human-review', Meta::sanitize_status( 'human-review' ) );
        $this->assertSame( '', Meta::sanitize_status( 'unapproved' ) );
        $this->assertSame( array( $product_id ), Meta::sanitize_product_ids( array( $product_id, $product_id, $post_id, 0 ) ) );
    }

    public function test_offer_sanitizers_reject_bad_product_and_url_values(): void {
        $product_id = self::factory()->post->create( array( 'post_type' => Content_Types::PRODUCT_POST_TYPE ) );
        $post_id = self::factory()->post->create();

        $this->assertSame( $product_id, Offers::sanitize_product_id( $product_id ) );
        $this->assertSame( 0, Offers::sanitize_product_id( $post_id ) );
        $this->assertSame( 'https://merchant.example/item', Offers::sanitize_destination_url( 'https://merchant.example/item' ) );
        $this->assertSame( '', Offers::sanitize_destination_url( 'javascript:alert(1)' ) );
        $this->assertSame( 'paused', Offers::sanitize_status( 'unknown' ) );
    }

    public function test_private_routes_require_portfolio_capability(): void {
        wp_set_current_user( 0 );
        $request = new WP_REST_Request( 'GET', '/' . Rest_API::NAMESPACE . '/offers' );
        $response = rest_get_server()->dispatch( $request );

        $this->assertSame( 401, $response->get_status() );
    }
}
