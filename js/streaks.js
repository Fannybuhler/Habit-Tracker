var flipBtns = document.querySelectorAll('.habit-btn');

    flipBtns.addEventListener('click', streakInit);
    console.log(flipBtns);

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
    let btns = document.querySelectorAll(".is-flipped");
    
    btns.forEach(btn =>{
        
        const currentHabit = btn.id.split("-")[0];
        let container = document.getElementById(currentHabit + '-home-btn');
        let displayStreak = document.getElementById(currentHabit + 'streak');
        let changeStreakText = 'Your current streak is ' + hbtStrk[currentHabit];

        if(container.classList == 'card is-flipped') {
            displayStreak.innerHTML = changeStreakText;
            console.log('testytytyt')
            
        } else {
            displayStreak.style.display = 'none'
            console.log('tes')
        }
        
        
        
        
    })
    // let daysInMonth = new Date(2020, monthCounter, 0).getDate();
    // current(dates, currentStreak);
    // longest(dates, longestStreak, currentStreak, daysInMonth);
    // calculateStreak();
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

    //let daysClicked = The day the user click becomes the index of which 0 to remove
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


//function calculateStreak() {
    // console.log("VI ÄR I CALCSTREAK")
    // let longest = longest(dates, longestStreak, currentStreak, daysInMonth);
    // let current = current();
    // console.log(current)

    // if(current == longest) {
    //     console.log('Your are currently on your longest streak with ' + current)
    // } else {
    //     console.log('Your current streak is ' + current);
    //     console.log('Your longest streak is ' + longest);
    // }
//}


streakInit();
