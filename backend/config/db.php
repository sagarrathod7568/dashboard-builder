<?php

header("Content-Type: application/json");

$host = getenv("DB_HOST");
$user = getenv("DB_USER");
$password = getenv("DB_PASSWORD");
$database = getenv("DB_NAME");
$port = getenv("DB_PORT") ?: 3306;

$conn = new mysqli(
    $host,
    $user,
    $password,
    $database,
    (int)$port
);

if ($conn->connect_errno) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $conn->connect_error
    ]);
    exit();
}

$conn->set_charset("utf8mb4");