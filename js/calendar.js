
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] // Weekdays starts with Sunday, USA style

const todayDate = new Date();


var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var monthCounter = 0; // Used to call getWeekDayArr()


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

let currentMonth = todayDate.getMonth(); // January = 0, December = 11
let currentYear = todayDate.getFullYear();
let currentDate = currentYear+"-"+currentMonth;

const constDateToday = currentDate; // 'constDateToday' is the date today. It does not change with the calendar, like 'currentDate' does 
const constMonthToday = currentMonth;
const constYearToday = currentYear;

changeDays(monthCounter) // update the dayOfWeek element in HTML initialy
// PARAM month: the 'month-distance' from todays month.
// RETURN monthArr: a array with all the days in the month
function getWeekDayArr(monthDistance){
    var monthArr = []
    var y = constYearToday;
    monthDistance +=constMonthToday;
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
    currentYear = y;
    currentMonth = monthDistance;
    return monthArr
}
function changeDays(monthDistance){ // Changes the day-of-week display in the calendar
    var daysArr = getWeekDayArr(monthDistance);
    var daysDoc = document.querySelectorAll(".days");
    for (var i = 0; i < daysDoc.length; i++) {
        daysDoc[i].innerHTML = daysArr[i];
    }
    if(currentDate === constDateToday){
        document.querySelectorAll(".dates")[todayDate.getDate()-1].classList.add("today-day")
        daysDoc[todayDate.getDate()-1].classList.add("today-day");
    }else{
        document.querySelectorAll(".dates")[todayDate.getDate()-1].classList.remove("today-day")
        daysDoc[todayDate.getDate()-1].classList.remove("today-day");
    }
    renderCalendarHabits()// Render all the habits that are in the localStorage to the calendar
}

// Information about DOM manipulation can be found at:
// https://stackoverflow.com/questions/14094697/how-to-create-new-div-dynamically-change-it-move-it-modify-it-in-every-way-po
function renderCalendarHabits(){
    var habitsContainer = document.getElementById("calendar-habits-container") // The main container that has all the calendar-icon-rows in it
    habitsContainer.innerHTML = ""; // Empty the innerHTML of container
    var habits = getAllHabits();
    for(var i = 0; i<habits.length; i++){ // Loop through all habits in localStorage
        const habit = habits[i];
        var container = document.createElement('div')
        container.className = "calendar-icon-rows";
        var icon = document.createElement('div')
        icon.className ="calendar-icon-container"
        icon.id = habit.name;
        icon.style.backgroundColor = habit.color;
        icon.innerHTML = habit.icon;
        container.appendChild(icon);
        const doneDays = habit.dates[currentDate];
        let isActiveMonth = doneDays==undefined ? false : true; // If the month exists in the 'dates' array in local storage 
        const numOfDays = daysInMonth(currentDate);
        for(var j = 0; j<31; j++){ // loop through all calendar-days
            var day = document.createElement('div');
            day.className = "calendar-day";
            day.id = habit.name+"-"+j;
            if(j+1>numOfDays){ // If the day does not exist in the calendar(ex: 29th Feb)
                day.classList.add("unavilable-day");
            }else if(constYearToday+"-"+addZero(""+constMonthToday)+"-"+addZero(""+todayDate.getDate())<
                    currentYear+"-"+addZero(""+currentMonth)+"-"+addZero(""+(j+1))){ // Checks if the day is in the future
                day.classList.add("future-day");
            }
            else{
                day.addEventListener("click", dayClick)
                if(isActiveMonth && doneDays.includes(""+j)){
                    day.style.backgroundColor = habit.color; // Style the days that are selected
                }else{
                    day.addEventListener("mouseenter", (elem)=>{
                        elem.target.style.backgroundColor = habit.color.replace(')', ', 0.25)');
                    })
                    day.addEventListener("mouseleave", (elem)=>{
                        elem.target.style.backgroundColor = ""
                        elem.target.style.opacity = 1;
                    })

                }
                // if(currentDate === constDateToday && todayDate.getDate() == j-1){
                //     day.classList.add("today-day");
                // }

            }
            container.appendChild(day);
        }
        habitsContainer.appendChild(container);
    }
    calendarIconButtons();
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
    if(id==(todayDate.getDate()-1)){ // If user clicked on todays date in the calendar
        toggleHomeBtn(habitName); // Toggle the home-btn for that habit
    }
    updateHabitDates(habitName, dates) // Updates tha dates array in the habits localStorage
    renderCalendarHabits()
    streakInit()
}

function daysInMonth (date) {
    const year = (date.split("-")[0]) 
    const month = parseInt(date.split("-")[1])+1
    return new Date(year, month, 0).getDate(); 
}
function addZero(num){ // Add zero to a number with a single digit (ex: addZero(9) -> 09)
    if(num.length == 1){
        return "0"+num;
    }
    return num;
} 
function toggleHomeBtn(habitName){
    let habitElems = document.querySelectorAll(".card");
    habitElems.forEach(elem => {
        if(habitName == elem.id.split("-")[0]){
            if(elem.classList.contains("is-flipped")){
                elem.classList.remove("flip-animation");
                void elem.offsetWidth; // This is a hack to stop the animation reset
                elem.classList.remove("is-flipped");
            }else{
                elem.classList.add('flip-animation');
                elem.classList.add('is-flipped');
            }
        }
    })
}

// Get every calendar icon to open modal
function calendarIconButtons() {
    let calendarIconBtn = document.querySelectorAll(".calendar-icon-container")
    for (let i = 0; i < calendarIconBtn.length; i++){
    calendarIconBtn[i].addEventListener ("click", function(event){
        modal.style.display = "block"; 
        let modalTitle = document.getElementById("modal-title");
        modalTitle.innerHTML = "Change habit"
        removeBtn.classList.remove("hideBtn")
        updateBtn.classList.remove("hideBtn")
        addHabitBtn.classList.add("hideBtn")
        let habitData = getHabit(this.id); //send calendarIconBtn's ID the the function in dao to retrieve data

        document.getElementById("createHabitName").value = habitData.name;
        document.getElementById("createHabitDescription").value = habitData.description;
        document.getElementById("downTextIcon").innerHTML = habitData.icon;
        document.getElementById("dropColor").style.backgroundColor = habitData.color;
      }, false);
    }
  }