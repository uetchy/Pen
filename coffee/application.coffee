# var fs = require('fs');
gui = require 'nw.gui'
win = gui.Window.get()

# function clickInput(id) {
#   var event = document.createEvent('MouseEvents');
#   event.initMouseEvent('click');
#   document.getElementById(id).dispatchEvent(event);
# }

# document.addEventListener('keyup', function (e) {
#   if (e.keyCode == 'N'.charCodeAt(0) && e.ctrlKey) {
#     gui.Window.open('index.html');
#   }
# });

# Window management
$(".global-icon-close").on "click", ->
  win.close true

$(".global-icon-minimize").on "click", ->
  win.minimize()

$(".global-icon-maximize").on "click", ->
  win.maximize()

clickX = new Array()
clickY = new Array()
clickDrag = new Array()
paint = undefined

theme = [
  {
    name: "Tori"
    mainColor: "#8e763d"
    baseColor: "#f2d99c"
  },
  {
    name: "Mozuku"
    mainColor: "#75a77c"
    baseColor: "#a0e0a9"
  },
  {
    name: "Maguro"
    mainColor: "#7f3333"
    baseColor: "#c15555"
  }
]

strokeColor = theme[0].mainColor
canvasColor = theme[0].baseColor

theme.forEach (t)->
  li = document.createElement 'li'
  li.setAttribute 'class', 'theme-label'
  li.setAttribute 'data-theme-name', t.name
  li.setAttribute 'style', "background-color: #{t.baseColor}; color: #{t.mainColor}"
  li.innerHTML = t.name
  $(li).appendTo ".js-theme"

$('.theme-label').on 'click', (e)->
  e.preventDefault()
  target = $(this)
  theme_name = target.data('theme-name')
  theme.forEach (t)->
    if t.name == theme_name
      strokeColor = t.mainColor
      canvasColor = t.baseColor
      $(canvasDiv).css backgroundColor: canvasColor
      redraw()

      $('.theme-label').removeClass 'active'
      target.addClass 'active'

canvasDiv = document.getElementById("canvasDiv")
$(canvasDiv).css height: $(window).height() - $('#header').innerHeight(), backgroundColor: canvasColor
canvas = document.createElement("canvas")
canvas.setAttribute "id", "canvas"
canvas.setAttribute "width", $(canvasDiv).width()
canvas.setAttribute "height", $(canvasDiv).height()
canvasDiv.appendChild canvas
canvas = G_vmlCanvasManager.initElement(canvas)  unless typeof G_vmlCanvasManager is "undefined"
context = canvas.getContext("2d")

addClick = (x, y, dragging) ->
  clickX.push x
  clickY.push y
  clickDrag.push dragging
  return

redraw = ->
  context.clearRect 0, 0, context.canvas.width, context.canvas.height # Clears the canvas
  context.strokeStyle = strokeColor
  context.lineJoin = "round"
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
  return

$("#canvas").mousedown (e) ->
  mouseX = e.pageX - @offsetLeft
  mouseY = e.pageY - @offsetTop
  paint = true
  addClick e.pageX - @offsetLeft, e.pageY - @offsetTop
  redraw()
  return

$("#canvas").mousemove (e) ->
  if paint
    addClick e.pageX - @offsetLeft, e.pageY - @offsetTop, true
    redraw()
  return

$("#canvas").mouseup (e) ->
  paint = false
  return

$("#canvas").mouseleave (e) ->
  paint = false
  return
