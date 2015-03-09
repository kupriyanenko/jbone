module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    src: [
      "build/topper.js",
      "src/core.js",
      "src/utilities.js",
      "src/event.js",
      "src/traversing.js",
      "src/attributes.js",
      "src/manipulation.js",
      "build/footer.js"
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
      dist: {
        src: ["dist/jbone.js"],
        options: {
          jshintrc: "dist/.jshintrc"
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
    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      dist: {
        src: "<%= src %>",
        dest: 'dist/jbone.js'
      }
    },
    uglify: {
      options: {
        banner: "<%= meta.banner %>"
      },
      min: {
        files: {
          "dist/jbone.min.js": ["dist/jbone.js"]
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
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-mocha");

  // Short list as a high frequency watch task
  grunt.registerTask("dist", ["dev", "uglify:min"]);
  grunt.registerTask("test", ["concat:dist", "jshint", "mocha:src"]);
  grunt.registerTask("dev", ["test"]);

  // Default grunt
  grunt.registerTask("default", ["dist"]);

};
