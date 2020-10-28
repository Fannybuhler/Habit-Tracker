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

calendarIconButtons();

//This aint pretty but it resets the modal "manually"
function clearInputFields() {
  console.log()
  document.getElementById("createHabitName").value = "";
  document.getElementById("createHabitDescription").value = ""
  document.getElementById("downTextIcon").innerHTML = "Pick an Icon";
  document.getElementById("dropColor").style.backgroundColor = "";
  let modalTitle = document.getElementById("modal-title");
  modalTitle.innerHTML = "Add habit";
  removeBtn.classList.add("hideBtn");
  updateBtn.classList.add("hideBtn")
  addHabitBtn.classList.remove("hideBtn")
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

// Update button
let updateBtn = document.getElementById("updateButton");
updateBtn.addEventListener("click", addHabit);

// Name validation
const nameValidation = document.querySelector(".text-input");

function addHabit(){
  let createHabitName = document.getElementById("createHabitName").value;
  let dropIconContainer = document.getElementById("dropIcon")
  let dropIcon = document.getElementById("dropIcon").getElementsByTagName("svg")[0].outerHTML;

  let dropColor = document.getElementById("dropColor")
  let rbgDropColor = dropColor.style.backgroundColor;

  let createHabitDescription = document.getElementById("createHabitDescription").value;
  let dates = {}

  if(getHabit(createHabitName)!=null){ // Habit exists
    let habitData = getHabit(createHabitName);
    dates = habitData.dates
  }

  if (nameValidation.value.length === 0 || dropIcon.includes("actualArrow") || !rbgDropColor){
      if(nameValidation.value.length===0){
        nameValidation.style.border = "0.5px solid #28BFCF";
      }else{
        nameValidation.style.border = "";
      }
      if(dropIcon.includes("actualArrow")){
        dropIconContainer.style.border  = "0.5px solid #28BFCF";
      }else{
        dropIconContainer.style.border  = ""
      }
      if(!rbgDropColor){
        dropColor.style.border  = "0.5px solid #28BFCF";
      }else{
        dropColor.style.border  = "";
      }

  } else {
      daoCreateHabit(createHabitName, dropIcon , rbgDropColor, createHabitDescription, dates);
      modal.style.display = "none";
      dropColor.style.border  = "";
      dropIconContainer.style.border  = "";
      nameValidation.style.border = "";
      location.reload();
  }
}

// Remove-button
let removeBtn = document.getElementById("removeButton");
removeBtn.addEventListener("click", () => {
  let habitName = document.getElementById("createHabitName").value;
  removeHabit(habitName);
  modal.style.display = "none";
  location.reload();
})
