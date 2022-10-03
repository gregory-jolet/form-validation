const validationIcon = document.querySelectorAll(".icon-verif");
const validationText = document.querySelectorAll(".error-message");

const userInput = document.querySelector(".input-group:nth-child(1) input");

// quand on retire le focus
userInput.addEventListener("blur", userValidation);
// quand on écrit dans l'input
userInput.addEventListener("input", userValidation);

function userValidation() {
  if (userInput.value.length >= 5) {
    showValidation({ index: 0, validation: true });
  } else {
    showValidation({ index: 0, validation: false });
  }
}

function showValidation({ index, validation }) {
  if (validation) {
    // Si la condition est respectée
    validationIcon[index].src = "./ressources/check.svg";
    validationIcon[index].style.display = "block";
  } else {
    // Sinon
    validationIcon[index].src = "./ressources/error.svg";
    validationIcon[index].style.display = "block";
  }
}

const mailInput = document.querySelector(".input-group:nth-child(2) input");

// quand on retire le focus
mailInput.addEventListener("blur", mailValidation);
// quand on écrit dans l'input
mailInput.addEventListener("input", mailValidation);

// expression regex email pour respecter le format imposé
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function mailValidation() {
  // si le format est respecté
  if (regexEmail.test(mailInput.value)) {
    showValidation({ index: 1, validation: true });
  } else {
    showValidation({ index: 1, validation: false });
  }
}

const passwordInput = document.querySelector(".input-group:nth-child(3) input");

// quand on retire le focus
passwordInput.addEventListener("blur", passwordValidation);
// quand on écrit dans l'input
passwordInput.addEventListener("input", passwordValidation);

// objet password permettant la vérification des paramètres
const passwordVerification = {
  length: false,
  symbol: false,
  number: false,
};

// objet regex pour formater la sortie voulue
const regexList = {
  length: 6,
  symbol: /[^a-zA-Z0-9\s]/,
  number: /[0-9]/,
};

let passwordValue;
let validationResult = 0;

function passwordValidation() {
  passwordValue = passwordInput.value;
  // prropriétés dans l'objet passwordVerification
  for (const prop in passwordVerification) {
    if (prop === "length") {
      // longueur
      if (passwordValue.length < regexList.length) {
        passwordVerification.length = false;
      } else {
        passwordVerification.length = true;
        validationResult++;
      }
    } else if (prop === "symbol") {
      // verification regex symbol
      if (regexList["symbol"].test(passwordValue)) {
        passwordVerification["symbol"] = true;
        validationResult++;
      } else {
        passwordVerification["symbol"] = false;
      }
    } else if (prop === "number") {
      // regex number
      if (regexList["number"].test(passwordValue)) {
        passwordVerification["number"] = true;
        validationResult++;
      } else {
        passwordVerification["number"] = false;
      }
    }
  }
}
