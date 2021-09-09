
//inital setup values
const initalGridSize = 16;
let mode = 'classic';

//setup element nodes
const gridContainerNode = document.querySelector('.gridContainer');
const clearButtons = document.querySelectorAll('.clearGrid');
const squaresInput = document.querySelector('#squares');
const classicSelect = document.querySelector('#classic');
const colorSelect = document.querySelector('#color');


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
    let currentColor = getComputedStyle(event.target).backgroundColor;
    event.target.style.backgroundColor = darkenColor(currentColor, 25);
}

function addMouseoverEffect_color(squareNode) {
    squareNode.addEventListener("mouseover", handleMouse_color);
}

function handleMouse_color(event) {
    event.target.style.backgroundColor = 'blue';
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
    if (mode !== 'classic') {
        mode = 'classic';
        getSquaresList().forEach(square => {
            square.removeEventListener('mouseover', handleMouse_color);
            addMouseoverEffect_OG(square);
        })
        console.log('Classic Selected')
    }
});

colorSelect.addEventListener('click', () => {
    if (mode !== 'color') {
        mode = 'color';
        getSquaresList().forEach(square => {
            square.removeEventListener('mouseover', handleMouse_OG);
            addMouseoverEffect_color(square);
        })
        console.log('Color Selected')    
    }
    
});

//inital setup
console.log('Start');
createGrid(initalGridSize);


