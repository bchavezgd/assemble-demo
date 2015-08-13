module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),


		// Assembles your email content with html layout
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
				// helpers: './src/works/helpers',
				// flatten creates a weird file structure in the dest dir
				flatten: false
			},
			// pages is a built in assemble collection.
			pages: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'src/content/_pages/',
					src: ['**/*.hbs'],
					dest: '_site'
				}]
			}
		},



	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('default', ['assemble']);

};
