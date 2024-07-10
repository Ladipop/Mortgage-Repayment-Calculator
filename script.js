console.log("eba");
const allLabels = document.querySelectorAll(".label");
const allWrappers = document.querySelectorAll(".wrapper");
const allInputs = document.querySelectorAll(".number");
const button = document.querySelector(".submit-btn");
const empty = document.querySelector(".empty");
const completed = document.querySelector(".completed");
const allRadioContainer = document.querySelectorAll(".radio-container");
const radioErrorContainer = document.querySelector(".radio-error-container");
const repaymentContainer = document.querySelector(".repayment-container");
let numericRegex = /^[+-]?\d+(\.\d+)?$/;

function resetAsideLogos() {
  const allAsideLogos = document.querySelectorAll(".aside-logo");
  allAsideLogos.forEach((logo) => {
    logo.classList.remove("lime-background-color");
  });
}

allWrappers.forEach((wrappers) => {
  wrappers.addEventListener("click", () => {
    const asideLogo = wrappers.firstElementChild;
    resetAsideLogos();
    asideLogo.classList.add("lime-background-color");
  });
});
function resetRadio() {
  const allRadio = document.querySelectorAll(".radioo");
  allRadio.forEach((Radio) => {
    Radio.classList.remove("radio-checked");
  });
}
function resetRadioContainer() {
  allRadioContainer.forEach((RadioContainers) => {
    RadioContainers.classList.remove("radio-container-green-background");
  });
}
function radioCheck() {
  let hasGreenBackground = false;

  allRadioContainer.forEach((RadioContainer) => {
    if (RadioContainer.classList.contains("radio-container-green-background")) {
      hasGreenBackground = true;
    }
  });
  if (!hasGreenBackground) {
    radioErrorContainer.style.display = "block";
    return false;
  } else {
    radioErrorContainer.style.display = "none";
    return true;
  }
}

allRadioContainer.forEach((RadioContainers) => {
  RadioContainers.addEventListener("click", () => {
    const radio = RadioContainers.firstElementChild;
    resetRadio();
    radio.classList.add("radio-checked");
    resetRadioContainer();
    RadioContainers.classList.add("radio-container-green-background");
  });
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (!radioCheck()) {
    return;
  }
  allWrappers.forEach((wrappers) => {
    const errorContainer = wrappers.querySelector(".error-container");
    const inputs = wrappers.children[1];
    const asideLogos = wrappers.children[0];
    const input = wrappers.children[1].value.trim();
    if (input == "") {
      errorContainer.textContent = "Please enter a number";
      errorContainer.style.display = "block";
      inputs.classList.add("input-border-red");
      asideLogos.classList.add("aside-logo-background-red");
      empty.classList.remove("empty-effect");
      completed.classList.remove("completed-effect");
      return false;
    } else if (!numericRegex.test(input)) {
      errorContainer.style.display = "block";
      inputs.classList.add("input-border-red");
      asideLogos.classList.add("aside-logo-background-red");
      empty.classList.remove("empty-effect");
      completed.classList.remove("completed-effect");
      return false;
    } else if (numericRegex.test(input)) {
      errorContainer.style.display = "none";
      inputNumber = Number(input);
      inputs.classList.remove("input-border-red");
      asideLogos.classList.remove("aside-logo-background-red");
      calc();
      resetAsideLogos();
    }
  });
});

const loan = document.querySelector(".amount");
const years = document.querySelector(".term");
const interest = document.querySelector(".rate");
const numberOfMonths = 12;
let monthlyRepaymentAmount = document.querySelector(
  ".monthly-repayment-amount"
);
const monthlyRepaymentValue = document.querySelector(
  ".monthly-repayment-value"
);
let totalRepaymentAmount = document.querySelector(".total-repayment-amount");
const totalRepaymentValue = document.querySelector(".total-repayment-value");
function calc() {
  empty.classList.add("empty-effect");
  completed.classList.add("completed-effect");

  // Numerator Calculation
  const loanAmount = Number(document.querySelector(".amount").value);
  const yearsAmount = Number(document.querySelector(".term").value);
  const interestAmount = Number(document.querySelector(".rate").value) / 100;
  const numerator = loanAmount * (interestAmount / numberOfMonths);

  // Denominator Clculation
  const denominator =
    1 -
    (1 + interestAmount / numberOfMonths) ** -(numberOfMonths * yearsAmount);

  // monthly Repayment Amount
  let monthlyRepaymentAmountFormatted = (numerator / denominator).toFixed(3);
  monthlyRepaymentAmount.textContent = parseFloat(
    monthlyRepaymentAmountFormatted
  ).toLocaleString();

  totalRepaymentAmount.textContent = parseFloat(
    monthlyRepaymentAmountFormatted * yearsAmount * numberOfMonths
  ).toLocaleString();
  if (
    repaymentContainer.classList.contains("radio-container-green-background")
  ) {
    totalRepaymentValue.classList.remove("repayment-color");
    monthlyRepaymentValue.classList.add("repayment-color");
  } else {
    monthlyRepaymentValue.classList.remove("repayment-color");
    totalRepaymentValue.classList.add("repayment-color");
  }
}

const clearAll = document.querySelector(".clear-all");
clearAll.addEventListener("click", () => {
  allInputs.forEach((allInput) => {
    allInput.value = "";
  });
  resetAsideLogos();
  resetRadio();
  resetRadioContainer();
  empty.classList.remove("empty-effect");
  completed.classList.remove("completed-effect");
  radioErrorContainer.style.display = "none";
  allWrappers.forEach((wrappers) => {
    const errorContainer = wrappers.querySelector(".error-container");
    const inputs = wrappers.children[1];
    const asideLogos = wrappers.children[0];
    errorContainer.style.display = "";
    inputs.classList.remove("input-border-red");
    asideLogos.classList.remove("aside-logo-background-red");
  });
});
