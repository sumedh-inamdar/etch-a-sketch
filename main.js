const gridContainerNode = document.querySelector('.gridContainer');
const clearGrid = document.querySelector('.clearGrid');
const squaresInput = document.querySelector('#squares');

function createGrid(numSquares) {
    
    gridContainerNode.style.setProperty('grid-template-columns', `repeat(${numSquares}, 1fr)`);
    gridContainerNode.style.setProperty('grid-template-rows', `repeat(${numSquares}, 1fr)`);

    for (let i=0; i < Math.pow(numSquares, 2); i++) {
        const squareNode = document.createElement('div');
        squareNode.classList.add('square');
        addMouseoverEffect_OG(squareNode); //detect which mode is selected (original or colorful)
        
        gridContainerNode.appendChild(squareNode);
    }
}

function removeGrid() {

}

function changeSquareGrid(value) {
    
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

createGrid(16);

// squaresInput.addEventListener('change', changeSquareGrid);
squaresInput.addEventListener('input', e => {
    console.log(e.target.value);
    changeSquareGrid(e.target.value);
});



