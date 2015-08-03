module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		// assemble
		assemble: {
			options: {
				layout: 'page.hbs',
				layoutdir: './src/works/layouts/',
				partials: './src/works/partials/**/*.hbs'
			},
			posts: {
				files: [
					{
						cwd: './src/content/', // nav to dir
						dest: './_site/', // process to this dir w/ folder structure intact
						expand: true,
						src: ['**/*.hbs','**/*.md', '!_pages/**/*.hbs'] // files to process
},
					{
						cwd: './src/content/_pages/', // nav to dir
						dest: './_site/', // proccess to this dir w/folders intact
						expand: true,
						src: '**/*.hbs' // folders/files to process
}]
			}
		}
		// end assemble
	});
	
	grunt.loadNpmTasks('assemble');
	
	grunt.registerTask('default', ['assemble']);
	
};