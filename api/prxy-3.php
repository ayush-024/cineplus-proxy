<?php
// Set the target URL
$url = $_GET['url']; //?? 'https://breezygale56.online/_v7/af4491f406f4e6a56cd05ab881e306905094656a6603d3bad8d1f7e0f9a1dde77536824b5e20d5842af1f485ba1cf0709c11cb96197d60031390ed767ae6b5beafd572fcf783901ce22a184ecc580287f89f074b622f5c0f20775aecfadb8a15e4ff96d5a947665acd44a93d19552de39cabb0f80de97a73efffa7996be97bef/seg-1-f1-v1-a1.jpg';
// Set the required headers
$headers = [
    'Referer: https://megacloud.blog/',
    'Origin: https://megacloud.blog/'
];

if (ob_get_level()) {
    ob_end_clean();
}

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_HEADER, false);

// For HLS streams, we might need to handle redirects and different content types
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

// Get the response
$response = curl_exec($ch);

// Check for errors
if(curl_errno($ch)) {
    header('HTTP/1.1 500 Internal Server Error');
    echo 'cURL error: ' . curl_error($ch);
    exit;
}

// Get the content type from the response
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Close cURL
curl_close($ch);
/*

    header('Accept-Ranges: bytes');
header('Cache-Control: no-cache, must-revalidate');
header('X-Accel-Buffering: no');
header('X-Content-Duration: 0'); // Helps some players with seeking


    // Default to m3u8 content type if not provided
    header('Content-Type: application/vnd.apple.mpegurl');
    */
    
// Output the response
echo $response;
?>