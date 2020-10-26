// Calculate one days lenght
const oneDay = 24 * 60 * 60 * 1000;
let currentStreak = 0

let date = new Date();
    let today = date.getDay();
    let yesterday = today - 1;
    


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


function test() {
    
    
let test = getHabit("Test");
let dates = test.dates;

let datesArr = Object.values(dates); // Needs to find a way into the array

let dateparse = 



console.log(dateparse);



}




test();


// parseInt för att convertera till ett number

 //arrayList.push(dates[5]);
//arrayList.sort(function(a, b){return a-b});
  
/*
if value today = (value - 1) + 1 {
    currentStreak +=1
}




/* Calculates how many 1:s (days) there are in a row.
let tab = [1,1,1,1,1];
let streaks = tab.reduce((res, n) => 
  (n ? res[res.length-1]++ : res.push(0), res)
, [0]);
// Displays the maximum amount of days
console.log(Math.max(...streaks));



if(date + 1 day === true) {
    insert 1 in tab Array
} else {
    insert 0 in tab Array
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