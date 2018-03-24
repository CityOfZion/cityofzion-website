var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	shell = require('gulp-shell'),
	htmltidy = require('gulp-html-beautify'),
	clean = require('gulp-clean'),
	cleancss = require('gulp-clean-css')

var Jimp = require("jimp"),
	slugify = require('slugify'),
	YAML = require('yamljs'),
	fs = require('fs'),
	cliProgress = require('cli-progress');
		
var team_image_folder = "./static/assets/images/team-images/";

//generate an image
gulp.task('generateTeamOpengraph', function(callbackFinish){ 

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
	    filenames = filterArray(filenames,/.jpg/g);

		//file array
		file_reads = [];
		
		//prepare the files:
	    
    	file_reads.push(Jimp.read(opengraph_logo))
    	file_reads.push(new Jimp(opengraph_width, opengraph_height,0x1D1D3FFF))
		//loop files
	    filenames.forEach(function(image) {
		    if (image != "anonymous.jpg") {
				file_reads.push(Jimp.read(team_image_folder+"/"+image));
			}
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
				this.quality(100).write(opengraph_team_dest)
				progress_bar.stop();
				callbackFinish();
			});
		});		
	});	
});

//remove the Public folder
gulp.task('removePublicFolder', ['generateTeamOpengraph'], shell.task([
  'rm -rf ./public/'
]));

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

gulp.task('build',['generateTeamOpengraph','removePublicFolder','runHugo','minifyJavascript','minifyCSS','tidyHTML'],function(){});