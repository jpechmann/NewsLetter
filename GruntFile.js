/* jshint camelcase: false */
module.exports = function(grunt) {
    var newsletter = ['src/index.html'];
    var gruntFile = 'GruntFile.js';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            src: {
                files: [newsletter],
                options: {
                    livereload: true
                }
            }
        },
        copy: {
            main: {
                files: [{expand: true, cwd: 'src/', src: ['images/*'], dest: 'dist/', filter: 'isFile'}]
            }
        },
        connect: {
            server: {
                options: {
                    open: {
                        target: 'http://localhost:8000/src' // target url to open
                    },
                    port: 8000
                }
            },
        },
        imagemin: { // Task
            dynamic: { // Another target
                options: { // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/', // Src matches are relative to this path
                    src: '**/*.{png,jpg,gif}', // Actual patterns to match
                    dest: 'src/'
                }]
            }
        },
        inline: {
            dist: {
                src: ['src/index.html'],
                dest: ['dist/index.html']
            }
        },
        uncss: {
            dist: {
                files: {
                    'dist/css/tidy.css': newsletter
                }
            }
        }
    });

    // Loading dependencies
    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    // Default task.
    grunt.registerTask('default', [
        'newer:imagemin:dynamic',
        'uncss:dist',
        'inline:dist',
        'copy:main',
        'connect:server',
        'watch'
    ]);
};