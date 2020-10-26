function renderHomeButtons(){
    var habitBtnContainer = document.getElementById("habit-btn-container");
    habitBtnContainer.innerHTML = ""; // Empty the innerHTML of container
    var habits = getAllHabits();
    for(var i = 0; i<habits.length; i++){ // Loop through all habits in localStorage
        const habit = habits[i];
        var container = document.createElement('div')
        container.className = "card is-flipped";
        var front = document.createElement('div');
        var back = document.createElement('div');
        front.className ="habit-btn habit-btn__face habit-btn__face--front";
        back.className ="habit-btn habit-btn__face habit-btn__face--back";
        front.style.borderColor = habit.color;
        back.style.borderColor = habit.color;
        front.innerHTML = habit.icon;

        container.id = habit.name +"-home-btn";

        back.innerHTML = '&#10003;<button class="reverse-flip-btn"><svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path style="fill:#fd0000;" d="m502.121094 1.214844c-5.972656-2.453125-12.863282-1.109375-17.429688 3.476562l-57.597656 57.601563c-47.488281-39.210938-108.417969-62.292969-171.09375-62.292969-141.164062 0-256 114.835938-256 256s114.835938 256 256 256c68.332031 0 132.609375-26.644531 180.96875-75.03125 8.34375-8.339844 8.34375-21.820312 0-30.164062-8.339844-8.339844-21.820312-8.339844-30.164062 0-40.296876 40.320312-93.867188 62.527343-150.804688 62.527343-117.632812 0-213.332031-95.699219-213.332031-213.332031s95.699219-213.332031 213.332031-213.332031c51.414062 0 101.332031 18.496093 140.777344 49.917969l-50.75 50.773437c-4.585938 4.585937-5.929688 11.457031-3.476563 17.429687 2.472657 5.972657 8.296875 9.878907 14.78125 9.878907h138.667969c8.832031 0 16-7.167969 16-16v-138.667969c0-6.484375-3.902344-12.308594-9.878906-14.785156zm0 0"/></svg></button>'

        container.appendChild(front);
        container.appendChild(back);

        habitBtnContainer.appendChild(container)
    }
    habitBtnContainer.innerHTML+='<button class="habit-btn plus-btn">+</button>';
}
renderHomeButtons();

// All buttons that are flippable
var flipBtns = document.querySelectorAll('.habit-btn__face--front');
flipBtns.forEach(elem =>{
    elem.addEventListener('click', addFlipp);
})
function addFlipp(){
    if(!this.parentNode.classList.contains("flip-animation")){
        this.parentNode.classList.add('flip-animation');
    }
    if(!this.parentNode.classList.contains("is-flipped")){
        this.parentNode.classList.add('is-flipped');
    }
}
// Reverse buttons
var revBtns = document.querySelectorAll('.reverse-flip-btn');
revBtns.forEach(elem =>{
    elem.addEventListener('click', reverseFlip);
})
function reverseFlip(){
    this.parentNode.parentNode.classList.remove("flip-animation");
    this.parentNode.parentNode.classList.remove("is-flipped");
}
// function reload(elem){
//     var content = elem.innerHTML;
//     elem.innerHTML= content; 
// }
function homeBtnClick(){
    console.log("FLIPPIN")
    this.classList.toggle('is-flipped')
}