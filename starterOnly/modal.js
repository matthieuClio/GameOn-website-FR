// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const formContainer = document.getElementById("mainForm");
const formInputFirstName = document.getElementById("first");
const formInputName = document.getElementById("last");
const formInputEmail = document.getElementById("email");
const formInputDateOfBirth = document.getElementById("birthdate");
const formInputNumberOfTournement = document.getElementById("quantity");
const formInputSpecificTounement = document.querySelectorAll('input[name="location"]');
const formInputTermsOfUse = document.getElementById("checkbox1");
const errorContainer = document.querySelectorAll(".error");

// Variable
let errorVerification;

// .........
// Functions
// .........

function editNav() {

  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Check first name
function checkName(formInput, errorContainer) {

  // Check if in we find a number in the input
  let regex = /\d/;
  let result = regex.test(formInput.value);

  if (formInput.value.length <= 1) {
    errorContainer.innerHTML = "Veuillez entrer 2 caractères ou plus";
    errorVerification = true;
  } 
  
  else if (result) {
    errorContainer.innerHTML = "Veuillez entrer uniquement des lettres";
    errorVerification = true;
  }

  if (!result && formInput.value.length >= 2) {
    // console.log(formInput.value);
    errorContainer.innerHTML = "";
  }
}

// Check email
function checkEmail(formInput, errorContainer) {

  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let result = regex.test(formInput.value);
  
  if (!result) {
    errorContainer.innerHTML = "Veuillez entrer une adresse email valide";
    errorVerification = true;
  }

  if (result) {
    // console.log(formInput.value);
    errorContainer.innerHTML = ""
  }
}

// Check date of birth 
function checkDateOfBirth(formInput, errorContainer) {
 
  // Currente date 
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1; // Month start at 0
  let currentYear = currentDate.getFullYear();
  let currentFullDate = [currentYear, currentMonth, currentDay];

  // Regular expression
  let regex = /(\d{4})-(\d{2})-(\d{2})/;
  let result = regex.test(formInput.value);
  let formInputYear = regex.exec(formInput.value);

  // Date minimum and maximum
  let minDate = 1873;
  let maxDate = currentYear;

  // Verify minDate and maxDate with the input year
  if (result && Number(formInputYear[1]) >= minDate && Number(formInputYear[1]) < maxDate) {
    // console.log(formInputYear[1]);
  }  

  // Verify current date is the same than the input
  else if (result && Number(formInputYear[1]) == maxDate) {
    
    // Verify the month and the day relative to the current date
    if (currentFullDate[1] >= Number(formInputYear[2]) && currentFullDate[2] >= Number(formInputYear[3]) || 
      currentFullDate[1] > formInputYear[2]) {

      // console.log(Number(formInputYear[2]) + ' ' + Number(formInputYear[3]));
      errorContainer.innerHTML = "";
    } 
    
    else {
      errorContainer.innerHTML = "La date entrée est suppérieure à la date du jour";
      errorVerification = true;
    }
  } 
  
  else {
    errorContainer.innerHTML = "Veuillez vérifier la date de naissance";
    errorVerification = true;
  }
}

// Verify the number of tournement field
function checkNumberOfTournement(formInput, errorContainer) {
  let regex = /\d{1,}/;
  let result = regex.test(formInput.value);

  if (result) {
    errorContainer.innerHTML = "";
    // console.log(result);
  }

  else {
    errorContainer.innerHTML = "Veuillez vérifier le nombre de tournois";
    errorVerification = true;
  }
}

//Verify specific tournement
function checkSpecificTournement(formInput, errorContainer) {
  let isChecked = false;

  for(const radioButton of formInput) {
    if (radioButton.checked) {
      isChecked = true
    }
  }

  if (isChecked) {
    // console.log(isChecked);
    errorContainer.innerHTML = "";
  }
  else {
    errorContainer.innerHTML = "Veuillez sélectioner un tournois";
    errorVerification = true;
  }
}

function checkTermsOfUse(formInput, errorContainer) {

  if (formInput.checked) {
    errorContainer.innerHTML = "";
  }
  else {
    errorContainer.innerHTML = "Veuillez accepter les conditions d'utilisations";
    errorVerification = true;
  }
}

function checkError(form) {
  if (!errorVerification) {
    console.log('envoie du formulaire');
    
    form.reset();
    closeModal();
  }
}

// ......
// Events
// ......

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalBtnClose.addEventListener("click", closeModal);

// Submit button event
formContainer.addEventListener("submit", (evenement) => {
  evenement.preventDefault();

  errorVerification = false;
  // Fields verification :

  // Check first name
  checkName(formInputFirstName, errorContainer[0]);
  // Check last name
  checkName(formInputName, errorContainer[1]);
  // Check email
  checkEmail(formInputEmail, errorContainer[2]);
  // Check date of birth
  checkDateOfBirth(formInputDateOfBirth, errorContainer[3]);
  // Check number of tournement
  checkNumberOfTournement(formInputNumberOfTournement, errorContainer[4]);
  // Check specific tournement
  checkSpecificTournement(formInputSpecificTounement, errorContainer[5]);
  // Check terms of use
  checkTermsOfUse(formInputTermsOfUse, errorContainer[6]);
  console.log(errorVerification);
  
  // Error verification :
  checkError(formContainer);

  // Fonction qui permet de vider le formulaire (existe déjà) si le formulaire est validé
});

  