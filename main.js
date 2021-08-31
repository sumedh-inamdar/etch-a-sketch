const gridContainerNode = document.querySelector('.gridContainer');

for (let i=0; i < 16*16; i++) {
    const divNode = document.createElement('div');
    divNode.addEventListener("mouseover", () => {
        divNode.style.backgroundColor = 'blue';
    })
    gridContainerNode.appendChild(divNode);
}


