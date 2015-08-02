module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),


		// setting up plugins.

		// watch
		watch: {
			style: {
				files: ['./src/works/sass/*.{sass,scss}', './src/works/sass/**/*'],
				tasks: 'sass'
			},
			assemble: {
				files: ['./src/works/**/*.hbs','./src/content/**/*.hbs'],
				tasks: 'assemble'
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
				layout: 		'page.hbs',
				helpers: 		'./src/works/helpers/**/*.js',
				layoutdir: 	'./src/works/layouts/',
				partials: 	'./src/works/partials/**/*.hbs'
				//data: 			'./src/works/data/*.{json,yml}'
				//flatten: true
			},
			pages: {
            src: ['./src/content/_pages/*.hbs', './src/content/blog/*.md'],
            dest: './_site/'
          }
			},

			// compile sass
		sass: {
			options: {
				outputStyle: 'compact',
			},
			dist: {
				files: {
					'./_site/css/styles.css': './src/works/sass/styles.sass'
				}
			}
		}

		// end grunt tasks
	});

	/* load every plugin in package.json */
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-watch');


	/* grunt tasks */
	grunt.registerTask('default', ['style', 'assemble']);

};
