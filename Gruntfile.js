// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
    // CONFIGURE GRUNT
    grunt.initConfig({
        // get the configuration info from package.json file
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
	
		shell: {
			options: {
				stderr: false
			},
			ClearFolder: {
				command: 'rm -rf ./public'
			},
			RunHugo: {
				command: 'hugo'
			},
			HugoServer: {
				command: 'hugo server -D'
			}			
		},
        // all of our configuration goes here
        uglify: {
			UglifyJS : {
			    expand: true,
			    cwd: './public/assets/js/',
			    ext: '.js',
			    src: ['*.js'],
			    dest: './public/assets/js/'
			  },
            options: {},
            build: {}
        },
        prettify: {
            options: {
                // Task-specific options go here. 
            },
            sourceHtml: {
			    expand: true,
			    cwd: './public/',
			    ext: '.html',
			    src: ['*.html',"**/*.html"],
			    dest: './public/'
			  }
        },
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: './public/assets/css',
		      src: ['*.css'],
		      dest: './public/assets/css',
		      ext: '.css'
		    }]
		  }
		},
		   
    });

	grunt.registerMultiTask('processSpreadsheet', 'Log stuff.', function() {
	   grunt.log.writeln(this);
	   
	});


	//load shell tasks
    grunt.loadNpmTasks('grunt-shell');
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-prettify');
    
    //minify css
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('build', ['shell:ClearFolder','shell:RunHugo','uglify','prettify','cssmin']);

    // Default task(s).
    grunt.registerTask('server', ['shell:HugoServer']);

};