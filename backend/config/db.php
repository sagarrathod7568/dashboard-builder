<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// $host = "localhost";
// $user = "root";
// $password = "";
// $database = "dashboard_builder";

$host = "sql202.infinityfree.com";
$user = "if0_42281660";
$password = "0LhFOiBs7FK";
$database = "if0_42281660_dashboard_builder";

$conn = new mysqli(
    $host,
    $user,
    $password,
    $database
);

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]));
}