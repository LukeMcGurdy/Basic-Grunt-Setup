module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            // This will be executed when we run the 'development' task below
            development: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            },
            // This will be executed when we run the 'deploy' task below
            deploy: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'css/maps/' // ...to the specified directory
                },
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass:dev']
            },
            postcss: {
                files: 'css/style.css',
                tasks: ['autoprefixer'],
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['css/*.css', 'js/*.js', '*.html', 'img/*'],
            }
        },
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-livereload');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Register the default tasks.
    //    grunt.registerTask('default', ['watch']);
    //    grunt.registerTask('development', ['sass:development']);
    //    grunt.registerTask('deploy', ['sass:deploy']);

    grunt.registerTask('default', ['postcss:dist', 'sass:dev', 'livereload', 'watch']);
};