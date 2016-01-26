// There should only be one form with name 'login' in the document.
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var form = document.querySelector('form[name="login"]');
var inputs = form.querySelectorAll('input[type="password"][name^="message"]');
var ids = [];

for (var i = 0; i < inputs.length; i++) {
  var id = inputs[i].parentNode.previousElementSibling.previousElementSibling;
  id = id.textContent;
  // Find a part of the text matching the [A,X] pattern used on the login page.
  id = id.match(/\[[A-J],[1-7]\]/)[0];
  var column = letters.indexOf(id.charAt(1));
  var row = Number(id.charAt(3))-1;
  ids[i] = {
    row: row,
    column: column
  }
}

chrome.storage.sync.get({
    matrix: null
}, function(items) {
  if (items.matrix !== null) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = items.matrix[ids[i].row][ids[i].column];
    }
  } 
});

