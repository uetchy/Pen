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
      slim:
        files: 'index.slim',
        tasks: ['slim:dist']

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

    slim:
      dist:
        files:
          'index.html': 'index.slim'

    nodewebkit:
      options:
        build_dir: './build'
        mac_icns: './images/icon.icns'
        mac: true
        win: true
        linux32: false
        linux64: false
      src: [
        './css/**',
        './images/**',
        './js/**',
        './index.html',
        './node_modules/**',
        '!./node_modules/grunt*/**',
        './package.json',
        './README.md'
      ]

  # Load global tasks
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-slim'
  grunt.loadNpmTasks 'grunt-node-webkit-builder'

  # Register tasks
  grunt.registerTask 'default', ['watch']

  grunt.registerTask 'build', [
    'coffee:main',
    'compass:main',
    'slim:dist'
  ]
