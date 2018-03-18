#!/usr/bin/php
<?php
//change dir
chdir(__DIR__);
//we need Yaml for it
use Symfony\Component\Yaml\Yaml;

//we need a slugify
use Cocur\Slugify\Slugify;

require __DIR__ . '/vendor/autoload.php';

// *******
// Parameters
// *******
define("TEAM_DATA_FILE", __DIR__."/../data/Team.yaml");
define("SPREADSHEET_ID","1meX5gF-klNx5NHVAeoiAllOlAaO0uDzdNP0C7ezsvg0");
define("IMAGE_FOLDER", __DIR__."/../static/assets/images/team-images/");



//fix the Google client
$client = new \Google_Client();
$client->setApplicationName('My PHP App');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$client->setAuthConfig(json_decode(file_get_contents("./api-key.json"), true));	

//open the sheet
$sheets = new \Google_Service_Sheets($client);

echo "Opening Spreadsheet".PHP_EOL;

//loop the rows
$rows = $sheets->spreadsheets_values->get(SPREADSHEET_ID, "A1:Z99");

//get the data
$data = $rows['values'];
//shift for the header
$headers = array_shift($data);
$members = $data;

//set slugify for filename
$s = new Slugify(['lowercase' => false]);

//yaml_array
$yaml_array = array();

echo "Looping users".PHP_EOL;
//loop  the members
foreach ($members as $row) {

	$yaml_data = [];
	//combine headers and data
	foreach ($headers as $k => $h) {
		if (@$row[$k] == "")
			$v = "";
		else
			$v = $row[$k];
	
		$yaml_data[$h] = $v;
	}

	//writing to console
	echo "Reading: {$yaml_data['Name']}".PHP_EOL;
	
	
	//create image filename
	$imageFilename = $s->slugify(ucwords($yaml_data['Name']),"").".png"; 

	//writing to console
	echo " - Storing image...";
	
	//setup image manipulator
	$i = new \claviska\SimpleImage($yaml_data['Image']);
	$i->thumbnail(320, 320, "center")
	  ->toFile(IMAGE_FOLDER."/".$imageFilename, 'image/png');

	//change the image name
	$yaml_data['Image'] = $imageFilename;
	
	//write to array
	$yaml_array[] = $yaml_data;
	echo "done".PHP_EOL.PHP_EOL;
}

echo "Storing team to to: ".TEAM_DATA_FILE.PHP_EOL;
file_put_contents(TEAM_DATA_FILE, Yaml::dump($yaml_array));
echo "Done!".PHP_EOL;
?>