<?php

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->feedback))
{
    $path = "./feedback/";
    $files = glob($path . "*.txt");
    $nextNumber = count($files) + 1;
    $filename = $nextNumber . ".txt";
    file_put_contents($path . $filename, $data->feedback);
   
    header('Content-Type: application/json');
    echo json_encode(["status" => "success", "file" => $filename]);
}
else 
{
    http_response_code(400);
    echo json_encode(["status" => "error", "message" =>"Invalid data"]);
}
        
?>
