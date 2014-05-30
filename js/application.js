(function() {
  var addClick, canvas, canvasDiv, clickDrag, clickX, clickY, context, paint, redraw;

  clickX = new Array();

  clickY = new Array();

  clickDrag = new Array();

  paint = void 0;

  canvasDiv = document.getElementById("canvasDiv");

  $(canvasDiv).css({
    height: $(window).height() - $('#header').innerHeight()
  });

  canvas = document.createElement("canvas");

  canvas.setAttribute("id", "canvas");

  canvas.setAttribute("width", $(canvasDiv).width());

  canvas.setAttribute("height", $(canvasDiv).height());

  canvasDiv.appendChild(canvas);

  if (typeof G_vmlCanvasManager !== "undefined") {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }

  context = canvas.getContext("2d");

  addClick = function(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  };

  redraw = function() {
    var i;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    i = 0;
    while (i < clickX.length) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
      i++;
    }
  };

  $("#canvas").mousedown(function(e) {
    var mouseX, mouseY;
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  $("#canvas").mousemove(function(e) {
    if (paint) {
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  $("#canvas").mouseup(function(e) {
    paint = false;
  });

  $("#canvas").mouseleave(function(e) {
    paint = false;
  });

}).call(this);
