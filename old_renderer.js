var $ = require('jquery');
var fs = require('fs');

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickStrokeColor = new Array();
var clickStrokeWidth = new Array();
var paint = false;
var header = document.querySelector('#header');
var sideBar = document.querySelector('#sideBar');

var theme = [
  {
    name: 'Tori',
    mainColor: '#8e763d',
    baseColor: '#f2d99c'
  }
];

var Tools = [
  {
    id: 0,
    name: 'Pen',
    defaultStrokeWidth: 1
  }, {
    id: 1,
    name: 'Accent Pen',
    defaultStrokeWidth: 1
  }, {
    id: 2,
    name: 'Eraser',
    defaultStrokeWidth: 10
  }
];

var selectedTheme = theme[0];
var strokeColor = selectedTheme.mainColor;
var strokeWidth = 1;
var canvasColor = selectedTheme.baseColor;
var selectedTool = 'pen';

var canvasDiv = document.querySelector('#canvasDiv');

canvasDiv.style.height = $(window).height() - header.innerHeight()

var canvas = document.createElement('canvas');

canvas.setAttribute('id', 'canvas');
canvas.setAttribute('width', $(canvasDiv).width());
canvas.setAttribute('height', $(canvasDiv).height());
canvasDiv.appendChild(canvas);

if (typeof G_vmlCanvasManager !== 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

var context = canvas.getContext('2d');

var chooseFile = function(name, done) {
  var chooser = $(name);
  chooser.change(function(evt) {
    return done($(this).val());
  });
  chooser.trigger('click');
};

var saveImage = function(path) {
  var img = $('#canvas')[0].toDataURL();
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  fs.writeFile(path, buf);
};

var clearCanvas = function() {
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickStrokeColor = new Array();
  clickStrokeWidth = new Array();
  redraw();
};

document.querySelector(".global-icon-close").addEventListener('click', function() {
  win.close(true);
}, false);

document.querySelector('.global-icon-minimize').addEventListener('click', function() {
  win.minimize();
}, false);

document.querySelector('.global-icon-maximize').addEventListener('click', function() {
  win.maximize();
}, false);

document.querySelector('.js-menu-btn').on('click', function(e) {
  e.preventDefault();
  if (sideBar.hasClass('open')) {
    sideBar.removeClass('open');
  } else {
    sideBar.addClass('open');
  }
}, false);

document.querySelector('.js-save-btn').addEventListener('click', function(e) {
  return chooseFile('#saveDialog', function(path) {
    saveImage(path);
  });
}, false);

document.querySelector('.js-clear-all-btn').addEventListener('click', function() {
  clearCanvas();
}, false);

document.querySelector('.js-paint-tool-btn').addEventListener('click', function() {
  var icon = $(this).find('.icon');
  if (selectedTool === 'pen') {
    icon.removeClass('fa-eraser');
    icon.addClass('fa-pencil');
    selectedTool = 'eraser';
    strokeColor = selectedTheme.baseColor;
    strokeWidth = 10;
  } else {
    icon.removeClass('fa-pencil');
    icon.addClass('fa-eraser');
    selectedTool = 'pen';
    strokeColor = selectedTheme.mainColor;
    strokeWidth = 1;
  }
}, false);

theme.forEach(function(t) {
  var li = document.createElement('li');
  li.setAttribute('class', 'theme-label');
  li.setAttribute('data-theme-name', t.name);
  li.setAttribute('style', "background-color: " + t.baseColor + "; color: " + t.mainColor);
  li.innerHTML = t.name;
  $(li).appendTo('.js-theme');
});

document.querySelector('.theme-label').addEventListener('click', function(e) {
  e.preventDefault();
  var target = $(this);
  var theme_name = target.data('theme-name');
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
      target.addClass('active');
    }
  });
}, false);

window.addEventListener('resize', function(e) {
  var canvasWidth = $(this).width();
  var canvasHeight = $(this).height() - header.innerHeight();
  $('#canvasDiv').css({
    width: canvasWidth,
    height: canvasHeight
  });
  $('#canvas').attr('width', canvasWidth);
  $('#canvas').attr('height', canvasHeight);
  redraw();
}, false);

var addPoint = function(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickStrokeColor.push(strokeColor);
  clickStrokeWidth.push(strokeWidth);
};

var redraw = function() {
  context.fillStyle = canvasColor;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.lineJoin = 'round';
  var i = 0;
  var results = [];
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
    results.push(i++);
  }
  return results;
};

document.querySelector('#canvas').addEventListener('mousedown', function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
}, false);

document.querySelector('#canvas').addEventListener('mousemove', function(e) {
  if (paint) {
    addPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
}, false);

document.querySelector('#canvas').addEventListener('mouseup', function(e) {
  paint = false;
}, false);

document.querySelector('#canvas').addEventListener('mouseleave', function(e) {
  paint = false;
}, false);

document.addEventListener('keyup', function(_this) {
  function(e) {
    if (e.keyCode === 'N'.charCodeAt(0) && e.ctrlKey) {
      return gui.Window.open('index.html');
    } else if (e.keyCode === 'C'.charCodeAt(0)) {
      return clearCanvas();
    }
  };
}, false);

redraw();
