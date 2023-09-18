let workTime = 1500;
let timeLeft = workTime;
let timePause = 300;
let isPaused = true;
let temps = workTime / 60;

let travail = document.getElementById("travail");
let pause = document.getElementById("pause");
let elem = document.getElementById("chrono");
let button = document.getElementById("debut");
let boutonReset = document.getElementById("reset");

boutonReset.style.display = "none";

button.addEventListener("click", () => {
  button.style.display = "none";
  boutonReset.style.display = "inline-block";
  travail.style.color = "green";
  let timerId = setInterval(countdown, 1000);
});

function countdown() {
  let minutes = parseInt(timeLeft / 60, 10);
  let secondes = parseInt(timeLeft % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  secondes = secondes < 10 ? "0" + secondes : secondes;
  if (timeLeft <= -1) {
    if (isPaused == true) {
      isPaused = false;
      timeLeft = timePause;
      travail.style.color = "white";
      pause.style.color = "green";
    } else {
      timeLeft = workTime;
      isPaused = true;
      travail.style.color = "green";
      pause.style.color = "white";
      timerForm.style.display = "none";
    }
  } else {
    elem.innerHTML = `${minutes}:${secondes}`;
    timeLeft--;
  }
}

boutonReset.addEventListener("click", () => {
  location.reload();
});

// Références aux éléments du formulaire
let timerForm = document.getElementById("timer-form");
let workDurationInput = document.getElementById("work-duration");
let breakDurationInput = document.getElementById("break-duration");
let boutonMettreAJour = document.getElementById("mettreAJour");

// Écouteur d'événement pour le formulaire
timerForm.addEventListener("click", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupère les valeurs saisies par l'utilisateur
  let newWorkDuration = parseInt(workDurationInput.value, 10) * 60; // Convertit en secondes
  let newBreakDuration = parseInt(breakDurationInput.value, 10) * 60; // Convertit en secondes

  // Met à jour les durées de travail et de pause
  workTime = newWorkDuration;
  timeLeft = newWorkDuration;
  timePause = newBreakDuration;
  isPaused = true;
  temps = newWorkDuration / 60;
  if(temps/10 >= 1){
    temps = temps;
  } else {
    temps = '0' + temps;
  }

  // Réinitialise l'affichage
  elem.innerHTML = `${temps}:00`;

  boutonMettreAJour.addEventListener("click", () => {
    timerForm.style.display = "none";
  });

  localStorage.setItem("workDuration", newWorkDuration);
  localStorage.setItem("breakDuration", newBreakDuration);
});

window.addEventListener("load", function () {
  let storedWorkDuration = localStorage.getItem("workDuration");
  let storedBreakDuration = localStorage.getItem("breakDuration");

  if (storedWorkDuration && storedBreakDuration) {
    workTime = parseInt(storedWorkDuration, 10);
    timePause = parseInt(storedBreakDuration, 10);

    // Met à jour l'affichage ou les variables appropriées ici
    temps = workTime / 60; // Met à jour la variable 'temps' en minutes

    // Met à jour l'affichage du formulaire avec les valeurs récupérées
    workDurationInput.value = temps;
    breakDurationInput.value = timePause / 60;

    // Met à jour l'affichage du timer (par exemple, si le timer est actuellement visible)
    elem.innerHTML = `${temps}:00`;
  }
});

boutonReset.addEventListener("click", () => {
  location.reload();
});
