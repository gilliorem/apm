<?php

$json = file_get_contents('php://input');
$data = json_decode($json);

if ($data->participantList)
{
	$filename = "participant-list.txt";
	file_put_contents("./participants/" . $filename, $data->participantList);
	
	$command = '/usr/bin/python3 ~/var/www/html/apm/parse_html.py 2>&1';
	$output = shell_exec($command);	

	$responseData = [
		"status" => "success",
		"file" => $filename,
		"python_command" => $command,
		"python_output" => $output
	];
	header('Content-Type: application/json');
	echo json_encode($responseData);
}
else 
{
    http_response_code(400);
    echo json_encode(["status" => "error", "message" =>"Invalid data"]);
}

	#$command = escapeshellcmd('python3 parse_html.py');
	#$cmd_str = json_encode(["command" => $command]);
	#echo $cmd_str;
	#$output = shell_exec($command);
	#$output_str = json_encode($output);
	#echo $output_str;
?>
