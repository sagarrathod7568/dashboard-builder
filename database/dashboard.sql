CREATE DATABASE dashboard_builder;

USE dashboard_builder;

CREATE TABLE dashboard_elements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    element_id VARCHAR(255),
    type VARCHAR(50),
    content LONGTEXT,
    position_x INT,
    position_y INT,
    width INT,
    height INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

