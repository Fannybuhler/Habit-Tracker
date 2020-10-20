let habitColors = ["#28BFCF", "#E9EBEF", "#4ACDD9", "#5B7EDF", "#4EE961", "#88C7BF", "#D0DB8D", "#F57CFF"];

document.querySelector('.dropbtn').addEventListener('click', showDropdown);

function colorDrop() {
    let select = document.querySelector('.dropdownContent');
    
    for(var i = 0; i < habitColors.length; i++) {
        let opt = habitColors[i];
        let color = document.createElement('button');
        color.classList = "colorBtn"
        color.id = i;
        color.style.backgroundColor = opt;
        select.appendChild(color);
    }
}

let pickedColor = document.querySelector(".colorBtn")

function showDropdown(){
    let dropBtn = document.querySelector(".dropdownContent");
    if(dropBtn.classList == 'dropdownContent hidden') {
        dropBtn.classList.add('showing');
        dropBtn.classList.remove('hidden');
    } else if(dropBtn.classList == 'dropdownContent showing') {
        dropBtn.classList.remove('showing');
        dropBtn.classList.add('hidden');
    }
    
};

colorDrop();
loopColors();

// Loops throught the array of created elements
function loopColors() {
    let iconClick = document.querySelectorAll('.colorBtn');

    for(var i = 0; i < iconClick.length; i++) {
        iconClick[i].addEventListener('click', colorDisplay);
    }
}

// Selects and displays the chosen icon
function colorDisplay() {
    let fillColor = document.querySelector('.dropdown');
    fillColor.style.backgroundColor = habitColors[this.id];
    fillColor.style.border = "5px solid" + habitColors[this.id];
    let hideText = document.querySelector('.dropbtn');
    hideText.style.color = habitColors[this.id];
    showDropdown('dropdownContent showing');
}