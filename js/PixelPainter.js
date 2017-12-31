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

    currentColor = `white`;
}

function createColorPalette() {
    const table = document.createElement(`table`);
    table.id = `color-table`;

    for (let i = 0, colorIndex = 0; i < 9; i ++) {
        let row = document.createElement(`tr`);
        for (let j = 0; j < 13; j ++, colorIndex ++) {
            let data = document.createElement(`td`);
            data.style.width = 12;
            data.style.height = 33.3;
            data.style.backgroundColor = colorArray[colorIndex];
            data.addEventListener(`click`, function() {
                currentColor = this.style.backgroundColor;   
            });
            row.appendChild(data);
        }

        table.appendChild(row);
    }

    colorGrid.appendChild(table);
}

