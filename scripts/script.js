let dureeTravailStockee = localStorage.getItem("workDuration");
let dureePauseStockee = localStorage.getItem("pauseDuration");
let tempsDeTravail = 1500;
tempsDeTravail = dureeTravailStockee;
let tempsRestant = tempsDeTravail;
let tempsDePause = 300;
tempsDePause = dureePauseStockee;
let enPause = true;
let temps = tempsDeTravail / 60;
let tempsEnMinutePause = tempsDePause / 60;

let travail = document.getElementById("travail");
let pause = document.getElementById("pause");
let chrono = document.getElementById("chrono");
let boutonDepart = document.getElementById("debut");
let boutonReset = document.getElementById("reset");
let tempsTimerTravail = document.getElementById('tempsTimerTravail');
let tempsTimerPause = document.getElementById('tempsTimerPause');
let tempsPause = document.getElementById('tempsPause');
let tempsTravail = document.getElementById('tempsTravail');
let tempsPauseAffichage = document.getElementById('tempsPauseAffichage');
let minutes = parseInt(tempsRestant / 60, 10);
let secondes = parseInt(tempsRestant % 60, 10);

tempsTimerPause.style.value = `${tempsDePause}`;
boutonReset.style.display = "none";
minutes = minutes < 10 ? "0" + minutes : minutes;
secondes = secondes < 10 ? "0" + secondes : secondes;
chrono.innerHTML = `${minutes}:${secondes}`;
tempsPauseAffichage.innerText = tempsEnMinutePause + ' minutes';

boutonDepart.addEventListener("click", () => {
  boutonDepart.style.display = "none";
  boutonReset.style.display = "inline-block";
  travail.style.color = "green";
  let timerId = setInterval(countdown, 1000);
  tempsPause.style.display = "none";
  tempsTravail.style.display = "none";
});

// Permet de maintenir l'interval et de faire des boucles de temps (25min / 5min de base)
function countdown() {
  let minutes = parseInt(tempsRestant / 60, 10);
  let secondes = parseInt(tempsRestant % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  secondes = secondes < 10 ? "0" + secondes : secondes;
  if (tempsRestant <= -1) {
    if (enPause == true) { // Si pause 
      enPause = false;
      tempsRestant = tempsDePause; // cela rajoute le temps de la pause (5 min de base) à l'interval
      travail.style.color = "black";
      pause.style.color = "green";
    } else {
      tempsRestant = tempsDeTravail; // Rajoute le temps de traavil à l'interval
      enPause = true;
      travail.style.color = "green";
      pause.style.color = "black";
    }
  } else {
    chrono.innerHTML = `${minutes}:${secondes}`;
    tempsRestant--;
  }
}

// Permet de modifier le temps de travail
tempsTimerTravail.addEventListener('input', () => {
  let nouvelleDureeTravail = parseInt(tempsTimerTravail.value, 10) * 60; // Convertit en secondes

  tempsDeTravail = nouvelleDureeTravail;
  tempsRestant = nouvelleDureeTravail;
  enPause = true;
  temps = nouvelleDureeTravail / 60;
  if (temps / 10 >= 1) {
    temps = temps;
  } else {
    temps = '0' + temps;
  }
  // Réinitialise l'affichage
  chrono.innerHTML = `${temps}:00`;
  localStorage.setItem('workDuration', tempsDeTravail);
});
// Permet de modifier le temps de pause 
tempsTimerPause.addEventListener('input', () => {
  let nouvelleDureePause = parseInt(tempsTimerPause.value, 10) * 60;
  tempsDePause = nouvelleDureePause;
  tempsEnMinutePause = nouvelleDureePause / 60;
  tempsPauseAffichage.innerText = tempsEnMinutePause + ' minutes';
  localStorage.setItem('pauseDuration', tempsDePause);
});

// Permet de sauvegarder les choix faits avec une réiniatilisation
window.addEventListener("load", () => {
  let dureeTravailStockee = localStorage.getItem("workDuration"); 
  tempsDeTravail = dureeTravailStockee;
  let dureePauseStockee = localStorage.getItem('pauseDuration');
  if (dureeTravailStockee && dureePauseStockee) {
    tempsDeTravail = parseInt(dureeTravailStockee, 10);
    tempsDePause = parseInt(dureePauseStockee, 10);

    temps = tempsDeTravail / 60; 

    tempsTimerTravail.value = temps;
    tempsTimerPause.value = tempsEnMinutePause / 60;
    console.log(tempsEnMinutePause);

    if (temps / 10 >= 1) {
      temps = temps;
    } else {
      temps = '0' + temps;
    }

    chrono.innerHTML = `${temps}:00`;
  }
})
// Relance la page afin de réiniatiliser le timer
boutonReset.addEventListener("click", () => {
  location.reload();
});