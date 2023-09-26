<?php

header('Content-type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION))
        session_start();
    if (!isset($_SESSION['table'])) {
        $_SESSION['table'] = '';
    }

    if (empty($_GET)) {
        send_table();
    } else if (isset($_GET['delete']) && $_GET['delete'] == true) {
        $_SESSION['table'] = '';
        send_table();
    } else {
        $row = new_result();
        if (count($row) > 0) {
            add_row_in_table($row);
            send_table();
        } else {
            echo json_encode([
                'status' => 400,
                'status-reason' => 'Validation failed'
            ]);
        }
    }
} else {
    echo json_encode([
        'status' => 405,
        'status-reason' => 'Only Get request method is allowed'
    ]);
}

function send_table(): void {
    echo json_encode([
        'status' => 200,
        'table' => $_SESSION['table']]);
}

function add_row_in_table($row): void {
    $html_row = get_html_row($row);
    $_SESSION['table'] .= $html_row;
}

function get_html_row($row): string {
    $answer = '<tr>';
    $answer .= '<td>' . 0 . '</td>';
    $answer .= '<td>' . $row['x'] . '</td>';
    $answer .= '<td>' . $row['y'] . '</td>';
    $answer .= '<td>' . $row['r'] . '</td>';
    $answer .= '<td>' . $row['hit'] . '</td>';
    $answer .= '<td>' . $row['date'] . '</td>';
    $answer .= '<td>' . $row['time'] . '</td>';
    $answer .= '</tr>';
    return $answer;
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
            'date' => date("Y-m-d H:i:s T"),
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