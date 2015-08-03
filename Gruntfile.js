module.exports = function (grunt) {
	'use strict';

	// vars for directories.
	var SRC = '/src/works',
		DEST = '_site/',
		SASSDIR = '/src/works/sass',
		CSSdir = DEST + '/css',
		CONTENT = SRC + '/content';

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),



		// assemble
		assemble: {
			options: {
				// Needs {{> body }} in layouts when using layoutdir
				layoutdir: SRC + '/layouts/',
				// partials need extention explictly defined.
				partials: SRC + '/partials/**/*.hbs',
				// data file
				data: SRC + '/data/*.{json, yml}'
			},
			posts: {
				files: [
					{
						cwd: './src/content/', // nav to dir
						dest: DEST, // process to this dir w/ folder structure intact
						expand: true,
						src: ['**/*.hbs', '**/*.md', '!_pages/**/*.hbs'] // files to process
},
					{
						cwd: './src/content/_pages/', // nav to dir
						dest: DEST, // proccess to this dir w/folders intact
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
