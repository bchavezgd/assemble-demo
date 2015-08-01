module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),


		// setting up plugins.

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
				sourceComments: true,
				sourceMap: true,

			},
			dist: {
				files: {
					'_site/css/styles.css': 'src/sass/styles.sass'
				}
			}
		},

		// compile to pages.
		assemble: {
			options: {
				collections: [{
					name: 'post',
					sortby: 'date',
					sortorder: 'descending'
				}],
				layout: 'page.hbs',
				layoutdir: './src/templates/layouts/',
				partials: './src/templates/partials/**/*.hbs'

			},
			posts: {
				files: [
					{
						cwd: './src/content/',
						dest: './_site/',
						expand: true,
						src: ['**/*.hbt', '!_pages/**/*.hbs']
					},
					{
						cwd: './src/content/_pages/',
						dest: './_site/',
						expand: true,
						src: '**/*.hbs'
					 }
				 ]
			}
		}
	});

	/* load every plugin in package.json */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('assemble');


	/* grunt tasks */
	grunt.registerTask('default', ['sass', 'assemble']);

};
