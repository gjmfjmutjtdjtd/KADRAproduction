<?php
header('Content-Type: application/json');

$response = [
    'success' => false,
    'message' => 'Неизвестная ошибка.'
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение и очистка данных
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $timestamp = date("Y-m-d H:i:s");

    // Серверная валидация
    if (empty($name) || empty($phone)) {
        $response['message'] = 'Имя и телефон обязательны для заполнения.';
        echo json_encode($response);
        exit;
    }

    // Защита от простых ботов (honeypot)
    if (!empty($_POST['spam_field'])) {
        $response['message'] = 'Произошла ошибка валидации.';
        echo json_encode($response);
        exit;
    }

    // Путь к файлу для сохранения заявок
    $leadsFile = 'leads.csv';
    
    // Формирование строки для записи
    // CSV формат: "Дата", "Имя", "Телефон", "Сообщение"
    $csvData = [
        $timestamp,
        str_replace('"', '""', $name),
        str_replace('"', '""', $phone),
        str_replace('"', '""', $message)
    ];

    // Открытие файла для записи
    $file = fopen($leadsFile, 'a');

    if ($file) {
        // Если файл пустой, добавляем заголовки
        if (filesize($leadsFile) == 0) {
            fputcsv($file, ['Дата', 'Имя', 'Телефон', 'Сообщение']);
        }
        
        // Записываем данные в файл
        fputcsv($file, $csvData);
        fclose($file);
        
        $response['success'] = true;
        $response['message'] = 'Спасибо! Мы свяжемся с вами в течение часа.';

    } else {
        $response['message'] = 'Не удалось сохранить заявку. Попробуйте позже.';
    }
} else {
    $response['message'] = 'Неверный метод запроса.';
}

echo json_encode($response);
?>