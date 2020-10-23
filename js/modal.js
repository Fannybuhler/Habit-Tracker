// Get the modal
var modal = document.getElementById("myModal");
//let modalTitle = document.getElementById("modal-title")

// Get the button that opens the modal
var btns = document.querySelectorAll(".plus-btn"); // Get a array of two plus-btn elements

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the calendar icon to open modal
let calendarIconBtn = document.querySelector(".calendar-icon-container")
console.log(calendarIconBtn);


// When the user clicks on the button, open the modal
btns[0].onclick = function() {
  modal.style.display = "block";
}
btns[1].onclick = function() {
  modal.style.display = "block";
}

calendarIconBtn.onclick = function(){
  modal.style.display = "block"; 
  let habitData = getHabit(this.id); //send calendarIconBtn's ID the the function in dao to retrieve data
  document.getElementById("createHabitName").value = habitData.name;
  document.getElementById("createHabitDescription").value = habitData.description;
  document.getElementById("downTextIcon").innerHTML = habitData.icon;
  document.getElementById("dropColor").style.backgroundColor = habitData.color;
}



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var addHabitBtn = document.querySelector(".add-habit-btn");
addHabitBtn.addEventListener("click", addHabit);
function addHabit(){
  let createHabitName = document.getElementById("createHabitName").value;
  let dropIcon = document.getElementById("dropIcon").getElementsByTagName("svg")[0].outerHTML;
  let dropColor = document.getElementById("dropColor")
  let rbgDropColor = dropColor.style.backgroundColor;
  let createHabitDescription = document.getElementById("createHabitDescription").value;
  console.log(createHabitName);
  console.log(dropIcon);
  console.log(rbgDropColor);
  console.log(createHabitDescription);
  daoCreateHabit(createHabitName, dropIcon , rbgDropColor, createHabitDescription);
  modal.style.display = "none";
  location.reload();
}