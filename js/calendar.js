var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
var today = new Date();
var dayOfWeek = today.getDay();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

// adjusts index-position from array
mm -= 1;

console.log(mm);
console.log(months[mm]);
console.log(today);

//Shows current month
document.querySelector(".current-month").innerHTML = months[mm];

//Arrow action
const arrowLeft = document.getElementById("arrow-left");
arrowLeft.addEventListener("click", function(){
    if(mm == 0){
        mm = 12;
    }
    mm -= 1;
    console.log(mm);
    document.querySelector(".current-month").innerHTML = months[mm];
});

const arrowRight = document.getElementById("arrow-right");
arrowRight.addEventListener("click", function(){
    if(mm == 11){
        mm =- 1;
    }
    mm += 1;
    console.log(mm);
    document.querySelector(".current-month").innerHTML = months[mm];
});

// var dayOfWeek = today.getDay();
// var dd = String(today.getDate()).padStart(2, '0');

// var dayWeekArr = []

// var d1WeekDay = mod(dayOfWeek-(mod(dd,7)-1),7)


var today = new Date();
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] // Weekdays starts with Sunday, USA style
// var dd = String(firstDay.getDate()).padStart(2, '0');

// I created my own modulus function because JS mod is slow and inaccurate
function mod(n, m) {
    return ((n % m) + m) % m;
  }

const mm = today.getMonth(); // January = 0, December = 11
const yyyy = today.getFullYear();

// PARAM month: the 'month-distance' from todays month.
// RETURN monthArr: a array with all the days in the month
function getWeekDayArr(month){
    var monthArr = []
    var y = yyyy;
    month +=mm;
    if(month>11){
        // 
        y += Math.floor(month/12)
        month = mod(month,12);
    }
    if(month<0){// If the month is negative
        y+=Math.floor(month/12)
        month = mod(month,12);
    }
    var firstDay = new Date(y, month, 1);// first day of the selected month
    var fdDayOfWeek = firstDay.getDay()
    for (const x of Array(31).keys()) {
        monthArr.push(weekDays[mod((fdDayOfWeek+x),7)]);
    }
    return monthArr
}
// console.log("This month: "+mm)


// for (const x of Array(31).keys()) {
//     console.log(getWeekDayArr(-x))
// }
