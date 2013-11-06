module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    src: [
      "src/core.js",
      "src/event.js",
      "src/traversing.js",
      "src/attributes.js",
      "src/manipulation.js"
    ],
    meta: {
      banner: "/*!\n * <%= pkg.name %> - v<%= pkg.version %> - " +
      "<%= grunt.template.today('yyyy-mm-dd') %>\n" +
      " * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author %>;\n" +
      " * Licensed <%= pkg.license %>\n */\n"
    },
    jshint: {
      src: {
        src: ["src/**/*.js"],
        options: {
          jshintrc: "src/.jshintrc"
        }
      },
      tests: {
        src: ["test/**/*.js"],
        options: {
          jshintrc: "test/.jshintrc"
        }
      }
    },
    mocha: {
      src: {
        options: {
          reporter: 'Spec',
          run: true
        },
        src: ['test/tests.html']
      }
    },
    uglify: {
      options: {
        banner: "<%= meta.banner %>"
      },
      min: {
        options: {
          report: "gzip"
        },
        files: {
          "dist/jbone.min.js": ["dist/jbone.js"]
        }
      },
      origin: {
        options: {
          mangle: false,
          beautify: true,
          compress: false,
          wrap: true
        },
        files: {
          "dist/jbone.js": "<%= src %>"
        }
      }
    },
    watch: {
      files: ["<%= jshint.tests.src %>", "<%= jshint.src.src %>"],
      tasks: "dev"
    }
  });

  // Load grunt tasks from NPM packages
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-mocha");

  // Short list as a high frequency watch task
  grunt.registerTask("test", ["mocha:src"]);
  grunt.registerTask("dev", ["uglify:origin", "jshint", "test"]);
  grunt.registerTask("dist", ["uglify:min"]);

  // Default grunt
  grunt.registerTask("default", ["dev", "dist"]);

};
