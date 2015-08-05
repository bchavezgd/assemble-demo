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
				
				// data files
				data: SRC + '/data/*.{json, yml}'
			},
			collection: [{
				name: 'pages',
				inflection: 'page',
				
			}]
		}
		// end assemble
	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('default', ['assemble']);

};
