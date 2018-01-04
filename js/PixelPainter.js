var PixelPainter = function (width, height) {
  const pixelPainter = document.getElementById(`pixelPainter`);
  const ppCanvas = createDiv(pixelPainter, `pp-canvas`);
  const colorSwatch = createDiv(ppCanvas, `color-swatch`);
  const colorGrid = createDiv(colorSwatch, `color-grid`);
  const colorArray = ["#330000", "#331900", "#333300", "#193300", "#003300", "#003319", "#003333", "#001933", "#000033", "#190033", "#330033", "#330019", "#000000",
    "#660000", "#663300", "#666600", "#336600", "#006600", "#006633", "#006666", "#003366", "#000066", "#330066", "#660066", "#660033", "#202020",
    "#990000", "#994C00", "#999900", "#4C9900", "#009900", "#00994C", "#009999", "#004C99", "#000099", "#4C0099", "#990099", "#99004C", "#404040",
    "#CC0000", "#CC6600", "#CCCC00", "#66CC00", "#00CC00", "#00CC66", "#00CCCC", "#0066CC", "#0000CC", "#6600CC", "#CC00CC", "#CC0066", "#606060",
    "#FF0000", "#FF8000", "#FFFF00", "#80FF00", "#00FF00", "#00FF80", "#00FFFF", "#0080FF", "#0000FF", "#7F00FF", "#FF00FF", "#FF007F", "#808080",
    "#FF3333", "#FF9933", "#FFFF33", "#99FF33", "#33FF33", "#33FF99", "#33FFFF", "#3399FF", "#3333FF", "#9933FF", "#FF33FF", "#FF3399", "#A0A0A0",
    "#FF6666", "#FFB266", "#FFFF66", "#B2FF66", "#66FF66", "#66FFB2", "#66FFFF", "#66B2FF", "#6666FF", "#B266FF", "#FF66FF", "#FF66B2", "#C0C0C0",
    "#FF9999", "#FFCC99", "#FFFF99", "#CCFF99", "#99FF99", "#99FFCC", "#99FFFF", "#99CCFF", "#9999FF", "#CC99FF", "#FF99FF", "#FF99CC", "#E0E0E0",
    "#FFCCCC", "#FFE5CC", "#FFFFCC", "#E5FFCC", "#CCFFCC", "#CCFFE5", "#CCFFFF", "#CCE5FF", "#CCCCFF", "#E5CCFF", "#FFCCFF", "#FFCCE5", "#FFFFFF"];
  createColorPalette();
  const buttonDiv = createDiv(colorSwatch, `button-grid`);
  const drawButton = createButton(buttonDiv, `draw`, `draw`, function() {
    currentOperation = `freeDraw`;
  });
  const fillButton = createButton(buttonDiv, `fill`, `fill`, function() {
    colorCanvas(currentColor);
    resetPoints();
  });
  const squareButton = createButton(buttonDiv, `square`, `square`, function() {
    currentOperation = 'square';
    resetPoints();
  });
  const lineButton = createButton(buttonDiv, `line`, `line`, function() {
    currentOperation = 'line';
    resetPoints();
  });
  const eraseButton = createButton(buttonDiv, `erase`, `erase`, function() {
    currentColor = `white`;
    currentOperation = 'freeDraw';
    resetPoints();
  });
  const clearButton = createButton(buttonDiv, `clear`, `clear`, function() {
    colorCanvas(`white`);
    resetPoints();
  });
  const saveButton = createButton(buttonDiv, `save`, `save`, saveCanvas);
  const loadButton = createButton(buttonDiv, `load`, `load`, loadCanvas);
  let currentOperation = 'freeDraw';
  const canvas = createDiv(ppCanvas, `canvas`);
  let canvasTable;
  createCanvas();
  let currentColor = 'black';
  let mouseDown = false;
  let point1X = null;
  let point1Y = null;
  let point2X = null;
  let point2Y = null;
  let point3X = null;
  let point3Y = null;

  function createDiv(parent, id) {
    const newDiv = document.createElement(`div`);
    newDiv.id = id;
    parent.appendChild(newDiv);

    return newDiv;
  }

  function createButton(parent, id, text, func) {
    const newButton = document.createElement(`button`);
    newButton.id = id;
    newButton.innerHTML = text;
    newButton.addEventListener(`click`, func);
    parent.appendChild(newButton);
  }

  function createColorPalette() {
    const table = document.createElement(`table`);
    table.id = `color-table`;

    for (let i = 0, colorIndex = 0; i < 9; i++) {
      let row = document.createElement(`tr`);
      for (let j = 0; j < 13; j++ , colorIndex++) {
        let data = document.createElement(`td`);
        data.style.width = 12;
        data.style.height = 33;
        data.style.backgroundColor = colorArray[colorIndex];
        data.addEventListener(`click`, function (element) {
          currentColor = this.style.backgroundColor;
        });
        row.appendChild(data);
      }

      table.appendChild(row);
    }

    colorGrid.appendChild(table);
  }

  function createCanvas() {
    canvasTable = document.createElement(`table`);
    canvasTable.id = `canvas-table`;

    for (let i = 0; i < height; i++) {
      let row = document.createElement(`tr`);
      for (let j = 0; j < width; j++) {
        let data = document.createElement(`td`);
        data.dataset.row = i;
        data.dataset.column = j;
        data.style.width = Math.ceil(494 / width);
        data.style.height = Math.ceil(500 / height);
        data.addEventListener(`click`, doPixel);
        data.addEventListener(`mousedown`, function () {
          mouseDown = true;
        });
        data.addEventListener(`mousemove`, function () {
          if (mouseDown && currentOperation === 'freeDraw') {
            colorPixel(this);
          }
        });
        data.addEventListener(`mouseup`, function () {
          mouseDown = false;
        });
        row.appendChild(data);
      }
      canvasTable.appendChild(row);
    }

    canvas.appendChild(canvasTable);
    canvas.addEventListener(`mouseleave`, function () {
      mouseDown = false;
    });
  }

  function colorPixel(currentPixel) {
    currentPixel.style.backgroundColor = currentColor;
  }

  function colorCanvas(color) {
    const table = document.getElementById(`canvas-table`);
    for (let row of table.rows) {
      for (let cell of row.cells) {
        cell.style.backgroundColor = color;
      }
    }
  }

  function doPixel() {
    switch (currentOperation) {
      case 'freeDraw':
        colorPixel(this);
        break;
      case 'square':
        drawSquare(this);
        break;
      case `line`:
        drawLine(this);
        break;
    }
  }

  function drawSquare(currentPixel) {
    currentColor = currentColor === 'white' ? 'black' : currentColor;
    currentPixel.style.backgroundColor = currentColor;
    if (point1X === null) {
      point1X = parseInt(currentPixel.dataset.column);
      point1Y = parseInt(currentPixel.dataset.row);
    } else {
      point2X = parseInt(currentPixel.dataset.column);
      point2Y = parseInt(currentPixel.dataset.row);
      let xDifference = Math.abs(point1X - point2X);
      let yDifference = Math.abs(point1Y - point2Y);
      point1X = point1X > point2X ? point1X - xDifference : point2X - xDifference;
      point1Y = point1Y > point2Y ? point1Y - yDifference : point2Y - yDifference;
      point2X = point1X + xDifference;
      point2Y = point1Y + yDifference;

      for (let i = point1Y; i <= point2Y; i++) {
        for (let j = point1X; j <= point2X; j++) {
          canvasTable.rows[i].cells[j].style.backgroundColor = currentColor;
        }
      }

      resetPoints();
    }
  }

  function drawLine(currentPixel) {
    currentColor = currentColor === 'white' ? 'black' : currentColor;
    currentPixel.style.backgroundColor = currentColor;
    if (point1X === null) {
      point1X = parseInt(currentPixel.dataset.column);
      point1Y = parseInt(currentPixel.dataset.row);
    } else {
      point2X = parseInt(currentPixel.dataset.column);
      point2Y = parseInt(currentPixel.dataset.row);
      let xDifference = point2X - point1X;
      let yDifference = point2Y - point1Y;
      let num = gcd(xDifference, yDifference);

      resetPoints();
    }
  }

  function saveCanvas() {
    let res = [];
    for (let row of canvasTable.rows) {
      let rowArray = [];
      for (let cell of row.cells) {
        let cellColor = cell.style.backgroundColor !== '' ? cell.style.backgroundColor : 'white';
        rowArray.push(cellColor);
      }
      res.push(rowArray);
    }

    window.localStorage.setItem(`canvasTable`, JSON.stringify(res));
  }

  function loadCanvas() {
    let data = JSON.parse(window.localStorage.getItem(`canvasTable`));
    let i = 0;
    let j = 0;
    for (let row of canvasTable.rows) {
      for (let cell of row.cells) {
        cell.style.backgroundColor = data[i][j];
        j++;
      }
      i++;
      j = 0;
    }
  }

  function resetPoints() {
    point1X = null;
    point1Y = null;
    point2X = null;
    point2Y = null;
    point3X = null;
    point3Y = null;
  }

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) { var temp = a; a = b; b = temp; }
    while (true) {
      if (b == 0) return a;
      a %= b;
      if (a == 0) return b;
      b %= a;
    }
  }
};

PixelPainter(20, 20);