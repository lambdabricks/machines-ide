$('#createFunctionButton').click(function() {
  $('#createFunctionModal').modal('hide');
  new FunctionNode(100, 50, + $('#total_inputs').val(), + $('#total_outputs').val()).draw();
});
