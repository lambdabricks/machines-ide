var s = Snap("#svgout");
var pipe_width = 20;
var function_node_height = pipe_width * 2;

var pipe = function_node(s, 50, 50, "&&", 2, 1);

// Currently ignoring total of outputs
function function_node(snap, x, y, name, total_inputs, total_outputs) {
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

  var outline = snap.path(function_node_outline_path(x, y, total_inputs, total_outputs)).addClass("function-outline");
  group.add(outline);

  var text = snap.text(x + (pipe_width / 2), y + function_node_height + pipe_width - 10, name).addClass("function_name");
  group.add(text);
}

function function_node_outline_path(x, y, total_inputs, total_outputs) {
  var path = "M" + x + "," + (y + pipe_width);
  path += "h" + pipe_width;

  for(var i = 0; i < total_inputs; i++) {
    path += "v" + (-pipe_width) + "h" + pipe_width + "v" + pipe_width + "h" + pipe_width;
  }

  path += "v" + function_node_height + "h" + (- pipe_width * total_inputs);
  path += "v" + pipe_width + "h" + (-pipe_width) + "v" + (-pipe_width);
  path += "h" + (-pipe_width * total_inputs);
  path += "v" + (-function_node_height);

  return path;
}
