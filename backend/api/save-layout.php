<?php

include '../config/db.php';

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

$conn->query("DELETE FROM dashboard_elements");

foreach ($data as $item) {

    $element_id = $item['id'];
    $type = $item['type'];
    $content = $item['content'];

    $x = $item['x'];
    $y = $item['y'];

    $width = $item['width'];
    $height = $item['height'];

    $stmt = $conn->prepare("
        INSERT INTO dashboard_elements
        (
            element_id,
            type,
            content,
            position_x,
            position_y,
            width,
            height
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "sssiiii",
        $element_id,
        $type,
        $content,
        $x,
        $y,
        $width,
        $height
    );

    $stmt->execute();
}

echo json_encode([
    "success" => true
]);