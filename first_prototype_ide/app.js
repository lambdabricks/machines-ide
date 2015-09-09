var main_input = new Point(220, 50);
var main_output = new Point(220, 310);

var multiplication = new FunctionNode(180, 150, 2, 1, "*");
var input_points = multiplication.inputPoints();
var output_points = multiplication.outputPoints();

for(var i = 0; i < input_points.length; i++) {
  var pipe = new PipeNode(main_input, input_points[i]);
}

for(var i = 0; i < input_points.length; i++) {
  var pipe = new PipeNode(output_points[i], main_output);
}
