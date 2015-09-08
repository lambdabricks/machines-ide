var s = Snap("#svgout");
var pipe_width = 20;
var function_node_height = pipe_width * 2;

var x_main_input = 220;
var y_main_input = 50;
var separation = 100;
var function_height = function_node_height + (pipe_width * 2);
var total_separation = (separation * 2) + function_height - pipe_width;

var main_input = s.rect(x_main_input, y_main_input, pipe_width, pipe_width).addClass("main input");
var main_output = s.rect(x_main_input, y_main_input + total_separation, pipe_width, pipe_width).addClass("main output");

var left_top_pipe = sidePipe(s, x_main_input, y_main_input + pipe_width, x_main_input - pipe_width, y_main_input + separation);
var right_top_pipe = sidePipe(s, x_main_input, y_main_input + pipe_width, x_main_input + pipe_width, y_main_input + separation);
var top_group = s.group(left_top_pipe, right_top_pipe);
top_group.clone();

var top_flow = s.rect(x_main_input - pipe_width, y_main_input + pipe_width, pipe_width * 3, 0).addClass("flow");
top_flow.attr({ mask: top_group});

var bottom_pipe = sidePipe(s, x_main_input, y_main_input + separation + function_height, x_main_input, y_main_input + total_separation);
bottom_pipe.clone();

var bottom_flow = s.rect(x_main_input, y_main_input + separation + function_height, pipe_width, 0).addClass("flow2");
bottom_flow.attr({ mask: bottom_pipe });

top_flow.animate({ height: separation - pipe_width }, 1000, function() {
  setTimeout(function() {
    bottom_flow.animate({ height: separation - pipe_width }, 1000);
  }, 400);
});

var multiplication = functionNode(s, x_main_input - (pipe_width * 2), y_main_input + separation, "*", 2, 1);

// Currently ignoring total of outputs
function functionNode(snap, x, y, name, total_inputs, total_outputs) {
  var inputs = [];
  var outputs = [];

  var body = snap.rect(x, y + pipe_width, pipe_width * (total_inputs * 2 + 1), function_node_height).addClass("body");
  var group = snap.g(body);

  for(var i = 0; i < total_inputs; i++) {
    var input = snap.rect(x + (pipe_width * (i * 2 + 1)), y, pipe_width, pipe_width).addClass("input");
    inputs.push(input);
    group.add(input);
  }

  var output = snap.rect(x + (pipe_width * total_inputs), y + pipe_width + function_node_height, pipe_width, pipe_width).addClass("output");
  outputs.push(output);
  group.add(output);

  var outline = snap.path(functionNodeOutlinePath(x, y, total_inputs, total_outputs)).addClass("function-outline");
  group.add(outline);

  var text = snap.text(x + (pipe_width / 2), y + function_node_height + pipe_width - 10, name).addClass("function_name");
  group.add(text);

  group.drag();
}

function functionNodeOutlinePath(x, y, total_inputs, total_outputs) {
  var path = "M" + x + "," + (y + pipe_width);
  path += "h" + pipe_width;

  for(var i = 0; i < total_inputs; i++) {
    path += "v" + (-pipe_width) + "h" + pipe_width + "v" + pipe_width + "h" + pipe_width;
  }

  path += "v" + function_node_height + "h" + (- pipe_width * total_inputs);
  path += "v" + pipe_width + "h" + (-pipe_width) + "v" + (-pipe_width);
  path += "h" + (-pipe_width * total_inputs);
  path += "Z";

  return path;
}

function sidePipe(snap, x1, y1, x2, y2) {
  var x_delta = x2 - x1;
  var y_delta = y2 - y1;

  var path = "M" + x1 + "," + y1;
  path += "h" + pipe_width;
  path += "L" + (x2 + pipe_width) + "," + y2;
  path += "h" + (-pipe_width);
  path += "Z";

  return snap.path(path).addClass("pipe");
}
