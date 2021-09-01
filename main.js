const gridContainerNode = document.querySelector('.gridContainer');
const clearGrid = document.querySelector('.clearGrid');

//Create 16x16 grid + add hover effect
for (let i=0; i < 16*16; i++) {
    const divNode = document.createElement('div');
    divNode.addEventListener("mouseover", () => {
        divNode.style.backgroundColor = 'blue';
    })
    gridContainerNode.appendChild(divNode);
}



