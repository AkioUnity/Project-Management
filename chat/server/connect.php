<?php

$servername = 'localhost';
$database = 'pm';
$username = 'root';
$password = 'ajrnskak10';
$charset = 'utf8mb4';
$dbPrefix = 'lsv_';
$pasPhrase = '';


$dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}