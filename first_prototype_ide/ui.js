var function_signatures = {
  "&&": { name: "&&", inputs: 2, outputs: 1 },
  "||": { name: "||", inputs: 2, outputs: 1 },
  "!":  { name: "!",  inputs: 1, outputs: 1 }
};

$('#createFunctionButton').click(function() {
  $('#createFunctionModal').modal('hide');
  new FunctionNode(100, 50, + $('#total_inputs').val(), + $('#total_outputs').val()).draw();
});

$('.panel-group').on('click', '.add-function', function() {
  var function_name = $(this).data('name');
  var function_signature = function_signatures[function_name];

  new FunctionNode(50, 50, function_signature.inputs, function_signature.outputs, function_signature.name).draw();
});

$('#svgout').on('click', '*', function(event){
  var elements_with_actions = ['body', 'main-body', 'pipe', 'primitive-string'];
  var targetClass = $(event.target).attr('class');
  event.stopPropagation();

  if(elements_with_actions.indexOf(targetClass) > -1) {
    $('.actions').hide();
    $('#' + targetClass + '-actions').show();
  }
});

$(function(){
  $('.actions').hide();
});
