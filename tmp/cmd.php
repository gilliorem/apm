<?php

	$command = escapeshellcmd('python3 parse_html.py');
	$output = shell_exec($command);
	echo ($output. $command);

?>
