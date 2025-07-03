<?php
// Set the target URL
$url = urldecode($_GET['url']);
//$url = $_GET['url']; 
//$s = 'prxy-2.php?url=' . urlencode(str_replace('master.m3u8','',$url));
// Set the required headers
$headers = [
    'Referer: https://megacloud.blog/',
    'Origin: https://megacloud.blog/'
];


/*
if (ob_get_level()) {
    ob_end_clean();
}
*/

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
header('X-Content-Duration: yes'); // Helps some players with seeking
*/

    // Default to m3u8 content type if not provided
    header('Content-Type: application/vnd.apple.mpegurl');

    
 
$new_response = str_replace('http','prxy-3.php?url=http',$response);


// Output the response
echo $new_response;
?>