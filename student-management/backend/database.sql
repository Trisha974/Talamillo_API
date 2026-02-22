CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  course VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO students (name, course, year) VALUES

('express cors', 'BSCS', 1),
('Trisha', 'BSCS', 2);

-- add delete column
ALTER TABLE students ADD COLUMN deleted TINYINT(1) DEFAULT 0;