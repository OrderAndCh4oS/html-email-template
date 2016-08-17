module.exports = function (grunt) {

    // This banner gets inserted at the top of the generated files, such a minified CSS
    var bannerContent = '/*!\n' +
        ' * <%= pkg.name %>\n' +
        ' * Version: <%= pkg.version %>\n' +
        ' * Build date: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
        ' */\n\n';

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        emailBuilder: {
            inline: {
                files: {'inlined/boilerplate.html': 'src/boilerplate.html'},
                options: {
                    encodeSpecialChars: true
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true
                },
                files: {                                   // Dictionary of files
                    'inlined/min/boilerplate.html': 'inlined/boilerplate.html' // 'destination': 'source'
                }
            }
        },
        mailgun: {
            marketingTemplates: {
                options: {
                    key: 'key-57e4af1853bdcfa197abb47f04c29aea',
                    sender: 'me@test.com',
                    recipient: ['threeandme.runme@previews.emailonacid.com'],
                    subject: 'This is a test email',
                    preventThreading: true
                },
                src: ['inlined/*.html']
            }
        },
        watch: {
            css: {
                files: ['stylesheets/*.css', 'src/*.html'],
                tasks: ['emailBuilder', 'htmlmin']
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['emailBuilder', 'htmlmin']);
    grunt.registerTask('send', ['emailBuilder', 'htmlmin', 'mailgun']);
};