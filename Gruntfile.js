module.exports = function(grunt) {

    require('es6-promise').polyfill();

    grunt.initConfig({
        // Set Grunt to watch our files and run tasks on them
        watch: {
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass']
            },
            css: {
                files: 'css/styles.css',
                tasks: ['postcss'],
            }
        },

        // Run Sass on the listed files
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/styles.css': 'sass/styles.scss',
                }
            }
        },

        // Use Postcss cssnano inc autoprefixer and a bunch of other optimizations
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }),
                    require('cssnano')({
                        zindex: false
                    })
                ]
            },
            dist: {
                src: 'css/styles.css'
            }
        },

    });

    /* Load tasks */

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');


    /* Run above tasks */

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['postcss', 'watch']);

};
