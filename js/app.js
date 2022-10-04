const inputValidity = {
  user: false,
  email: false,
  password: false,
  passwordConfirmation: false,
};
const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();
  // retourne un tableau des différentes propriétées
  const key = Object.keys(inputValidity);

  const failedInput = key.filter(key => {
    if (!inputValidity[key]) {
      return key
    }
  })

  if (failedInput.length) {
    
  } else {
    alert("Vos données ont bien été envoyées.");
  }

  console.log(key, Boolean(failedInput.length));
}
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
    inputValidity.user = true;
  } else {
    showValidation({ index: 0, validation: false });
    inputValidity.user = false;
  }
}

function showValidation({ index, validation }) {
  if (validation) {
    // Si la condition est respectée
    validationIcon[index].src = "./ressources/check.svg";
    validationIcon[index].style.display = "block";
    // dans le cas du password qui ne contient pas de message d'erreur
    if (validationText[index]) {
      validationText[index].style.display = "none";
    }
  } else {
    // Sinon
    validationIcon[index].src = "./ressources/error.svg";
    validationIcon[index].style.display = "block";

    // pour l'input password
    if (validationText[index]) {
      validationText[index].style.display = "block";
    }
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
    inputValidity.email = true;
  } else {
    showValidation({ index: 1, validation: false });
    inputValidity.email = false;
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

function passwordValidation() {
  let validationResult = 0;
  passwordValue = passwordInput.value;
  // prropriétés dans l'objet passwordVerification
  for (const prop in passwordVerification) {
    // longueur
    if (prop === "length") {
      if (passwordValue.length < regexList.length) {
        passwordVerification.length = false;
      } else {
        passwordVerification.length = true;
        validationResult++;
      }
      continue;
    }

    // verification regex symbol et number
    if (regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } else {
      passwordVerification[prop] = false;
    }
  }

  // icone de validation
  if (validationResult !== 3) {
    showValidation({ index: 2, validation: false });
    inputValidity.password = false;
  } else {
    showValidation({ index: 2, validation: true });
    inputValidity.password = true;
  }

  passwordStrength();
}

const lines = document.querySelectorAll(".lines div");

// Ajout des lignes de force de password
function passwordStrength() {
  const passwordLength = passwordInput.value.length;

  // champ vide
  if (!passwordLength) {
    addLines(0);
    // Password sécurisé
  } else if (
    passwordLength > 9 &&
    passwordVerification.symbol &&
    passwordVerification.number
  ) {
    addLines(3);
    // Moyen
  } else if (
    (passwordLength > regexList.length && passwordVerification.symbol) ||
    passwordVerification.number
  ) {
    addLines(2);
    // Faible
  } else {
    addLines(1);
  }
}

// affichage des lignes en fonction de la valeur d'entrée
function addLines(numberOfLines) {
  lines.forEach((el, index) => {
    if (index < numberOfLines) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });

  confirmPassword();
}

const confirmInput = document.querySelector(".input-group:nth-child(4) input");

// quand on retire le focus
confirmInput.addEventListener("blur", confirmPassword);
// quand on écrit dans l'input
confirmInput.addEventListener("input", confirmPassword);

function confirmPassword() {
  const confirmValue = confirmInput.value;

  // si aucune valeur
  if (!confirmValue && !passwordValue) {
    validationIcon[3].style.display = "none";
    // Sinon si les deux passwords ne correspondent pas
  } else if (passwordValue !== confirmValue) {
    showValidation({ index: 3, validation: false });
    inputValidity.passwordConfirmation = false;
  } else {
    // S'ils sont égaux
    showValidation({ index: 3, validation: true });
    inputValidity.passwordConfirmation = true;
  }
}
