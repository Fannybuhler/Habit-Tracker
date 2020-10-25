// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btns = document.querySelectorAll(".plus-btn"); // Get a array of two plus-btn elements

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btns[0].onclick = function() {
  modal.style.display = "block";
}

btns[1].onclick = function() {
  modal.style.display = "block";
}

// This aint pretty but it resets the modal "manually"
function clearInputFields() {
  document.getElementById("createHabitName").value = "";
  document.getElementById("createHabitDescription").value = "Description..."
  document.getElementById("downTextIcon").innerHTML = "Pick an Icon";
  document.getElementById("dropColor").style.backgroundColor = "";
  let modalTitle = document.getElementById("modal-title");
  modalTitle.innerHTML = "Add habit";
  removeBtn.classList.add("hideBtn");
  updateBtn.classList.add("hideBtn")
  addHabitBtn.classList.remove("hideBtn")
}

// Get every calendar icon to open modal
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

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  clearInputFields();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearInputFields();
  }
}

// Add-button
var addHabitBtn = document.querySelector(".add-habit-btn");
addHabitBtn.addEventListener("click", addHabit);
function addHabit(){
  let createHabitName = document.getElementById("createHabitName").value;
  let dropIcon = document.getElementById("dropIcon").getElementsByTagName("svg")[0].outerHTML;
  let dropColor = document.getElementById("dropColor")
  let rbgDropColor = dropColor.style.backgroundColor;
  let createHabitDescription = document.getElementById("createHabitDescription").value;
  daoCreateHabit(createHabitName, dropIcon , rbgDropColor, createHabitDescription);
  modal.style.display = "none";
  location.reload();
}

// Remove-button
let removeBtn = document.getElementById("removeButton");
removeBtn.addEventListener("click", function(){
  let habitName = document.getElementById("createHabitName").value;
  removeHabit(habitName);
  modal.style.display = "none";
  location.reload();
})

// Update button
let updateBtn = document.getElementById("updateButton");
updateBtn.addEventListener("click", function(){
  habitName = document.getElementById("createHabitName").value;
  let habitData = getHabit(habitName);
  habitDates = habitData.dates;
  updateHabit(habitName, habitDates);
  console.log("Update-knappen fungerar");
});
