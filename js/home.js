function renderHomeButtons(){
    var habitBtnContainer = document.getElementById("habit-btn-container");
    habitBtnContainer.innerHTML = ""; // Empty the innerHTML of container
    var habits = getAllHabits();
    let width = (habits.length*15+15);
    if(width>80) width = 80; 
    habitBtnContainer.style.width = ""+width+"%"
    for(var i = 0; i<habits.length; i++){ // Loop through all habits in localStorage
        const habit = habits[i];
        var habitBtn = document.createElement('button')
        habitBtn.className = "habit-btn";
        habitBtn.innerHTML = habit.icon;
        habitBtn.id = habit.name +"-home-btn";
        habitBtn.style.borderColor = habit.color;
        habitBtnContainer.appendChild(habitBtn)
    }
    habitBtnContainer.innerHTML+='<button class="habit-btn plus-btn">+</button>';
}
renderHomeButtons();