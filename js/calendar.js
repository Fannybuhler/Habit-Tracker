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
