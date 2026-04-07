<?php

$json = file_get_contents('php://input');
$data = json_decode($json);

if ($data->raCode)
{
	#$filename = $data->raCode;
	$filename = "ra-code.txt";
	file_put_contents("./ra-code/" . $filename, $data->raCode);
	header('Content-Type: application/json');
	#echo json_encode(["status" => "success", "file" => $data->raCode]);
	echo json_encode(["status" => "success", "file" => $filename]);
}
else 
{
    http_response_code(400);
    echo json_encode(["status" => "error", "message" =>"Invalid data"]);
}

?>
