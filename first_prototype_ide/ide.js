var pipe_width = 20;
var function_node_height = pipe_width * 2;
var anonymous_function_node_height = pipe_width * 20;

var selected_input, selected_output;

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

var FunctionNode = function(x, y, total_inputs, total_outputs, name) {
    this.name                 = name;
    this.pipe_width           = pipe_width;
    this.origin               = new Point(x, y);
    this.total_inputs         = total_inputs;
    this.total_outputs        = total_outputs;
    this.function_node_height = this.node_height();
    this.function_node_width  = this.node_width();
};

FunctionNode.prototype.anonymous = function() {
  return this.name == undefined;
};

FunctionNode.prototype.node_height = function() {
  return this.anonymous() ? anonymous_function_node_height : function_node_height;
};

FunctionNode.prototype.node_width = function() {
  if(this.anonymous()) {
    return this.pipe_width * 13;
  } else {
    return this.pipe_width * (this.total_inputs * 2 + 1);
  }
};

FunctionNode.prototype.outputPoint = function() {
  return this.origin.x + ((this.function_node_width - this.pipe_width) / 2);
};

FunctionNode.prototype.inputPoint = function(index) {
  var multiplier = 2;
  var offset     = 1;

  if(this.anonymous()) {
    multiplier = 4;
    offset     = 0;
    index++;
  }

  return this.origin.x + (this.pipe_width * ((index * multiplier) + offset));
};

FunctionNode.prototype.nodeBodyClass = function() {
  return this.anonymous() ? "main-body" : "body";
}

FunctionNode.prototype.nodeInputClass = function() {
  return this.anonymous() ? "main input" : "input";
}

FunctionNode.prototype.nodeOutputClass = function() {
  return this.anonymous() ? "main output" : "output";
}

FunctionNode.prototype.draw = function() {
  var snap = Snap("#svgout");
  var inputs = [];
  var outputs = [];

  var body = snap.rect(this.origin.x, this.origin.y + this.pipe_width, this.function_node_width, this.function_node_height).addClass(this.nodeBodyClass());
  var group = snap.g(body);

  for(var i = 0; i < this.total_inputs; i++) {
    var input = snap.rect(this.inputPoint(i), this.origin.y, this.pipe_width, this.pipe_width).addClass(this.nodeInputClass());
    input.click(this.anonymous() ? inputClickEvent : outputClickEvent);

    inputs.push(input);
    group.add(input);
  }

  var output = snap.rect(this.outputPoint(), this.origin.y + this.pipe_width + this.function_node_height, this.pipe_width, this.pipe_width).addClass(this.nodeOutputClass());
  output.click(this.anonymous() ? outputClickEvent : inputClickEvent);

  outputs.push(output);
  group.add(output);

  if(! this.anonymous()) {
    var outline = snap.path(this.functionNodeOutlinePath()).addClass("function-outline");
    group.add(outline);
  }

  if(! this.anonymous()) {
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
};

var PipeNode = function(input_element, output_element) {
  this.input_element  = input_element;
  this.output_element = output_element;
};

PipeNode.prototype.draw = function() {
  var snap = Snap("#svgout");
  var input_bbox  = this.input_element.getBBox();
  var output_bbox = this.output_element.getBBox();

  var path = "M" + absolutePosition(this.input_element).x + "," + (absolutePosition(this.input_element).y + input_bbox.height + 1);
  path += "h" + input_bbox.width;
  path += "L" + (absolutePosition(this.output_element).x + output_bbox.width) + "," + (absolutePosition(this.output_element).y - 1);
  path += "h" + (-output_bbox.width);
  path += "Z";

  return snap.path(path).addClass("pipe");
};

function absolutePosition(element) {
  // clientRect = element.node.getBoundingClientRect();
  globalMatrix = element.transform().globalMatrix;
  bbox = element.getBBox();

  return new Point(globalMatrix.x(bbox.x, bbox.y), globalMatrix.y(bbox.x, bbox.y));
  // return new Point(clientRect.left, clientRect.top);
}

function inputClickEvent() {
  if(selected_input && selected_input != this) {
    selected_input.removeClass('selected');
  }

  if(selected_output) {
    new PipeNode(this, selected_output).draw();
    selected_output.removeClass('selected');
    selected_output = undefined;
    selected_input = undefined;
  } else {
    this.toggleClass('selected');
    selected_input = this.hasClass('selected') ? this : undefined;
  }
}

function outputClickEvent() {
  if(selected_output && selected_output != this) {
    selected_output.removeClass('selected');
  }

  if(selected_input) {
    new PipeNode(selected_input, this).draw();
    selected_input.removeClass('selected');
    selected_input = undefined;
    selected_output = undefined;
  } else {
    this.toggleClass('selected');
    selected_output = this.hasClass('selected') ? this : undefined;
  }
}
