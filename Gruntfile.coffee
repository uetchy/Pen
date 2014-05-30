exclude = [
  '!**/.gitignore'
  '!**/.DS_Store'
  '!**/Thumbs.db'
  '!**/*.coffee'
  '!**/*.scss'
  '!**/css.compile/**'
  '!**/coffee/'
  '!**/scss/'
]

module.exports = (grunt) ->
  'use strict'

  # Initialize config
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    # Watching files
    watch:
      coffee:
        files: 'coffee/application.coffee',
        tasks: ['coffee:main']
      scss:
        files: 'scss/**/*.scss',
        tasks: ['compass:main']

    # Coffee compile
    coffee:
      main:
        src: 'coffee/application.coffee'
        dest: 'js/application.js'

    # SCSS compile
    compass:
      main:
        options:
          sassDir: 'scss'
          cssDir: 'css'

    nodewebkit:
      options:
        version: '0.1.0'
        force_download: true
        build_dir: './build' # Where the build version of my node-webkit app is saved
        mac_icns: false # Path to the Mac icon file
        mac: true
        win: true
        linux32: false
        linux64: false
      src: ['./css/**', './images/**', './js/**', './node_modules/**', '!./node_modules/grunt*/**', './index.html', './package.json', './README.md' ]

  # Load global tasks
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-node-webkit-builder'

  # Register tasks
  grunt.registerTask 'default', ['watch']

  grunt.registerTask 'build', [
    'coffee:main',
    'compass:main'
  ]
