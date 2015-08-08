module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),


		// Assembles your email content with html layout
		assemble: {
			options: {
				layout: 'page.hbs',
				layoutdir: './src/works/layouts',
				partials: './src/works/partials/**/*.hbs',
				data: './src/works/data/*.{json,yml}',
				helpers: './src/works/helpers',
				flatten: false
			},
			pages: {
				src: ['./src/content/_pages/**/*.hbs'],
				dest: './_site',
				layout: 'page.hbs'
			}
		},



	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('default', ['assemble']);

};
