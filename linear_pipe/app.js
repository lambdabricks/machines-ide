var s = Snap("#svgout");
var width = 50;

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
  var path = "M" + x1 + "," + y1;
  path += "h" + width;
  path += "L" + x2 + "," + (y2 + width);
  path += "h" + (-width);
  path += "Z";
  return snap.path(path).addClass("line");
}
