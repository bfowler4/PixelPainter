const pixelPainter = document.getElementById(`pixelPainter`);
const ppCanvas = createDiv(pixelPainter, `pp-canvas`);
const colorSwatch = createDiv(ppCanvas, `color-swatch`);
const colorGrid = createDiv(colorSwatch, `color-grid`);
const eraseButton = createButton(colorSwatch, `erase`, `erase`, function() {
    currentColor = `white`;
});
const clearButton = createButton(colorSwatch, `clear`, `clear`, clearCanvas);
const canvas = createDiv(ppCanvas, `canvas`);
let currentColor = `red`;
createCanvas(40, 40);


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

function createCanvas(width, height) {
    const table = document.createElement(`table`);
    table.id = `canvas-table`;

    for (let i = 0; i < Math.ceil(canvas.offsetHeight / height); i ++) {
        let row = document.createElement(`tr`);
        for (let j = 0; j < Math.ceil(canvas.offsetWidth / width); j ++) {
            let data = document.createElement(`td`);
            data.style.width = width;
            data.style.height = height;
            data.addEventListener(`click`, colorPixel);
            row.appendChild(data);
        }
        table.appendChild(row);
    }
    
    canvas.appendChild(table);
}

function colorPixel() {
    this.style.backgroundColor = currentColor;
}

function clearCanvas() {
    const table = document.getElementById(`canvas-table`);
    for (row of table.rows) {
        for (cell of row.cells) {
            cell.style.backgroundColor = `white`;
        }
    }
}


