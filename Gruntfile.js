module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		// resuable
		paths: {
			sass: 		'/src/works/sass/',
			css: 			'/_site/css/',
			src: 			'src/works/',
			src_img: 	'/src/images/',
			dist: 		'/_site/',
			dist_img: '/_site/images/'
		},

		// setting up plugins.

		// watch
		watch: {
			sass: {
				files: ['<%= paths.sass %>*.sass', '<%= paths.sass %>**/*'],
				tasks: 'sass'
			},
			assemble: {
				files: '<%= paths.src %>**/*.hbs',
				tasks: 'assemble'
			}
		},

		// node server
		connect: {
			dev: {
				options: {
					port: 8000,
					base: './_site/'
				}
			}
		},

		// compile sass
		sass: {
			options: {
				outputStyle: 'compact',
			},
			dist: {
				files: {
					'<%= paths.css %>styles.css': '<%= paths.sass %>styles.sass'
				}
			}
		},

		// compile to pages.

		assemble: {
			options: {
				collections: [{
					name: 'post',
					sortby: 'posted',
					sortorder: 'descending'
        }],
				layout: 		'page.hbs',
				helpers: 		'.<%= paths.src %>helpers/**/*.js',
				layoutdir: 	'.<%= paths.src %>layouts/',
				partials: 	'.<%= paths.src %>partials/**/*.hbs'
			},
			posts: {
				files: [{
						cwd: 	'<%= paths.contents %>',
						dest: '<%= paths.dist %>',
						expand: true,
						src: ['**/*.hbs', '!_pages/**/*.hbs']
        },
					{
						cwd: 	'<%= paths.contents %>_pages/',
						dest: '<%= paths.dist %>',
						expand: true,
						src: '**/*.hbs'
        }]
			}
		}

		// end grunt tasks
	});

	/* load every plugin in package.json */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-watch');


	/* grunt tasks */
	grunt.registerTask('default', ['sass', 'assemble']);

};
