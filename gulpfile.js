var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	shell = require('gulp-shell'),
	htmltidy = require('gulp-html-beautify'),
	clean = require('gulp-clean'),
	cleancss = require('gulp-clean-css')

var GoogleSpreadsheet = require('google-spreadsheet-to-json'),
	Jimp = require("jimp"),
	slugify = require('slugify'),
	YAML = require('yamljs'),
	fs = require('fs'),
	cliProgress = require('cli-progress');
	
	
var team_image_folder = "./static/assets/images/team-images/";


//collect data from spreadsheet:
gulp.task('collectTeamInfo', function(callbackFinish){ 

	function toTitleCase(str){
	    return str.toLowerCase();
	}

	var members = [];
	console.log("Getting spreadsheet info");
	//receive the spreadsheet info
	var gsjson = require('google-spreadsheet-to-json');
	gsjson({
	    spreadsheetId: '1meX5gF-klNx5NHVAeoiAllOlAaO0uDzdNP0C7ezsvg0',
	    credentials: "./google-api-key/google-api-key.json"
	}).then(function(result) {
		
		//task tester
		var finishedTasks = 0;
		var totalTasks = result.length;
		
		console.log("Downloading "+(result.length+1)+" members...");
				
		//create the progress bar
		var progress_bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
		progress_bar.start(totalTasks+1	, 1);
				

		//loop the object
		result.forEach(function(member) {			
			//generate the filename
			var filename = slugify(toTitleCase(member.name),{replacement: ''}).replace(/\./g, "").replace(/-/g, "")+".png";
			var remoteFileName = member['image'];
			//replace the image
			member['image'] = filename;
			
			//push the member object to member
			members.push(member);

			//resize the image to a 480x480
			Jimp.read(remoteFileName.trim()).then(function (imageObject) {
				imageObject.cover(480,480).write(team_image_folder+filename);
				//increment the progressbar
				progress_bar.increment();
				finishedTasks++;				
				if (totalTasks == finishedTasks) {
					console.log("\nDone! Storing team YAML");
					yamlString = YAML.stringify(members, 4);
					fs.writeFile("./data/Team.yaml", yamlString, function(err) {
						progress_bar.stop();						
						callbackFinish();
					});
				}
			}).catch(function (err) {
			});
		});
	});
});

//generate an image
gulp.task('generateTeamOpengraph', ['collectTeamInfo'], function(callbackFinish){ 
	
	
	//new arary for images
	team_images = [];


	function filterArray(array,pattern) {
		return_array = [];
		array.forEach(function(image) {
			if (image.match(pattern)) {
				return_array.push(image);
			}
		});
		return return_array;
	}

	function fillArrayTillCount(arr, count) {
		return_array = [];
		array_cursor = 0;
		for (i = 0; i < (count+1); i++) { 
			if (array_cursor >= arr.length)
				array_cursor = 0;
			return_array.push(arr[array_cursor]);
			array_cursor++;
		}
		return return_array;
	}


	tile_height = tile_width = 120;
	opengraph_height = opengraph_width = 1200;
	x = y = 0;
	opengraph_logo = "./static/assets/images/opengraph-images/opengraph-transparant.png";
	opengraph_team_dest = "./static/assets/images/opengraph-images/opengraph-team.jpg";
	logo_width_constraint = 1.2;
	

	
	//read the filenames from the team directory
    fs.readdir(team_image_folder, function(err, filenames) {
	       
	    //clean the filennames
	    filenames = filterArray(filenames,/.png/g);

		//file array
		file_reads = [];
		
		//prepare the files:
	    
    	file_reads.push(Jimp.read(opengraph_logo))
    	file_reads.push(new Jimp(opengraph_width, opengraph_height,0x1D1D3FFF))
		//loop files
	    filenames.forEach(function(image) {
			file_reads.push(Jimp.read(team_image_folder+"/"+image));
		});

		Promise.all(file_reads).then(function(images) {
			
			city_logo = images[0];
			city_overlay = images[1];
			images.shift();
			images.shift();
			
			//we need x amount of images:
			image_amount = Math.ceil(opengraph_height / tile_height) * Math.ceil(opengraph_width / tile_width);
			
			//get x images from our image array
			random_member_images = fillArrayTillCount(images, image_amount);
			
			console.log("Generating "+image_amount+" images");
			//create the progress bar
			var progress_bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
			progress_bar.start(random_member_images.length, 1);

			
			//create new image
			new Jimp(opengraph_width, opengraph_height,0x1D1D3FFF, function (err, opengraph_image) {
				
				//loop through the member images
				random_member_images.forEach(function(member_image){
					progress_bar.increment();					
					//resize the images
					member_image.resize(tile_height, tile_width);
					opengraph_image.blit(member_image, x, y);
					x += tile_width;
					if (x >= opengraph_width) {
						x = 0;
						y += tile_height; 
					}
				});
				
				//overlay the overlay, lol:
				city_overlay.opacity(.5);
				opengraph_image.composite(city_overlay, 0, 0);
				
				//overlay the logo:
				city_logo_height = opengraph_height / logo_width_constraint; //allow 5% each side
				city_logo_width = opengraph_width / logo_width_constraint;
				
				//do the placing,
				city_logo_x = (opengraph_height / 2) - (city_logo_height/2);
				city_logo_y = (opengraph_width / 2) - (city_logo_width/2);
				
				city_logo.contain(city_logo_height,city_logo_width);
				opengraph_image.composite(city_logo, city_logo_x, city_logo_y);

				//set background color for opacity
				this.quality(85).write(opengraph_team_dest)
				progress_bar.stop();
				callbackFinish();
			});
		});		
	});	
});

//remove the Public folder
gulp.task('removePublicFolder', ['generateTeamOpengraph'], function(){ 
	gulp.src('app/tmp', {read: false})
	        .pipe(clean());
});

//running hugo
gulp.task('runHugo', ['removePublicFolder'], shell.task([
  'hugo'
]));

//javascript minfication
gulp.task('minifyJavascript', ['runHugo'], function(){
    gulp.src('./public/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest("./public/assets/js/"));
});

//css minfication
gulp.task('minifyCSS', ['runHugo'], function(){
    gulp.src('./public/assets/css/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest("./public/assets/css/"));
});

//HTML tidy
gulp.task('tidyHTML', ['runHugo'], function(){	
    gulp.src('./public/**/*.html')
        .pipe(htmltidy({
		    "indent_size": 4,
	        "indent_char": " ",
	        "eol": "\n",
	        "preserve_newlines": false,
	        "keep_function_indentation": false,
	    }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('build',['collectTeamInfo','generateTeamOpengraph','removePublicFolder','runHugo','minifyJavascript','minifyCSS','tidyHTML'],function(){});
gulp.task('retrieveData',['collectTeamInfo', 'generateTeamOpengraph'],function(){});
gulp.task('generateOpengraph',['generateTeamOpengraph'],function(){});