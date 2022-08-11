// Getting Elements

const buttons = document.querySelectorAll('button');
const gridContainer = document.querySelector('.grid-container');
const sizeSlider = document.getElementById('size-slider');
const gridNumber = document.getElementById('number');
const colorWell = document.querySelector("#color-selector");;

//Default Values

const defaultColor = '#ff1b2d';

sizeSlider.onchange = () => gridCleaner();
sizeSlider.onmousemove = (e) => gridNumber.innerText = e.target.value;

//Startup Config

window.addEventListener("load", startup, false);

function startup() {
    //Grid Set
    gridCreator(sizeSlider.value)
    //ColorWell Set
    colorWell.value = defaultColor;
    //Mode Set
    actualMode = 'paint'
    //Button
    removeClasses(actualMode)
  }

//Button Listener

buttons.forEach((button) => {
    button.addEventListener('click', () => {
            selected = button.value;
            setMode(selected);
            if(button.value != 'reset'){
                removeClasses(selected)
            }
    })
})

function removeClasses(target) {
    buttons.forEach((button) => {
        if(button.value == target) { button.classList.add("active"); }
        else { button.classList.remove("active"); }
    });
  }

//Mode Set

function setMode (mode) {
    if(mode == 'random') {
        actualMode = 'random'
    }else if(mode == 'paint'){
        actualMode = 'paint'
    }else if (mode == 'eraser'){
        actualMode = 'eraser'
    }else if (mode == 'reset') {
        gridCleaner();
    }
}

//Grid Config

function gridCreator(proportion) {
    gridContainer.style.gridTemplateColumns = `repeat(${proportion}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${proportion}, 1fr)`;

    for (let i = 0; i < Math.pow(proportion, 2); i++) {
        const gridItem = document.createElement('div');
        gridItem.addEventListener('mouseover', colorSet);
        gridItem.addEventListener('mousedown', colorSet);
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);
    }
}

function gridCleaner() {
    gridContainer.innerHTML = '';
    gridCreator((sizeSlider.value));
}

//Mouse Input

let mouseStatus = false;
document.body.onmousedown = () => (mouseStatus = true);
document.body.onmouseup = () => (mouseStatus = false);

//Color Set

function colorSet(e) {
    if (e.type === 'mouseover' && !mouseStatus) return
    else if (actualMode == 'paint') {
        e.target.style.backgroundColor = colorWell.value;
    } else if(actualMode == 'eraser') {
        e.target.style.backgroundColor = '#FFF';
    }else if(actualMode == 'random') {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb( ${red}, ${green}, ${blue})`;
    }
}