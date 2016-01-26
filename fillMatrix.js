var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
// There should only be one form with name 'login' in the document.
var form = document.querySelector('form[name="login"]');
// Finds the three input fields
var inputs = form.querySelectorAll('input[type="password"][name^="message"]');
var ids = [];

// Parse the text next to the fields to find the correct indices in the stored
// matrix.
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

// Get the stored matrix and fill the input fields.
chrome.storage.sync.get({
    matrix: null,
    autoLogin: false
}, function(items) {
  if (items.matrix !== null) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = items.matrix[ids[i].row][ids[i].column];
    }
  } 
  if (items.autoLogin) {
    form.submit();
  }
});

