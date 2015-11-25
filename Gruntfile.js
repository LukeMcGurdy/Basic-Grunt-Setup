module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'dist/css/styles.css': 'sass/styles.scss'
                }
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'dist/css/maps/'
                },
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }),
                    require('cssnano')()
                ]
            },
            dist: {                
                src: 'dist/css/styles.css'
            }
        },

        watch: {
            sass: {
                files: 'sass/*.scss',
                tasks: ['sass', 'postcss']
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-cssnano');    

    grunt.registerTask('default', ['watch']);

};
