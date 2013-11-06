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
      banner: "/*!\n * <%= pkg.title %> v<%= pkg.version %> - " +
      "<%= grunt.template.today('yyyy-mm-dd') %> - <%= pkg.description %>\n" +
      " *\n" +
      " * <%= pkg.homepage %>\n" +
      " *\n" +
      " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
      " * Released under the <%= pkg.license %> license.\n */\n\n"
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
          comments: true,
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
  grunt.registerTask("dist", ["dev", "uglify:min"]);

  // Default grunt
  grunt.registerTask("default", ["dist"]);

};
