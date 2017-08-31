# Angularjs Template With Grunt, Browserify, and BrowserSync

## Scope

The template is for developers that want to browserify the javascript code into one file to avoid a long list of scripts inside the `index.html`. This approach helps because the developer don't need to pay attention to the order the scripts are getting called inside the `index.html`.

## List of dependencies

```
  "devDependencies": {
    "@types/angular": "^1.6.32",
    "@types/angular-route": "^1.3.4",
    "@types/grunt": "^0.4.22",
    "@types/lodash": "^4.14.74",
    "grunt": "^1.0.1",
    "grunt-browser-sync": "^2.2.0",
    "grunt-browserify": "^5.2.0",
    "grunt-contrib-connect": "^1.0.2",
    "grunt-contrib-jshint": "^1.1.0",
    "grunt-contrib-watch": "^1.0.0",
    "jshint": "^2.9.5",
    "jshint-stylish": "^2.2.1",
    "lodash": "^4.17.4",
    "matchdep": "^2.0.0"
  }
  ```

As for this writing Angularjs is in version 1.6.5 and Nodejs is in version 8.1.4 and that is what I'm utilizing. I'm also utilizing vscode as my text editor. As you can notice inside the `package.json` I have some dependencies to trigger intellisense in vscode. Those dependencies listed looks like `@types/angular` and so on. If you don't need those feel free to delete them before you `npm install`. The `package.json` is kept to the minimum so people can add dependencies as needed.

## Gruntfile.js

```
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
```

Every time you `grunt -force` grunt will combined all you `js` files into one `app.js` and put it inside the `dist` folder. Notice that in the `index.html` is a `script` tag linking to that file. Also, your browser will open a tab for the app and it will refresh every time any changes occurs in your files.

## File structure

As far as the file structure, based on the size of your application you can decided if the current file structure works for you or you need to change it to something that makes sense to you, like the following...

```
app
|_user
|  |_user.controller.js
|  |_user.service.js
|  |_user.template.html
|_navbar
  |_navbar.controller.js
  |_navbar.service.js
  ...
```

Hope this is helpful for every one.