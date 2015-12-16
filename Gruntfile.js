module.exports = function (grunt) {
	grunt.initConfig({
        
		// Set Grunt to watch our files and run tasks on them
		watch: {
			sass: {
				files: '_sass/*.scss',
				tasks: ['sass', 'bsReload:css'],
			},
			css: {
				files: 'css/*.css',
				tasks: ['postcss'],
			},
		},

		// Create a OS notification to tell us when tasks have been completed or if there are errors
		notify_hooks: {
			options: {
				enabled: true,
				success: true,
				duration: 3
			}
		},

		// Run Sass on the listed files
		sass: {
			options: {
				sourceMap: false
			},
			dist: {
				files: {
					'css/main.css': '_sass/custom/*.scss'
				}
			}
		},

		// Use Postcss to create sourcemaps for Sass, autoprefixer and cssnano
		postcss: {
			options: {
				map: {
					inline: false,
					annotation: 'css/maps/'
				},
				processors: [
					require('autoprefixer')({
						browsers: 'last 2 versions'
					}),
					require('cssnano')()
				]
			},
			dist: {
				src: 'css/main.css'
			}
		},

		// Autorefresh browser - http://localhost:3000/yourpage.html
		browserSync: {
			default_options: {
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


	/* Run above tasks */

	grunt.registerTask('default', ['watch']);
	//grunt.registerTask('default', ['browserSync', 'watch']);
	//grunt.registerTask('postcss', ['postcss', 'watch']);

	grunt.task.run('notify_hooks');
};
