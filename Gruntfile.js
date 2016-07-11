module.exports = function(grunt) {

  grunt.initConfig({

  	pkg: grunt.file.readJSON('package.json'),
  	concat:{
      options: {
        separator: ';'
      },
  		dist: {
  			src: ['js/src/*.js'],
  			dest: 'js/dist/<%= pkg.name %>.js'
  		}
  	},
  	uglify: {
  		options: {
  			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  		},
  		dist: {
  			files: {
  				'js/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
  			}
  		}
  	},
    jshint: {
      files: ['Gruntfile.js', 'js/src/scripts.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          trace: true
        },
        files: [{
          src: 'css/sass/screen.scss',
          dest: 'css/dist/<%= pkg.name %>.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: ['last 4 versions']})
        ]
      },
      dist: {
        src: 'css/dist/<%= pkg.name %>.css'
      }
    },
    watch: {
      options:{
            livereload: true,
        },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat', 'uglify']
      },
      sass: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', [ 'concat', 'uglify', 'sass', 'postcss', 'watch'  ]);

};
