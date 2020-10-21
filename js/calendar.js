
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] // Weekdays starts with Sunday, USA style

const todayDate = new Date();

var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var monthCounter = 0; // Used to call getWeekDayArr()
renderCalendarHabits()

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
    var habitsContainer = document.getElementById("calendar-habits-container")
    var habits = getAllHabits();

    for(var i = 0; i<habits.length; i++){
        const habit = habits[i];
        console.log(habit)

        var container = document.createElement('div')
        container.className = "calendar-icon-rows";
        var icon = document.createElement('div')
        icon.style.backgroundColor = habit.color;
        icon.innerHTML = habit.icon;
        container.appendChild(icon);
        for(var j = 0; j<31; j++){ // loop through all calendar-days
            var day = document.createElement('div');
            day.className = "calendar-day";
            container.appendChild(day);
        }
        habitsContainer.appendChild(container);
    }
    
}

