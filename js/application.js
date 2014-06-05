(function() {
  var Tools, addPoint, canvas, canvasColor, canvasDiv, chooseFile, clearCanvas, clickDrag, clickStrokeColor, clickStrokeWidth, clickX, clickY, context, fs, gui, header, paint, redraw, saveImage, selectedTheme, selectedTool, sideBar, strokeColor, strokeWidth, theme, win;

  fs = require('fs');

  gui = require('nw.gui');

  win = gui.Window.get();

  clickX = new Array();

  clickY = new Array();

  clickDrag = new Array();

  clickStrokeColor = new Array();

  clickStrokeWidth = new Array();

  paint = void 0;

  header = $('#header');

  sideBar = $('#sideBar');

  theme = [
    {
      name: 'Tori',
      mainColor: '#8e763d',
      baseColor: '#f2d99c'
    }
  ];

  Tools = [
    {
      name: 'Pen',
      defaultStrokeWidth: 1
    }, {
      name: 'Eraser',
      defaultStrokeWidth: 10
    }
  ];

  selectedTheme = theme[0];

  strokeColor = selectedTheme.mainColor;

  strokeWidth = 1;

  canvasColor = selectedTheme.baseColor;

  selectedTool = 'pen';

  canvasDiv = document.getElementById('canvasDiv');

  $(canvasDiv).css({
    height: $(window).height() - header.innerHeight()
  });

  canvas = document.createElement('canvas');

  canvas.setAttribute('id', 'canvas');

  canvas.setAttribute('width', $(canvasDiv).width());

  canvas.setAttribute('height', $(canvasDiv).height());

  canvasDiv.appendChild(canvas);

  if (typeof G_vmlCanvasManager !== 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }

  context = canvas.getContext('2d');

  chooseFile = function(name, done) {
    var chooser;
    chooser = $(name);
    chooser.change(function(evt) {
      return done($(this).val());
    });
    return chooser.trigger('click');
  };

  saveImage = function(path) {
    var buf, data, img;
    img = $('#canvas')[0].toDataURL();
    data = img.replace(/^data:image\/\w+;base64,/, "");
    buf = new Buffer(data, 'base64');
    return fs.writeFile(path, buf);
  };

  clearCanvas = function() {
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    clickStrokeColor = new Array();
    clickStrokeWidth = new Array();
    return redraw();
  };

  $(".global-icon-close").on('click', function() {
    return win.close(true);
  });

  $('.global-icon-minimize').on('click', function() {
    return win.minimize();
  });

  $('.global-icon-maximize').on('click', function() {
    return win.maximize();
  });

  $('.js-menu-btn').on('click', function(e) {
    e.preventDefault();
    if (sideBar.hasClass('open')) {
      return sideBar.removeClass('open');
    } else {
      return sideBar.addClass('open');
    }
  });

  $('.js-save-btn').on('click', function(e) {
    return chooseFile('#saveDialog', function(path) {
      return saveImage(path);
    });
  });

  $('.js-clear-all-btn').on('click', function() {
    return clearCanvas();
  });

  $('.js-paint-tool-btn').on('click', function() {
    var icon;
    icon = $(this).find('.icon');
    if (selectedTool === 'pen') {
      icon.removeClass('fa-eraser');
      icon.addClass('fa-pencil');
      selectedTool = 'eraser';
      strokeColor = selectedTheme.baseColor;
      return strokeWidth = 10;
    } else {
      icon.removeClass('fa-pencil');
      icon.addClass('fa-eraser');
      selectedTool = 'pen';
      strokeColor = selectedTheme.mainColor;
      return strokeWidth = 1;
    }
  });

  theme.forEach(function(t) {
    var li;
    li = document.createElement('li');
    li.setAttribute('class', 'theme-label');
    li.setAttribute('data-theme-name', t.name);
    li.setAttribute('style', "background-color: " + t.baseColor + "; color: " + t.mainColor);
    li.innerHTML = t.name;
    return $(li).appendTo('.js-theme');
  });

  $('.theme-label').on('click', function(e) {
    var target, theme_name;
    e.preventDefault();
    target = $(this);
    theme_name = target.data('theme-name');
    return theme.forEach(function(t) {
      if (t.name === theme_name) {
        selectedTheme = t;
        strokeColor = selectedTheme.mainColor;
        canvasColor = selectedTheme.baseColor;
        $(canvasDiv).css({
          backgroundColor: canvasColor
        });
        redraw();
        $('.theme-label').removeClass('active');
        return target.addClass('active');
      }
    });
  });

  $(window).on('resize', function(e) {
    var canvasHeight, canvasWidth;
    canvasWidth = $(this).width();
    canvasHeight = $(this).height() - header.innerHeight();
    $('#canvasDiv').css({
      width: canvasWidth,
      height: canvasHeight
    });
    $('#canvas').attr('width', canvasWidth);
    $('#canvas').attr('height', canvasHeight);
    return redraw();
  });

  addPoint = function(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickStrokeColor.push(strokeColor);
    return clickStrokeWidth.push(strokeWidth);
  };

  redraw = function() {
    var i, _results;
    context.fillStyle = canvasColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.lineJoin = 'round';
    i = 0;
    _results = [];
    while (i < clickX.length) {
      context.strokeStyle = clickStrokeColor[i];
      context.lineWidth = clickStrokeWidth[i];
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
      _results.push(i++);
    }
    return _results;
  };

  $('#canvas').mousedown(function(e) {
    var mouseX, mouseY;
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    paint = true;
    addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    return redraw();
  });

  $('#canvas').mousemove(function(e) {
    if (paint) {
      addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      return redraw();
    }
  });

  $('#canvas').mouseup(function(e) {
    return paint = false;
  });

  $('#canvas').mouseleave(function(e) {
    return paint = false;
  });

  document.addEventListener('keyup', (function(_this) {
    return function(e) {
      if (e.keyCode === 'N'.charCodeAt(0) && e.ctrlKey) {
        return gui.Window.open('index.html');
      } else if (e.keyCode === 'C'.charCodeAt(0)) {
        return clearCanvas();
      }
    };
  })(this));

  redraw();

}).call(this);
