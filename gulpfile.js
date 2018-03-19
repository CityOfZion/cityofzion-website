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
	

//collect data from spreadsheet:
gulp.task('collectTeamInfo', function(callbackFinish){ 

	function writeYaml(members) {
		console.log("\nDone! Storing team YAML");
		yamlString = YAML.stringify(members, 4);
		fs.writeFile("./data/Team.yaml", yamlString, function(err) {
			callbackFinish();
		});
	}
	
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
		
		console.log("Downloading "+result.length+" images...");
				
		//create the progress bar
		var progress_bar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
		progress_bar.start(totalTasks-1	, 0);
				

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
			Jimp.read(remoteFileName).then(function (imageObject) {
				imageObject.cover(480,480).write("./static/assets/images/team-images/"+filename);
				//increment the progressbar
				progress_bar.increment();
				finishedTasks++;				
				if (totalTasks == finishedTasks) {
					writeYaml(members);
					progress_bar.stop();
				}
			}).catch(function (err) {
			});
		});
	});
});



//remove the Public folder
gulp.task('removePublicFolder', ['collectTeamInfo'], function(){ 
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

gulp.task('build',['collectTeamInfo','removePublicFolder','runHugo','minifyJavascript','minifyCSS','tidyHTML'],function(){});
gulp.task('retrieveData',['collectTeamInfo'],function(){});