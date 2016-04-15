module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({

		copy: {
		  dist: {
		    files: [
		        {
		            expand: true, //habilita o cwd
		            cwd: 'source-site/',     
		            src: ['mock/**/*', 'web-files/imagem/**/*', 'web-files/images/**/*'], 
		            dest: 'deploy-site/'
		        },
		        {
		            expand: true, //habilita o cwd
		            cwd: 'source-site/',
		            src: ['*.html'], 
		            dest: 'deploy-site/'
		        },
		        {
		            expand: true, //habilita o cwd
		            cwd: 'src/css/',
		            src: ['pea-imagem/**/*'], 
		            dest: 'dist/css/'
		        }
		    ]        
		  }
		},


		clean: {
		  dist: {
		    src: ["deploy-site", "dist"]
		  }
		},

		cssmin: {
		    distSite: {
			    files: [
				    {
				      expand: true,
				      cwd: 'source-site/',
				      src: ['web-files/css/*.css'],
				      dest: 'deploy-site/',
				      ext: '.min.css'
				    }
			    ]
		    },
		    distPea: {
			    files: [
				    {
				      expand: true,
				      cwd: 'src/css/',
				      src: ['*.css'],
				      dest: 'dist/css/',
				      ext: '.min.css'
				    }
			    ]
		    }
		},

		uglify: {
		    options: {
		      mangle: true
		    },

		    dist: {
		      files: {
		        'deploy-site/web-files/js/component.min.js': ['bower_components/angular/angular.js'],
		        'deploy-site/web-files/js/app.min.js': ['source-site/web-files/angular/*.js', 'source-site/web-files/angular/**/*.js'],
		        'dist/angular-pea-slider.min.js': ['src/angular-pea-slider.js']
		      }
		    },
		},

        useref: {

                html: ['deploy-site/*.html'],

                temp: 'deploy-site'

        }

	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean'); 
	grunt.loadNpmTasks('grunt-useref');

	grunt.registerTask('deploy', ['clean', 'cssmin', 'uglify', 'copy', 'useref'])
}