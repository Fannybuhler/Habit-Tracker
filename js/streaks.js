function streakInit() {
    const todayDate = new Date();
    const currentDate = todayDate.getFullYear() + "-"+todayDate.getMonth()
    // Get array of Habits dates
    var habits = getAllHabits();
    let hbtStrk = {};
    for(var i = 0; i<habits.length; i++){ // Loop through all habits in localStorage
        const habit = habits[i];
        let dates = habit.dates[currentDate];
        if(dates != null){
            const cur = current(dates);
            hbtStrk[habit.name] = cur;
        }
    }
    var btns = document.querySelectorAll('.card');
    var btnsflipped = document.querySelectorAll('.is-flipped');
    
    btns.forEach(btn =>{
        const currentHabit = btn.id.split("-")[0];
        let container = document.getElementById(currentHabit + '-home-btn');
        let displayStreak = document.getElementById(currentHabit + 'streak');
        let changeStreakText = 'Your current streak is ' + hbtStrk[currentHabit];
        if(container.classList == "card") {
            displayStreak.innerHTML = '';
        } else {
            displayStreak.innerHTML = changeStreakText;
        }
    })
    btnsflipped.forEach(btn =>{
        const currentHabit = btn.id.split("-")[0];
        let container = document.getElementById(currentHabit + '-home-btn');
        let displayStreak = document.getElementById(currentHabit + 'streak');
        let changeStreakText = 'Your current streak is ' + hbtStrk[currentHabit];
        if(container.classList == "card is-flipped") {
            displayStreak.innerHTML = changeStreakText;
        } 
    })
   
}

function current(dates) {
    let currentStreak = 0;
    let today = new Date();
    let dateToday = today.getDate() -1
    dates.sort((a, b) => b - a);
    if(dateToday == dates[0]){
        currentStreak += 1;
    }
    for(var i = 1; i < dates.length; i++) {
        if(dates[i] == dateToday-i){
            currentStreak+=1
        } else{
            break;
        }
    }
    return currentStreak
}

function longest(days, daysInMonth) {
    let tab = []; 
    for(var i = 0; i < daysInMonth; i++) {
        tab.push(0);
    } 
    for(var j = 0; j < days.length; j++) {
        tab[days[j]] = 1;
        let lastDayMonth = parseInt([days[j]]) + 1
        if(lastDayMonth === daysInMonth) {
            console.log('test');
        }
    }    
    let streaks = tab.reduce((res, n) => 
      (n ? res[res.length-1]++ : res.push(0), res)
    , [0]);  
    let longestStreak = Math.max(...streaks);
    return longestStreak
}

var flipBtns = document.querySelectorAll('.habit-btn__face--front');
flipBtns.forEach(elem =>{
    elem.addEventListener('click', streakInit);
})
var revBtns = document.querySelectorAll('.reverse-flip-btn');
revBtns.forEach(elem =>{
    elem.addEventListener('click', streakInit);
})

streakInit();
