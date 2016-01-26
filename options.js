var table = document.createElement('table');
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

for (var i = 0; i <= 7; i++) {
  var row = document.createElement('tr');
  var firstCell = document.createElement('td');

  if (i == 0) {
    row.style.textAlign = 'center';
  } else {
    firstCell.innerHTML = i;
  }
  row.appendChild(firstCell);

  for (var j = 0; j < letters.length; j++) {
    var cell = document.createElement('td');
    if (i > 0) {
      var input = document.createElement('input');
      input.id = letters[j]+i;
      input.className = 'matrixInput';
      input.setAttribute('type', 'password');
      input.setAttribute('maxlength', '1');
      input.setAttribute('size', '1');
      cell.appendChild(input);
    } else {
      cell.innerHTML = letters[j];
    }
    row.appendChild(cell);
  }
  table.appendChild(row);
}

document.getElementById('matrix').appendChild(table);

function showCharacters() {
  var type = document.getElementById('showChars').checked ? 'text' : 'password';
  var inputs = document.getElementsByClassName('matrixInput');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('type', type);
  }
}

document.getElementById('showChars').addEventListener('change', showCharacters);
        
