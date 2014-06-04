(function() {
  var addPoint, canvas, canvasColor, canvasDiv, chooseFile, clearCanvas, clickDrag, clickX, clickY, context, fs, gui, header, paint, redraw, saveImage, sideBar, strokeColor, theme, win;

  fs = require('fs');

  gui = require('nw.gui');

  win = gui.Window.get();

  clickX = new Array();

  clickY = new Array();

  clickDrag = new Array();

  paint = void 0;

  header = $('#header');

  sideBar = $('#sideBar');

  theme = [
    {
      name: 'Tori',
      mainColor: '#8e763d',
      baseColor: '#f2d99c'
    }, {
      name: 'Mozuku',
      mainColor: '#75a77c',
      baseColor: '#a0e0a9'
    }, {
      name: 'Maguro',
      mainColor: '#7f3333',
      baseColor: '#c15555'
    }
  ];

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
    return redraw();
  };

  $('.js-save-btn').on('click', function(e) {
    return chooseFile('#saveDialog', function(path) {
      return saveImage(path);
    });
  });

  $('.js-clear-all-btn').on('click', function() {
    return clearCanvas();
  });

  strokeColor = theme[0].mainColor;

  canvasColor = theme[0].baseColor;

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
    return clickDrag.push(dragging);
  };

  redraw = function() {
    var i, _results;
    context.fillStyle = canvasColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokeStyle = strokeColor;
    context.lineJoin = 'round';
    context.lineWidth = 1;
    i = 0;
    _results = [];
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
