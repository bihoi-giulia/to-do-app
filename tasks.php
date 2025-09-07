<?php
session_start();
header('Content-Type: application/json');

$file = 'tasks.json';
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$tasks = json_decode(file_get_contents($file), true);
$action = $_GET['action'] ?? '';

if ($action === 'getTasks') {
    echo json_encode($tasks);
    exit;
}

if ($action === 'addTask') {
    $task = $_POST['task'] ?? '';
    if ($task) {
        $tasks[] = $task;
        file_put_contents($file, json_encode($tasks));
    }
    echo json_encode($tasks);
    exit;
}
?>
