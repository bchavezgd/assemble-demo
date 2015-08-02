module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		// resuable
		paths: {
			sass: 		'src/works/sass',
			css: 			'_site/css',
			src: 			'src/works',
			src_img: 	'src/images',
			dist: 		'_site',
			dist_img: '_site/images',
			content:	'src/content'
		},

		// setting up plugins.

		// watch
		watch: {
			sass: {
				files: ['<%= paths.sass %>/*.{sass,scss}', '<%= paths.sass %>/**/*'],
				tasks: 'sass'
			},
			assemble: {
				files: '<%= paths.src %>/**/*.hbs',
				tasks: 'assemble'
			}
		},


		// compile sass
		sass: {
			options: {
				outputStyle: 'compact',
			},
			dist: {
				files: {
					'<%= paths.css %>styles.css': '<%= paths.sass %>/styles.sass'
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
				helpers: 		'<%= paths.src %>/helpers/**/*.js',
				layoutdir: 	'<%= paths.src %>/layouts/',
				partials: 	'<%= paths.src %>/partials/**/*.hbs',
				data: 			'<%= paths.src %>/data/*.{json,yml}'
				//flatten: true
			},
			posts: {
				files: [{
						cwd: 	'<%= paths.content %>/',
						dest: '<%= paths.dist %>/',
						expand: true,
						src: ['**/*.hbs', '!_pages/**/*.hbs']
        },
					{
						cwd: 	'<%= paths.content %>/_pages/',
						dest: '<%= paths.dist %>/',
						expand: true,
						src: '**/*.hbs'
        }]
			}
		}

		// end grunt tasks
	});

	/* load every plugin in package.json */
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-watch');


	/* grunt tasks */
	grunt.registerTask('default', ['sass', 'assemble']);

};
