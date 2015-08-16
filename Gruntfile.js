module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		assemble: {
			options: {
				// calls a default layout, needs layoutdir: or full path.
				layout: 'page.hbs',
				// needed when using layout.
				layoutdir: './src/works/layouts',
				// where to look for partials - no default.
				partials: './src/works/partials/**/*.hbs',
				// data dir. no default
				data: './src/works/data/*.{json,yml}',
				// needs to target files. not just a dir
				helpers: ['./src/works/helpers/*.js'],
			},
			// pages is a built in assemble collection.
			pages: {
				// adds additional set of Grunt.js commands
				expand: true,
				flatten: false,
				cwd: 'src/content/_pages/',
				src: ['**/*.{hbs, md}'],
				dest: './_site'
			},
			posts: {
				expand: true,
				flatten: true,
				cwd: './src/content/blog/',
				src: '**/*.md',
				dest: './_site/blog/'
			},
			collections: [{
				name: 'blogs',
				inflection: 'post',
				sortorder: 'desc',
				sortby: 'date'
			}],

		},
		// end assemble

		clean: ['./_site/'],

		sass: {
			options: {
				outputStyle: 'expanded',
				outFile: './_site/css/styles.css',
				sourceMap: true
			},
			dist: {
				files: {
					'./_site/css/styles.css': './src/works/sass/styles.sass',
				}
			}
		}



	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass')

	grunt.registerTask('default', ['clean', 'sass', 'assemble']);

};
