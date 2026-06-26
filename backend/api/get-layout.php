<?php

include '../config/db.php';

$result = $conn->query(
    "SELECT * FROM dashboard_elements"
);

$widgets = [];

while ($row = $result->fetch_assoc()) {

    $widgets[] = [
        "id" => $row['id'],
        "type" => $row['type'],
        "content" => $row['content'],
        "x" => (int)$row['position_x'],
        "y" => (int)$row['position_y'],
        "width" => (int)$row['width'],
        "height" => (int)$row['height']
    ];
}

echo json_encode($widgets);