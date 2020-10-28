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
            const cur = current(habit);
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

function current(habit) {
    const todayDate = new Date();
    let currentDate = todayDate.getFullYear() + "-"+todayDate.getMonth()
    let currentStreak = 0;
    let dateToday = todayDate.getDate() -1 // 0-30, day of month
    let dates = habit.dates[currentDate];
    dates.sort((a, b) => b - a);
    if(dateToday == dates[0]){
        currentStreak += 1;
    }
    for(var i = 1; i < dates.length; i++) {
        if(dateToday-i<1){
            currentStreak+=1;
            currentDate = getPrevMonth(currentDate);
            dates = habit.dates[currentDate];
            dates.sort((a, b) => b - a);
            dateToday = daysInMonth(currentDate)-1;   // set dayToday to the last day of prev month
            i=-1;
        }
        else if(dates[i] == dateToday-i){ // 
            currentStreak+=1
        } else{
            break;
        }
    }
    return currentStreak
}
function getPrevMonth(date){
    let year = date.split("-")[0]
    let month = date.split("-")[1]
    month-=1;
    if(""+month=="-1"){
        month = "11";
        year -=1;
    }
    return (year+"-"+month);
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
