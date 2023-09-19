let storedWorkDuration = localStorage.getItem("workDuration");
let workTime = 1500;
workTime = storedWorkDuration;
let timeLeft = workTime;
let timePause = 300;
let isPaused = true;
let temps = workTime / 60;
let timeMinutePause = timePause / 60;

let travail = document.getElementById("travail");
let pause = document.getElementById("pause");
let elem = document.getElementById("chrono");
let button = document.getElementById("debut");
let boutonReset = document.getElementById("reset");
let tempsTimerTravail = document.getElementById('tempsTimerTravail');
let tempsTimerPause = document.getElementById('tempsTimerPause');
let tempsPause = document.getElementById('tempsPause');
let tempsTravail = document.getElementById('tempsTravail');
let pause3 = document.getElementById('tempsPauseAffichage');
boutonReset.style.display = "none";
let minutes = parseInt(timeLeft / 60, 10);
let secondes = parseInt(timeLeft % 60, 10);
minutes = minutes < 10 ? "0" + minutes : minutes;
secondes = secondes < 10 ? "0" + secondes : secondes;
elem.innerHTML = `${minutes}:${secondes}`;
pause3.innerText = timeMinutePause + ' minutes';


button.addEventListener("click", () => {
  button.style.display = "none";
  boutonReset.style.display = "inline-block";
  travail.style.color = "green";
  let timerId = setInterval(countdown, 1000);
  tempsPause.style.display = "none";
  tempsTravail.style.display = "none";
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
      travail.style.color = "black";
      pause.style.color = "green";
    } else {
      timeLeft = workTime;
      isPaused = true;
      travail.style.color = "green";
      pause.style.color = "black";
    }
  } else {
    elem.innerHTML = `${minutes}:${secondes}`;
    timeLeft--;
  }
}

tempsTimerTravail.addEventListener('input', () => {
  let newWorkDuration = parseInt(tempsTimerTravail.value, 10) * 60; // Convertit en secondes

  workTime = newWorkDuration;
  timeLeft = newWorkDuration;
  isPaused = true;
  temps = newWorkDuration / 60;
  if (temps / 10 >= 1) {
    temps = temps;
  } else {
    temps = '0' + temps;
  }
  // Réinitialise l'affichage
  elem.innerHTML = `${temps}:00`;
  localStorage.setItem('workDuration', workTime);
});

tempsTimerPause.addEventListener('input', () => {
  let newPauseDuration = parseInt(tempsTimerPause.value, 10) * 60;
  timePause = newPauseDuration;
  timeMinutePause = newPauseDuration / 60;
  localStorage.setItem('pauseDuration', timePause);
  pause3.innerText = timeMinutePause + ' minutes';
});



window.addEventListener("load", () => {
  let storedWorkDuration = localStorage.getItem("workDuration");
  workTime = storedWorkDuration;
  let storedPauseDuration = localStorage.getItem('pauseDuration');
  if (storedWorkDuration && storedPauseDuration) {
    workTime = parseInt(storedWorkDuration, 10);
    timePause = parseInt(storedPauseDuration, 10);

    // Met à jour l'affichage ou les variables appropriées ici
    temps = workTime / 60; // Met à jour la variable 'temps' en minutes

    // Met à jour l'affichage du formulaire avec les valeurs récupérées
    tempsTimerTravail.value = temps;
    tempsTimerPause.value = timePause / 60;

    // Met à jour l'affichage du timer (par exemple, si le timer est actuellement visible)
    if (temps / 10 >= 1) {
      temps = temps;
    } else {
      temps = '0' + temps;
    }

    elem.innerHTML = `${temps}:00`;
  }
})
boutonReset.addEventListener("click", () => {
  location.reload();
});