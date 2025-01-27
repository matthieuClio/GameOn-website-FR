// DOM Elements
const divElement = document.querySelector("body");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.getElementById("closeModal");
const formData = document.querySelectorAll(".formData");
const formContainer = document.getElementById("mainForm");
const formInputFirstName = document.getElementById("first");
const formInputName = document.getElementById("last");
const formInputEmail = document.getElementById("email");
const formInputDateOfBirth = document.getElementById("birthdate");
const formInputNumberOfTournement = document.getElementById("quantity");
const formInputSpecificTounement = document.querySelectorAll('input[name="location"]');
const formInputTermsOfUse = document.getElementById("checkbox1");
const modalValidation = document.querySelector(".background-validation");
const modalBtnValidation = document.querySelector(".boutton-validation");
const modalBtnCloseValidation = document.getElementById("closeModalValidation");
const errorContainer = document.querySelectorAll(".error");

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
  divElement.style.overflow = "hidden";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
  divElement.style.overflow = "auto";
}

// Launch modal validation
function launchModalValidation() {
  modalValidation.style.display = "block";
  divElement.style.overflow = "hidden";
}

// Close modal validation
function closeModalValidation() {
  modalValidation.style.display = "none";
  divElement.style.overflow = "auto";
}

// Check first name
function checkName(formInput, errorContainer) {

  // Check if in we find a number in the input
  let regex = /\d/;
  let result = regex.test(formInput.value);

  if (formInput.value.length <= 1) {
    errorContainer.innerHTML = "Veuillez entrer 2 caractères ou plus";
  } 
  else if (result) {
    errorContainer.innerHTML = "Veuillez entrer uniquement des lettres";
  }
  else {
    errorContainer.innerHTML = "";
    return true;
  }

  return false;
}

// Check email
function checkEmail(formInput, errorContainer) {

  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let result = regex.test(formInput.value);
  
  if (!result) {
    errorContainer.innerHTML = "Veuillez entrer une adresse email valide";
    return false;
  }

  if (result) {
    errorContainer.innerHTML = ""
    return true;
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
    return true;
  }  

  // Verify current date is the same than the input
  else if (result && Number(formInputYear[1]) == maxDate) {
    
    // Verify the month and the day relative to the current date
    if (currentFullDate[1] >= Number(formInputYear[2]) && currentFullDate[2] >= Number(formInputYear[3]) || 
      currentFullDate[1] > formInputYear[2]) {

      errorContainer.innerHTML = "";
      return true;
    } 
    
    else {
      errorContainer.innerHTML = "La date entrée est suppérieure à la date du jour";
      return false;
    }
  } 
  
  else {
    errorContainer.innerHTML = "Veuillez vérifier la date de naissance";
    return false;
  }
}

// Verify the number of tournement field
function checkNumberOfTournement(formInput, errorContainer) {
  let regex = /\d{1,}/;
  let result = regex.test(formInput.value);

  if (result) {
    errorContainer.innerHTML = "";
    return true;
  }

  else {
    errorContainer.innerHTML = "Veuillez vérifier le nombre de tournois";
    return false;
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
    errorContainer.innerHTML = "";
    return true;
  }
  else {
    errorContainer.innerHTML = "Veuillez sélectioner un tournois";
    return false;
  }
}

function checkTermsOfUse(formInput, errorContainer) {

  if (formInput.checked) {
    errorContainer.innerHTML = "";
    return true;
  }
  else {
    errorContainer.innerHTML = "Veuillez accepter les conditions d'utilisations";
    return false;
  }
}

function checkError(form, isFormValid) {

  if (isFormValid) {
    // Reset and close the modal
    form.reset();
    closeModal();
    // Display modal validation
    launchModalValidation();
  }
}

// ......
// Events
// ......

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalBtnClose.addEventListener("click", closeModal);

// Close modal validation event
modalBtnCloseValidation.addEventListener("click", closeModalValidation);

// Boutton modal validation event
modalBtnValidation.addEventListener("click", closeModalValidation);


// Submit button event
formContainer.addEventListener("submit", (evenement) => {
  evenement.preventDefault();

  // Fields verification :

  // Check first name
  let isNameValide = checkName(formInputFirstName, errorContainer[0]);
  // Check last name
  let isLastNameValide = checkName(formInputName, errorContainer[1]);
  // Check email
  let isEmailValid = checkEmail(formInputEmail, errorContainer[2]);
  // Check date of birth
  let isDateOfBirthValid = checkDateOfBirth(formInputDateOfBirth, errorContainer[3]);
  // Check number of tournement
  let isNumberOfTournementValid = checkNumberOfTournement(formInputNumberOfTournement, errorContainer[4]);
  // Check specific tournement
  let isSpecificTournementValid = checkSpecificTournement(formInputSpecificTounement, errorContainer[5]);
  // Check terms of use
  let isTermsOfUseValid = checkTermsOfUse(formInputTermsOfUse, errorContainer[6]);
  
  // Error verification :
  checkError(formContainer, 
            isNameValide && 
            isLastNameValide && 
            isEmailValid &&
            isDateOfBirthValid &&
            isNumberOfTournementValid &&
            isSpecificTournementValid &&
            isTermsOfUseValid
            );
});

  