var pipe_width = 20;
var function_node_height = pipe_width * 2;
var anonymous_function_node_height = pipe_width * 20;

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

var FunctionNode = function(x, y, total_inputs, total_outputs, name) {
    this.pipe_width           = pipe_width;
    this.function_node_height = name == undefined ? anonymous_function_node_height : function_node_height;
    this.origin               = new Point(x, y);
    this.name                 = name;
    this.total_inputs         = total_inputs;
    this.total_outputs        = total_outputs;
};

FunctionNode.prototype.draw = function() {
  var snap = Snap("#svgout");
  var inputs = [];
  var outputs = [];

  var body = snap.rect(this.origin.x, this.origin.y + this.pipe_width, this.pipe_width * (this.total_inputs * 2 + 1), this.function_node_height).addClass("body");
  var group = snap.g(body);

  for(var i = 0; i < this.total_inputs; i++) {
    var input = snap.rect(this.origin.x + (this.pipe_width * (i * 2 + 1)), this.origin.y, this.pipe_width, this.pipe_width).addClass("input");
    inputs.push(input);
    group.add(input);
  }

  var output = snap.rect(this.origin.x + (this.pipe_width * this.total_inputs), this.origin.y + this.pipe_width + this.function_node_height, this.pipe_width, this.pipe_width).addClass("output");
  outputs.push(output);
  group.add(output);

  var outline = snap.path(this.functionNodeOutlinePath(this.origin.x, this.origin.y, this.total_inputs, this.total_outputs)).addClass("function-outline");
  group.add(outline);

  if(name) {
    var text = snap.text(this.origin.x + (this.pipe_width / 2), this.origin.y + this.function_node_height + this.pipe_width - 10, this.name).addClass("function_name");
    group.add(text);
  }

  group.drag();
};

FunctionNode.prototype.functionNodeOutlinePath = function() {
  var path = "M" + this.origin.x + "," + (this.origin.y + this.pipe_width);
  path += "h" + this.pipe_width;

  for(var i = 0; i < this.total_inputs; i++) {
    path += "v" + (-this.pipe_width) + "h" + this.pipe_width + "v" + this.pipe_width + "h" + this.pipe_width;
  }

  path += "v" + this.function_node_height + "h" + (- this.pipe_width * this.total_inputs);
  path += "v" + this.pipe_width + "h" + (-this.pipe_width) + "v" + (-this.pipe_width);
  path += "h" + (-this.pipe_width * this.total_inputs);
  path += "Z";

  return path;
};

FunctionNode.prototype.inputPoints = function() {
  var input_points = [];

  for(var i = 0; i < this.total_inputs; i++) {
    var point = new Point(this.origin.x + (this.pipe_width * (i * 2 + 1)), this.origin.y);
    input_points.push(point);
  }

  return input_points;
};

FunctionNode.prototype.outputPoints = function() {
  var output_points = [];

  output_points.push(new Point(
    this.origin.x + (this.pipe_width * this.total_inputs),
    this.origin.y + this.pipe_width + this.function_node_height));

  return output_points;
}

var PipeNode = function(input_point, output_point) {
  this.input_point  = input_point;
  this.output_point = output_point;
};
