module.exports = function(grunt) {
  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src: ['./css/*.css', './app/**/*.js', './index.html']
        },
        options: {
          proxy: 'localhost:3000',
          watchTask: true
        }
      }
    },
    browserify: {
      './dist/app.js': ['./app/**/*.js'],
      options: {
        browserifyOptions: {
          paths: ['./node_modules']
        }
      }
    },
    jshint: {
      options: {
        predef: ['document', 'console'],
        esnext: true,
        strict: 'global',
        globals: {
          _: true,
          angular: true
        },
        browserify: true,
        reporter: require('jshint-stylish')
      },
      files: ['./app/**/*.js']
    },
    connect: {
      server: {
        options: {
          base: './',
          hostname: 'localhost',
          port: 3000,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      index: {
        files: ['./index.html']
      },
      javascripts: {
        files: ['./app/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      browserify: {
        files: ['./app/**/*.js'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'browserify', 'connect', 'browserSync', 'watch']);
};
