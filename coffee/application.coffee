fs    = require 'fs'
gui   = require 'nw.gui'
win   = gui.Window.get()

clickX = new Array()
clickY = new Array()
clickDrag = new Array()
paint = undefined

header = $('#header')
sideBar = $('#sideBar')

theme = [
  {
    name: 'Tori'
    mainColor: '#8e763d'
    baseColor: '#f2d99c'
  },
  {
    name: 'Mozuku'
    mainColor: '#75a77c'
    baseColor: '#a0e0a9'
  },
  {
    name: 'Maguro'
    mainColor: '#7f3333'
    baseColor: '#c15555'
  }
]

# Window management
$(".global-icon-close").on 'click', ->
  win.close true

$('.global-icon-minimize').on 'click', ->
  win.minimize()

$('.global-icon-maximize').on 'click', ->
  win.maximize()

$('.js-menu-btn').on 'click', (e)->
  e.preventDefault()
  if sideBar.hasClass('open')
    sideBar.removeClass('open')
  else
    sideBar.addClass('open')

chooseFile = (name, done)->
  chooser = $(name)
  chooser.change (evt)->
    done($(this).val())

  chooser.trigger('click')

saveImage = (path)->
  img = $('#canvas')[0].toDataURL()
  data = img.replace(/^data:image\/\w+;base64,/, "")
  buf = new Buffer(data, 'base64')
  fs.writeFile path, buf

clearCanvas = ->
  clickX = new Array()
  clickY = new Array()
  clickDrag = new Array()
  redraw()

$('.js-save-btn').on 'click', (e)->
  chooseFile '#saveDialog', (path)->
    saveImage(path)

$('.js-clear-all-btn').on 'click', -> clearCanvas()

strokeColor = theme[0].mainColor
canvasColor = theme[0].baseColor

# Generate menu-items
theme.forEach (t)->
  li = document.createElement('li')
  li.setAttribute 'class', 'theme-label'
  li.setAttribute 'data-theme-name', t.name
  li.setAttribute 'style', "background-color: #{t.baseColor}; color: #{t.mainColor}"
  li.innerHTML = t.name
  $(li).appendTo('.js-theme')

# Add click event handler
$('.theme-label').on 'click', (e)->
  e.preventDefault()
  target = $(@)
  theme_name = target.data('theme-name')
  theme.forEach (t)->
    if t.name == theme_name
      strokeColor = t.mainColor
      canvasColor = t.baseColor
      $(canvasDiv).css backgroundColor: canvasColor
      redraw()

      $('.theme-label').removeClass 'active'
      target.addClass 'active'

# Initialize canvas
canvasDiv = document.getElementById('canvasDiv')
$(canvasDiv).css height: $(window).height() - header.innerHeight()

canvas = document.createElement('canvas')
canvas.setAttribute 'id', 'canvas'
canvas.setAttribute 'width', $(canvasDiv).width()
canvas.setAttribute 'height', $(canvasDiv).height()

canvasDiv.appendChild canvas
canvas = G_vmlCanvasManager.initElement(canvas) unless typeof G_vmlCanvasManager is 'undefined'
context = canvas.getContext('2d')

# Resize handler
$(window).on 'resize', (e)->
  canvasWidth = $(this).width()
  canvasHeight = $(this).height() - header.innerHeight()
  $('#canvasDiv').css width: canvasWidth, height: canvasHeight
  $('#canvas').attr 'width', canvasWidth
  $('#canvas').attr 'height', canvasHeight
  redraw()

addPoint = (x, y, dragging) ->
  clickX.push x
  clickY.push y
  clickDrag.push dragging

redraw = ->
  # Clears the canvas
  # context.clearRect 0, 0, context.canvas.width, context.canvas.height
  context.fillStyle = canvasColor
  context.fillRect 0, 0, context.canvas.width, context.canvas.height

  context.strokeStyle = strokeColor
  context.lineJoin = 'round'
  context.lineWidth = 1
  i = 0

  while i < clickX.length
    context.beginPath()
    if clickDrag[i] and i
      context.moveTo clickX[i - 1], clickY[i - 1]
    else
      context.moveTo clickX[i] - 1, clickY[i]
    context.lineTo clickX[i], clickY[i]
    context.closePath()
    context.stroke()
    i++

# Mouse events
$('#canvas').mousedown (e) ->
  mouseX = e.pageX - @offsetLeft
  mouseY = e.pageY - @offsetTop
  paint = true
  addPoint e.pageX - @offsetLeft, e.pageY - @offsetTop
  redraw()

$('#canvas').mousemove (e) ->
  if paint
    addPoint e.pageX - @offsetLeft, e.pageY - @offsetTop, true
    redraw()

$('#canvas').mouseup (e) ->
  paint = false

$('#canvas').mouseleave (e) ->
  paint = false

# Keyboard shortcut
document.addEventListener 'keyup', (e)=>
  if e.keyCode == 'N'.charCodeAt(0) && e.ctrlKey
    gui.Window.open 'index.html'
  else if e.keyCode == 'C'.charCodeAt(0)
    clearCanvas()

# Initialize methods
redraw()
