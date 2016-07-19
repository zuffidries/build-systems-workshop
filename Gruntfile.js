module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
=======
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch :{
      all :{
        files: ['Gruntfile.js','src//*.js'],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      build: ['Gruntfile.js', 'src//*.js']
    }
  });

  // A very basic default task.
  grunt.registerTask('uslessTask', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['watch','jshint']);
  grunt.registerTask('watchTask', 'Log some stuff.', function() {
    grunt.log.write('you made a change in a .js file! I will now lint....').ok();
  });

};
