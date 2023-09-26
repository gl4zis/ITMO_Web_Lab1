<?php

header('Content-type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $row = new_result();
    if (count($row) > 0) {
        echo json_encode([
            'status' => 200,
            'row' => $row]);
    } else {
        echo json_encode([
            'status' => 400,
            'status-reason' => 'Validation failed'
        ]);
    }
} else {
    echo json_encode([
        'status' => 405,
        'status-reason' => 'Only Get request method is allowed'
    ]);
}

function new_result(): array {
    $x = NULL;
    $y = NULL;
    $r = NULL;

    if (isset($_GET['X']) && isset($_GET['Y']) && isset($_GET['R'])) {
        $x = $_GET['X'];
        $y = $_GET['Y'];
        $r = $_GET['R'];
    }

    if (valid_x($x) && valid_y($y) && valid_r($r)) {
        return array(
            'x' => $x,
            'y' => $y,
            'r' => $r,
            'hit' => check_hit($x, $y, $r) ? "YES" : "NO",
            'time' => number_format((microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']) * 1000, 3) . "ms"
        );
    } else
        return array();
}

function valid_x($x): bool {
    return $x != NULL && is_numeric($x) && $x >= -2 && $x <= 5;
}

function valid_y($y): bool {
    return $y != NULL && is_numeric($y) && $y >= -5 && $y <= 3;
}

function valid_r($r): bool {
    $valid_r = [1, 1.5, 2, 2.5, 3];

    return $r != NULL && is_numeric($r) && in_array($r, $valid_r);
}

function check_hit($x, $y, $r): bool {
    if ($x < 0 && $y < 0)
        return false;
    else if ($y >= 0 && $x <= 0)
        return $y <= $r/2 && $x >= -$r;
    else if ($y >= 0 && $x >= 0)
        return $y <= $r/2 - $x;
    else
        return $y ** 2 + $x ** 2 <= $r ** 2;
}