<?php

namespace Nattrix\PortfolioEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Meta_Boxes {
    private Meta_Models $meta_models;

    public function __construct( Meta_Models $meta_models ) {
        $this->meta_models = $meta_models;
    }

    public function register(): void {
        add_action( 'add_meta_boxes', array( $this, 'add_core_page_meta_box' ) );
        add_action( 'save_post', array( $this, 'save_core_page_meta' ), 10, 3 );
    }

    public function add_core_page_meta_box(): void {
        foreach ( array( 'post', 'page' ) as $post_type ) {
            add_meta_box(
                'nattrix-core-page',
                __( 'Nattrix Core Page', 'nattrix-portfolio-engine' ),
                array( $this, 'render_core_page_meta_box' ),
                $post_type,
                'side',
                'default'
            );
        }
    }

    public function render_core_page_meta_box( \WP_Post $post ): void {
        $core_page = (bool) get_post_meta( $post->ID, 'nattrix_is_core_page', true );
        $cluster = get_post_meta( $post->ID, 'nattrix_core_cluster', true );
        $page_type = get_post_meta( $post->ID, 'nattrix_core_page_type', true );
        $priority = absint( get_post_meta( $post->ID, 'nattrix_core_priority', true ) );
        $review_state = get_post_meta( $post->ID, 'nattrix_core_review_state', true );
        wp_nonce_field( 'nattrix_save_core_page', 'nattrix_core_page_nonce' );
        ?>
        <p><label><input type="checkbox" name="nattrix_is_core_page" value="1" <?php checked( $core_page ); ?> /> <?php esc_html_e( 'This is a Core Page', 'nattrix-portfolio-engine' ); ?></label></p>
        <p><label for="nattrix_core_cluster"><?php esc_html_e( 'Cluster', 'nattrix-portfolio-engine' ); ?></label><br />
        <input class="widefat" id="nattrix_core_cluster" name="nattrix_core_cluster" value="<?php echo esc_attr( $cluster ); ?>" /></p>
        <p><label for="nattrix_core_page_type"><?php esc_html_e( 'Page type', 'nattrix-portfolio-engine' ); ?></label><br />
        <select class="widefat" id="nattrix_core_page_type" name="nattrix_core_page_type">
            <option value=""><?php esc_html_e( 'Select type', 'nattrix-portfolio-engine' ); ?></option>
            <?php foreach ( array( 'buying_guide', 'comparison', 'product_profile', 'hub' ) as $type ) : ?>
                <option value="<?php echo esc_attr( $type ); ?>" <?php selected( $page_type, $type ); ?>><?php echo esc_html( ucwords( str_replace( '_', ' ', $type ) ) ); ?></option>
            <?php endforeach; ?>
        </select></p>
        <p><label for="nattrix_core_priority"><?php esc_html_e( 'Priority (0 to 100)', 'nattrix-portfolio-engine' ); ?></label><br />
        <input class="small-text" id="nattrix_core_priority" name="nattrix_core_priority" min="0" max="100" type="number" value="<?php echo esc_attr( (string) $priority ); ?>" /></p>
        <p><label for="nattrix_core_review_state"><?php esc_html_e( 'Review state', 'nattrix-portfolio-engine' ); ?></label><br />
        <select class="widefat" id="nattrix_core_review_state" name="nattrix_core_review_state">
            <?php foreach ( array( 'draft', 'needs_review', 'approved' ) as $state ) : ?>
                <option value="<?php echo esc_attr( $state ); ?>" <?php selected( $review_state, $state ); ?>><?php echo esc_html( ucwords( str_replace( '_', ' ', $state ) ) ); ?></option>
            <?php endforeach; ?>
        </select></p>
        <?php
    }

    public function save_core_page_meta( int $post_id, \WP_Post $post, bool $update ): void {
        if ( ! in_array( $post->post_type, array( 'post', 'page' ), true ) || ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ) {
            return;
        }
        $nonce = sanitize_text_field( $this->post_value( 'nattrix_core_page_nonce' ) );
        if ( ! wp_verify_nonce( $nonce, 'nattrix_save_core_page' ) || ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        update_post_meta( $post_id, 'nattrix_is_core_page', isset( $_POST['nattrix_is_core_page'] ) );
        update_post_meta( $post_id, 'nattrix_core_cluster', sanitize_text_field( $this->post_value( 'nattrix_core_cluster' ) ) );
        update_post_meta( $post_id, 'nattrix_core_page_type', $this->meta_models->sanitize_core_page_type( $this->post_value( 'nattrix_core_page_type' ) ) );
        update_post_meta( $post_id, 'nattrix_core_priority', $this->meta_models->sanitize_priority( $this->post_value( 'nattrix_core_priority' ) ) );
        update_post_meta( $post_id, 'nattrix_core_review_state', $this->meta_models->sanitize_review_state( $this->post_value( 'nattrix_core_review_state' ) ) );
    }

    private function post_value( string $key ): string {
        if ( ! isset( $_POST[ $key ] ) || ! is_string( $_POST[ $key ] ) ) {
            return '';
        }
        return wp_unslash( $_POST[ $key ] );
    }
}
