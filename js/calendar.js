
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] // Weekdays starts with Sunday, USA style

const todayDate = new Date();

var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var monthCounter = 0; // Used to call getWeekDayArr()

var currentDate = "";

renderCalendarHabits()// Render all the habits that are in the localStorage to the calendar

mm -= 1;// adjusts index-position from array

//Shows current month
document.querySelector(".current-month").innerHTML = months[mm];

//Arrow action
const arrowLeft = document.getElementById("arrow-left");
arrowLeft.addEventListener("click", function(){
    if(mm == 0){
        mm = 12;
    }
    mm -= 1;
    monthCounter-=1
    document.querySelector(".current-month").innerHTML = months[mm];
    changeDays(monthCounter);
});

const arrowRight = document.getElementById("arrow-right");
arrowRight.addEventListener("click", function(){
    if(mm == 11){
        mm =- 1;
    }
    mm += 1;
    monthCounter+=1
    document.querySelector(".current-month").innerHTML = months[mm];
    changeDays(monthCounter);
});

// I created my own modulus function because JS mod is slow and inaccurate
function mod(n, m) {
    return ((n % m) + m) % m;
  }

const todayMonth = todayDate.getMonth(); // January = 0, December = 11
const todayYear = todayDate.getFullYear();
currentDate = todayYear+"-"+todayMonth;

changeDays(monthCounter) // update the dayOfWeek element in HTML initialy
// PARAM month: the 'month-distance' from todays month.
// RETURN monthArr: a array with all the days in the month
function getWeekDayArr(monthDistance){
    var monthArr = []
    var y = todayYear;
    monthDistance +=todayMonth;
    if(monthDistance>11){
        // 
        y += Math.floor(monthDistance/12)
        monthDistance = mod(monthDistance,12);
    }
    if(monthDistance<0){// If the month is negative
        y+=Math.floor(monthDistance/12)
        monthDistance = mod(monthDistance,12);
    }
    var firstDay = new Date(y, monthDistance, 1);// first day of the selected month
    var fdDayOfWeek = firstDay.getDay()
    for (const x of Array(31).keys()) {
        monthArr.push(days[mod((fdDayOfWeek+x),7)]);
    }
    currentDate = y+"-"+monthDistance; // Update the currentDate to represent the date that the callendar is on
    return monthArr
}
function changeDays(monthDistance){
    var daysArr = getWeekDayArr(monthDistance);
    var daysDoc = document.querySelectorAll(".days");
    for (var i = 0; i < daysDoc.length; i++) {
        daysDoc[i].innerHTML = daysArr[i];
    }
}

// Information about DOM manipulation can be found at:
// https://stackoverflow.com/questions/14094697/how-to-create-new-div-dynamically-change-it-move-it-modify-it-in-every-way-po
function renderCalendarHabits(){
    var habitsContainer = document.getElementById("calendar-habits-container") // The main container that has all the calendar-icon-rows in it
    var habits = getAllHabits();
    for(var i = 0; i<habits.length; i++){ // Loop through all habits in localStorage
        const habit = habits[i];
        var container = document.createElement('div')
        container.className = "calendar-icon-rows";
        var icon = document.createElement('div')
        icon.style.backgroundColor = habit.color;
        icon.innerHTML = habit.icon;
        container.appendChild(icon);
        for(var j = 0; j<31; j++){ // loop through all calendar-days
            var day = document.createElement('div');
            day.className = "calendar-day";
            day.id = habit.name+"-"+j;
            day.addEventListener("click", dayClick)
            container.appendChild(day);
        }
        habitsContainer.appendChild(container);
    } 
}
function dayClick(){ // Handles the calendar-day clicks.
    // Use split to the the habitName and dayID from the ID of the calendar-day element
    const habitName = this.id.split("-")[0]
    const id = this.id.split("-")[1]

    var habit = getHabit(habitName);
    var dates = habit.dates;
    if(!(currentDate in dates)){ // If the currentDate does not exist in the 'dates' array, then we create it
        dates[currentDate] = []
    }
    if(dates[currentDate].includes(id)){ // If the day is already selected, then we deselect it.
        const index = dates[currentDate].indexOf(id);
        if (index > -1) {
            dates[currentDate].splice(index, 1);
        }
    }else{
        dates[currentDate].push(id); // Set the day as 'selected' by adding it the the array for the date
    }
    updateHabit(habitName, dates) // Updates tha dates array in the habits localStorage
}

