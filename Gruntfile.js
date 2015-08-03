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

		paths: { // <%= paths. %>
			src: '/src/works',
			dest: '/_site',
			content: '/src/content'
		},


		/* assemble templating */
		assemble: {
			options: {
				collections: [{
					name: 'post',
					sortby: 'posted',
					sortorder: 'descending'
        }],
				helpers: '.<%= paths.src %>/helpers/**/*.js',
				layout: 'page.hbs',
				layoutdir: '.<%= paths.src %>/layouts/',
				partials: '.<%= paths.src %>/partials/**/*'
			},
			posts: {
				files: [
					{
					cwd: './src/content/blog',
					dest: './_site/blog/',
					expand: true,
					src: ['**/*.hbs', '!_pages/**/*.hbs']
        },
					{
						cwd: './src/content/_pages/',
						dest: './_site/',
						expand: true,
						src: '**/*.hbs'
        }]
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
