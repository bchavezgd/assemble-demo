module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		// reusable paths. 
		paths: {
			src: './src',
			works: './src/works',
			dist: './_site',
			content: './src/content'
		},

		assemble: {
			options: {
				// calls a default layout, needs `layoutdir:` or full path.
				layout: 'page.hbs',

				// needed when using `layout:`.
				layoutdir: '<%= paths.works %>/layouts/',

				// where to look for partials - no default.
				partials: '<%= paths.works %>/partials/**/*.hbs',

				// data dir. no default
				data: '<%= paths.works %>/data/*.{json,yml}',

				// needs to target files. not just a dir
				helpers: [
					'<%= paths.works %>/helpers/*.js'
				],
			},
			// pages is a built in assemble collection.
			pages: {
				// adds additional set of Grunt.js commands
				expand: true,
				flatten: false,
				cwd: '<%= paths.content %>/content/_pages/',
				src: ['**/*.{hbs, md}'],
				dest: '<%= paths.dist %>/'
			},
			// posts acting as a page collection. 
			posts: {
				expand: true,
				flatten: true,
				cwd: '<%= paths.content %>/blog/',
				src: '**/*.md',
				dest: '<%= paths.dist %>/blog/'
			},
			// collections should be for adding navs and whatnot. 

		},
		// end assemble

		clean: ['<%= paths.dist %>'],

		sass: {
			options: {
				outputStyle: 'expanded',
				sourceMap: false
			},
			files: {
				src: '<%= paths.works %>/sass/styles.sass',
				dest: '<%= paths.dist %>style.css'
			}
		},

		postcss: {},

		connect: {
			server: {
				hostname: 'localhost',
				port: '3000',
				livereload: true,
				base: '<%= paths.dist %>'
			}
		},
		watch: {
			files: [
				'<%= paths.src %>/**/*'
			],
			tasks: [
				'sass',
			//	'postcss',
				'assemble'
			],
			options: {
				spawn: false,
				event: 'all',
				livereload: true
			}
		}



	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['clean', 'sass', 'assemble', 'connect', 'watch']);

};