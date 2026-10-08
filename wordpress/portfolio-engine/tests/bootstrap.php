<?php

$wp_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $wp_tests_dir || ! file_exists( $wp_tests_dir . '/includes/functions.php' ) ) {
    fwrite( STDERR, "WP_TESTS_DIR must point to the WordPress PHPUnit test library.\n" );
    exit( 1 );
}

require_once $wp_tests_dir . '/includes/functions.php';

tests_add_filter(
    'muplugins_loaded',
    static function (): void {
        require dirname( __DIR__ ) . '/portfolio-engine.php';
    }
);

require $wp_tests_dir . '/includes/bootstrap.php';
