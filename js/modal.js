// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector(".habit-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
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