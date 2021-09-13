
//inital setup values
const initalGridSize = 16;
let mode = 'classic'; //assume classic as default and update before creating grid

//setup element nodes
const gridContainerNode = document.querySelector('.gridContainer');
const clearButtons = document.querySelectorAll('.clearGrid');
const squaresInput = document.querySelector('#squares');
const classicSelect = document.querySelector('#classic');
const colorSelect = document.querySelector('#color');
const year = document.querySelector('#year');

function updateMode() {
    if (classicSelect.checked) {
        mode = 'classic';
    } else if (colorSelect.checked) {
        mode = 'color';
    } else {
        mode = 'invalid';
    }
}

function createGrid(numSquares) {
    
    gridContainerNode.style.setProperty('grid-template-columns', `repeat(${numSquares}, 1fr)`);
    gridContainerNode.style.setProperty('grid-template-rows', `repeat(${numSquares}, 1fr)`);
    squaresInput.value = numSquares;

    for (let i=0; i < Math.pow(numSquares, 2); i++) {
        const squareNode = document.createElement('div');
        squareNode.classList.add('square');
        if (mode === 'classic') {
            addMouseoverEffect_OG(squareNode);
        } else {
            addMouseoverEffect_color(squareNode);
        }
        gridContainerNode.appendChild(squareNode);
    }
    
}

function getSquaresList() {
    return document.querySelectorAll('.square');
}

function removeGrid() {
    getSquaresList().forEach(square => square.remove());
}

function changeSquareGrid(numSquares) {
    removeGrid();
    createGrid(numSquares);
}

function addMouseoverEffect_OG(squareNode) {
    squareNode.addEventListener("mouseover", handleMouse_OG);
}

function handleMouse_OG(event) {
    let currentColor;
    if (event.target.classList.contains('color')) {
        currentColor = 'rgb(225, 225, 225)'; // change cell to original light color
        event.target.classList.remove('color');
    } else {
        currentColor = getComputedStyle(event.target).backgroundColor;
    }
    event.target.style.backgroundColor = darkenColor(currentColor, 25);
}

function addMouseoverEffect_color(squareNode) {
    squareNode.addEventListener("mouseover", handleMouse_color);
}

function handleMouse_color(event) {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    event.target.classList.add('color');
    
    event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function darkenColor(col, amt) {
  col = col.match(/\d{1,3}/);
  col = Math.max(100, col - amt);
  return `rgb(${col}, ${col}, ${col})`; 
}
//setup event listeners
squaresInput.addEventListener('change', e => {
    const newGridSize = e.target.value < 16 ? 16 : e.target.value > 100 ? 100 : e.target.value;
    changeSquareGrid(newGridSize);
});

clearButtons.forEach(button => button.addEventListener('click', () => {
    removeGrid();
    createGrid(squaresInput.value);
}));

classicSelect.addEventListener('click', () => {
    if (mode !== 'classic') { //enter only if mode has changed
        updateMode();
        getSquaresList().forEach(square => {
            square.removeEventListener('mouseover', handleMouse_color);
            addMouseoverEffect_OG(square);
        })
    }
});

colorSelect.addEventListener('click', () => {
    if (mode !== 'color') { //enter only if mode has changed
        updateMode();
        getSquaresList().forEach(square => {
            square.removeEventListener('mouseover', handleMouse_OG);
            addMouseoverEffect_color(square);
        })
    }
    
});

//start up sequence
updateMode();
createGrid(initalGridSize);
year.textContent = new Date().getFullYear();


