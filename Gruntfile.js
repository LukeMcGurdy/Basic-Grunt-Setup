module.exports = function (grunt) {
	grunt.initConfig({
        
		// Set Grunt to watch our files and run tasks on them
		watch: {
			sass: {
				files: '_sass/*.scss', // The files to watch. Use a wildcard selector to watch multiple files
				tasks: ['sass', 'bsReload:css'],
			},
			// As above
			css: {
				files: 'css/*.css',  
				tasks: ['postcss'],
			},
		},

		// Create OS notification to tell us when tasks have been completed or if there are errors
		notify_hooks: {
			options: {
				enabled: true,
				success: true,
				duration: 3
			}
		},

		// Compile the listed files and output
		sass: {
			options: {
				sourceMap: false // No source map as postcss can do this. 
			},
			dist: {
				files: {
					'css/main.css': '_sass/custom/*.scss' // Read right to left - compile *.scss and output to main.css  
				}
			}
		},

		// Use Postcss to create sourcemaps for Sass, autoprefixer and cssnano
		postcss: {
			options: {
				// Create sourcemaps and output to defined dir
				map: {
					inline: false,
					annotation: 'css/maps/'
				},
				// Run postcss magic - in this case autoprefixer and css nano
				processors: [
					require('autoprefixer')({
						browsers: 'last 2 versions'
					}),
					require('cssnano')()
				]
			},
			// Output result to here
			dist: {
				src: 'css/main.css'
			}
		},

		// Autorefresh browser - http://localhost:3000/yourpage.html
		browserSync: {
			default_options: {
				// look for changes to here
				bsFiles: {
					src: "css/*.css"
				},
				options: {
					//watchTask: true,
					server: {
						baseDir: ""
					}
				}
			}
		},
		bsReload: {
			css: "*.css"
		},

	});

	/* Load tasks */

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-browser-sync');

	/* Run above tasks as selected */

	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('default', ['browserSync', 'watch']);
	//grunt.registerTask('postcss', ['postcss', 'watch']);

	grunt.task.run('notify_hooks');
};
