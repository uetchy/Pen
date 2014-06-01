(function() {
  var addClick, canvas, canvasColor, canvasDiv, clickDrag, clickX, clickY, context, gui, paint, redraw, strokeColor, theme, win;

  gui = require('nw.gui');

  win = gui.Window.get();

  $(".global-icon-close").on("click", function() {
    return win.close(true);
  });

  $(".global-icon-minimize").on("click", function() {
    return win.minimize();
  });

  $(".global-icon-maximize").on("click", function() {
    return win.maximize();
  });

  clickX = new Array();

  clickY = new Array();

  clickDrag = new Array();

  paint = void 0;

  theme = [
    {
      name: "Tori",
      mainColor: "#8e763d",
      baseColor: "#f2d99c"
    }, {
      name: "Mozuku",
      mainColor: "#75a77c",
      baseColor: "#a0e0a9"
    }, {
      name: "Maguro",
      mainColor: "#7f3333",
      baseColor: "#c15555"
    }
  ];

  strokeColor = theme[0].mainColor;

  canvasColor = theme[0].baseColor;

  theme.forEach(function(t) {
    var li;
    li = document.createElement('li');
    li.setAttribute('class', 'theme-label');
    li.setAttribute('data-theme-name', t.name);
    li.setAttribute('style', "background-color: " + t.baseColor + "; color: " + t.mainColor);
    li.innerHTML = t.name;
    return $(li).appendTo(".js-theme");
  });

  $('.theme-label').on('click', function(e) {
    var target, theme_name;
    e.preventDefault();
    target = $(this);
    theme_name = target.data('theme-name');
    return theme.forEach(function(t) {
      if (t.name === theme_name) {
        strokeColor = t.mainColor;
        canvasColor = t.baseColor;
        $(canvasDiv).css({
          backgroundColor: canvasColor
        });
        redraw();
        $('.theme-label').removeClass('active');
        return target.addClass('active');
      }
    });
  });

  canvasDiv = document.getElementById("canvasDiv");

  $(canvasDiv).css({
    height: $(window).height() - $('#header').innerHeight(),
    backgroundColor: canvasColor
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
    context.strokeStyle = strokeColor;
    context.lineJoin = "round";
    context.lineWidth = 1;
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
