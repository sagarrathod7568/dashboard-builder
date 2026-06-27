<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit();
}

$conn->query("DELETE FROM dashboard_elements");

foreach ($data as $item) {

    $stmt = $conn->prepare("
        INSERT INTO dashboard_elements
        (element_id, type, content, position_x, position_y, width, height)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "sssiiii",
        $item["id"],
        $item["type"],
        $item["content"],
        $item["x"],
        $item["y"],
        $item["width"],
        $item["height"]
    );

    $stmt->execute();
}

echo json_encode([
    "success" => true
]);