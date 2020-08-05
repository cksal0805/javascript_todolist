const form = document.querySelector(".form");
const inputName = document.querySelector(".input-name");
const inputStartDate = document.querySelector(".input-start_date");
const inputLastDate = document.querySelector(".input-last_date");
const inputSubmit = document.querySelector(".input-submit");

const grettingName = document.querySelector(".name");
const daysLeft = document.querySelector(".days-left");

const NAME = "name";
const START_DATE = "start_date";
const LAST_DATE = "last_date";
const SHOWING_CN = "showing";

function saveData(name, start_date, last_date) {
  localStorage.setItem(NAME, name);
  localStorage.setItem(START_DATE, start_date);
  localStorage.setItem(LAST_DATE, last_date);
}

function submitHandle(e) {
  e.preventDefault();
  const inputNameValue = inputName.value;
  const inputStartDateValue = inputStartDate.valueAsDate;
  const inputLastDateValue = inputLastDate.valueAsDate;
  saveData(inputNameValue, inputStartDateValue, inputLastDateValue);
  paintingDaysLefts(inputNameValue, inputStartDateValue, inputLastDateValue);
}

function calcurator(last_date) {
  const date = new Date();
  const today = date.getTime();
  const new_last_date = new Date(last_date).getTime();
  const diff = new Date(new_last_date - today);
  daysLeft.innerText = `${Math.floor(diff / (1000 * 60 * 60 * 24))}일`;
}

function askForm() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", submitHandle);
}

function paintingDaysLefts(name, start_date, last_date) {
  form.classList.remove(SHOWING_CN);
  grettingName.classList.add(SHOWING_CN);
  daysLeft.classList.add(SHOWING_CN);
  grettingName.innerText = `${name}님의 전역까지 남은 일수는`;
  calcurator(last_date);
}

function loadDaysLeft() {
  const currentName = localStorage.getItem(NAME);
  const currentStartDate = localStorage.getItem(START_DATE);
  const currentLastDate = localStorage.getItem(LAST_DATE);

  if (
    currentName === null ||
    currentStartDate === null ||
    currentLastDate === null
  ) {
    askForm();
  } else {
    paintingDaysLefts(currentName, currentStartDate, currentLastDate);
  }
}
function init() {
  loadDaysLeft();
}
init();
