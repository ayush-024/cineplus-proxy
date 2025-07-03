<?php
// Set the target URL
$url = $_GET['url'] ?? "https://sunburst66.pro/_v7/85da27503d497abadce04a6c756a9bfad648451cfea9f39d3c2a584a9ffb45644417f699e0da69cb4f50701ecebb8b1d75d4f37b02dc2eeb0e32a287de765222ad083ea27aa71e7dc61b69b07dccc5558c5451e2ff91642435e5ebc7dbfce30db6a9e2367f75ad4173dac32b5f950b11d5f662e56f75fe72efb3518b4e008b1c/master.m3u8";

if(!$url) {
header('Content-Type: application/json');   
echo "No url Parameter";
exit();
}

$s = 'prxy-2.php?url=' . urlencode(str_replace('master.m3u8','index',$url));
// Set the required headers
$headers = [
    'Referer: https://megacloud.blog/',
    'Origin: https://megacloud.blog/'
];

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


    // Default to m3u8 content type if not provided
    header('Content-Type: application/vnd.apple.mpegurl');

 //header('Content-Type: application/json');   
 
$new_response = str_replace('index', $s,$response);
// Output the response
echo $new_response;
?>
