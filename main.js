
//inital setup values
const initalGridSize = 16;

//setup element nodes
const gridContainerNode = document.querySelector('.gridContainer');
const clearButtons = document.querySelectorAll('.clearGrid');
const squaresInput = document.querySelector('#squares');


function createGrid(numSquares) {
    
    gridContainerNode.style.setProperty('grid-template-columns', `repeat(${numSquares}, 1fr)`);
    gridContainerNode.style.setProperty('grid-template-rows', `repeat(${numSquares}, 1fr)`);
    squaresInput.value = numSquares;

    for (let i=0; i < Math.pow(numSquares, 2); i++) {
        const squareNode = document.createElement('div');
        squareNode.classList.add('square');
        addMouseoverEffect_OG(squareNode); //detect which mode is selected (original or colorful)
        
        gridContainerNode.appendChild(squareNode);
    }
    
}

function removeGrid() {
    const squareList = document.querySelectorAll('.square');
    squareList.forEach(square => square.remove());
}

function changeSquareGrid(numSquares) {
    removeGrid();
    createGrid(numSquares);
}

function addMouseoverEffect_OG(squareNode) {
    squareNode.addEventListener("mouseover", () => {
        let currentColor = getComputedStyle(squareNode).backgroundColor;
        squareNode.style.backgroundColor = darkenColor(currentColor, 25);
    } )
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

//inital setup
createGrid(initalGridSize);


