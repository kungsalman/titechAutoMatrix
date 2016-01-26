var table = document.createElement('table');
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function buildInputTable() {
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
}


function showCharacters() {
  var type = document.getElementById('showChars').checked ? 'text' : 'password';
  var inputs = document.getElementsByClassName('matrixInput');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('type', type);
  }
}

document.getElementById('showChars').addEventListener('change', showCharacters);

function saveOptions() {
  var data = [];
  for (var i = 0; i < 7; i++) {
    var row = [];
    for (var j = 0; j < letters.length; j++) {
      row[j] = document.getElementById(letters[j]+(i+1)).value;
    }
    data[i] = row;
  }
  chrome.storage.sync.set({
    matrix: data
  }, function() {
    var msg = document.getElementById('status');
    msg.textContent = 'Saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

document.getElementById('save').addEventListener('click', saveOptions);

var defaultMatrix = generateDefaultMatrix();

function generateDefaultMatrix() {
  var matrix = [];
  for (var i = 0; i < 7; i++) {
    var row = [];
    for (var j = 0; j < letters.length; j++) {
      row[j] = '';
    }
    matrix[i] = row;
  }
  return matrix;
}

function restoreOptions() {
  chrome.storage.sync.get({
    matrix: defaultMatrix
  }, function(items) {
    for (var i = 0; i < items.matrix.length; i++) {
      for (var j = 0; j < items.matrix[i].length; j++) {
        document.getElementById(letters[j]+(i+1)).value = items.matrix[i][j];
      }
    }
  });
}

function setUp() {
  buildInputTable();
  restoreOptions();
}

document.addEventListener('DOMContentLoaded', setUp);

