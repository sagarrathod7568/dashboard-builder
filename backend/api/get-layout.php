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

$result = $conn->query("SELECT * FROM dashboard_elements");

$widgets = [];

while ($row = $result->fetch_assoc()) {
    $widgets[] = [
        "id" => $row["id"],
        "type" => $row["type"],
        "content" => $row["content"],
        "x" => (int)$row["position_x"],
        "y" => (int)$row["position_y"],
        "width" => (int)$row["width"],
        "height" => (int)$row["height"]
    ];
}

echo json_encode($widgets);