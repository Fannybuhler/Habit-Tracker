function seeDays() {
    // Get array of Habits dates
    let habit = getHabit("Test");
    let dates = habit.dates['2020-9'];
    let streak = habit.currentStreak;
    let daysInMonth = new Date(2020, monthCounter, 0).getDate();

    current(dates, streak, daysInMonth);

    longestStreak(dates, daysInMonth);    
}

function current(dates, currentStreak, daysInMonth) {
    let today = new Date();
    let dateToday = today.getDate() -1
    //let yesterday = dateToday - 1
    //let lastItem = dates[dates.length - 1];
    
    dates.sort((a, b) => b - a);
    
    if(dateToday == dates[0]){
        currentStreak += 1;
    }
    for(var i = 1; i < dates.length; i++) {
        if(dates[i] == dateToday-i){
            currentStreak+=1
        }else{
            break;
        }
    } 
    
    console.log('Your current streak is ' + currentStreak);
    // Get todays date as number    
}

function longestStreak(days, daysInMonth) {
    let tab = [];
    
    for(var i = 0; i < daysInMonth; i++) {
        tab.push(0);
    } 
    //let daysClicked = The day the user click becomes the index of which 0 to remove
    for(var j = 0; j < days.length; j++) {
        tab[days[j]] = 1;
    }    
    let streaks = tab.reduce((res, n) => 
      (n ? res[res.length-1]++ : res.push(0), res)
    , [0]);  
    console.log('Your longest streak this month is ' + Math.max(...streaks));
}

seeDays();

// parseInt för att convertera till ett number

 //arrayList.push(dates[5]);
//arrayList.sort(function(a, b){return a-b});
  
/*
if value today = (value - 1) + 1 {
    currentStreak +=1
}

 
            
        if(dates === daysInMonth[dateToday]) {
            
            currentStreak += 1;
        } else {
            currentStreak = 0;
        }


Calculates how many 1:s (days) there are in a row.




if(date + 1 day === true) {
    insert 1 in tab Array
} else {
    insert 0 in tab Array
}


function calc()  {
    currentArray = []
    if(currentArray[0] == currentArray[1] + 1) {
        //If the day before was clicked and you click today, the streak increases by 1
        console.log('Your on a streak')
        currentStreak += 1;
    } else if(a) {
        //If it's the first day of the month then calculate that the last day of the previous month was clicked
        currentStreak += 1;
    }
    else {
        //If the previous day was not clicked, the streak goes back to 0
        console.log('You just lost your streak')
        currentStreak = 0;
    }
    
}

*/


// when clicked, calculate how many millliseconds left of the day,
// and add a full day (86 400 000 milliseconds) so that the user have
// the full day to complete the habit.
//
// Make a calculation for when it is the last of the month
// so that the users streak continues even if the months swich.
//
// How do you do if the user adds a habit a day to late. If he/she
// adds that they completed a task even if the streak ended.
//
// If not clicked at midnight, enter 0, otherwise enter 1.
// calculate how many ones are in a row.
//
//
//
//