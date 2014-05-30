# var fs = require('fs');
# var gui = require('nw.gui');

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

clickX = new Array()
clickY = new Array()
clickDrag = new Array()
paint = undefined

canvasDiv = document.getElementById("canvasDiv")
$(canvasDiv).css height: $(window).height() - $('#header').innerHeight()
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
  context.strokeStyle = "#df4b26"
  context.lineJoin = "round"
  context.lineWidth = 5
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
