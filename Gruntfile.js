/**
 * Created by park on 15. 4. 23..
 */
module.exports = function (grunt) {

    grunt.file.defaultEncoding = "utf8";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //uglify 설정
        uglify: {
            options: {
                banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */ ' //파일의 맨처음 붙는 banner 설정
            },
            build: {
                src: 'dist/js.js', //uglify할 대상 설정
                dest: 'dist/js.min.js' //uglify 결과 파일 설정
            }
        },
        //concat 설정
        concat: {
            client: {
                src: [
                    'dev/client/*.js',
                    'dev/**/*.cjs'
                ],
                dest: 'dist/js.js'
            },
            server: {
                src: [
                    'dev/server/*.js',
                    'dev/**/*.sjs'
                ],
                dest: 'dist/server.js'
            }
        },

        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: [
                    "dev/**/*.css"
                ],
                dest: "dist/css.css"
            }
        },

        watch: {
            scripts: {
                files: [
                    'dev/**/*'
                ],
                tasks: ['concat', 'uglify', 'concat_css'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify", "concat" tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'concat_css']); //grunt 명령어로 실행할 작업

};