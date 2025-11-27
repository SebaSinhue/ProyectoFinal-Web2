CREATE DATABASE IF NOT EXISTS node_crud;
USE node_crud;

CREATE TABLE IF NOT EXISTS usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL, 
    username VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS lista (
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL, 
    descripcion VARCHAR(100)
);

INSERT INTO usuario (nombre, username, contrasena)
VALUES ('Administrador', 'admin', 'admin1234')
ON DUPLICATE KEY UPDATE username = username;

