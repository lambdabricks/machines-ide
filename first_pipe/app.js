var s = Snap("#svgout");
var g_delta = 50;
var g_bezier_delta = g_delta * 3;

// var path = "M50,50 C50,200 300,100 300,250";
// s.path(path).addClass("line");
// s.path("M100,0 C100,150 350,50 350,200").addClass("line");

var pipe = sidePipe(s, 50, 50, 350, 200);
pipe.clone();

var r = s.rect(40, 40, 380, 0).addClass("flow");
r.attr({ mask: pipe });
r.animate({ height: 220 }, 1000);


function verticalPipe(snap, x, y, size) {
  var path = "M400,50h50v150h-50Z";

  snap.path(path).addClass("line");
}

function sidePipe(snap, x1, y1, x2, y2) {
  var x_delta = x2 - x1;
  var y_delta = y2 - y1;

  // first curve
  var path = left_bezier_path(x1, y1, x2, y2) + right_bezier_path(x1, y1, x2, y2);
  return snap.path(path).addClass("line");
}

function left_bezier_path(x1, y1, x2, y2) {
  var delta = g_delta;
  var bezier_delta = g_bezier_delta;
  var x_delta = x2 - x1;
  var y_delta = y2 - y1;

  var path = "M" + x1 + "," + y1 + "v" + delta;
  path += "c0," + bezier_delta + " " + x_delta + ",0 " + x_delta + "," + y_delta;
  path += "h" + delta;

  return path;
}

function right_bezier_path(x1, y1, x2, y2) {
  var delta = -g_delta;
  var bezier_delta = -g_bezier_delta;
  var x_delta = x1 - x2;
  var y_delta = y1 - y2;

  // var path = "M" + x1 + "," + x2;
  var path = "v" + delta;
  path += "c0," + bezier_delta + " " + x_delta + ",0 " + x_delta + "," + y_delta;
  path += "z";

  return path;
}
