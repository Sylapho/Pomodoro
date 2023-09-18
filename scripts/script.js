let workTime = 1500;
let timeLeft = workTime;
let timePause = 300;
let isPaused = true;
let temps = workTime/60;

let travail = document.getElementById('travail');
let pause = document.getElementById('pause');
let elem = document.getElementById('chrono');
let button = document.getElementById('debut');
let boutonReset = document.getElementById('reset');


boutonReset.style.display = 'none';

elem.innerHTML = '25:00';

button.addEventListener('click', ()=>{
    button.style.display = 'none';
    boutonReset.style.display = 'inline-block'
    travail.style.color = 'green';
    let timerId = setInterval(countdown, 1000);
});

function countdown() {
    let minutes = parseInt(timeLeft /60,10);
    let secondes = parseInt(timeLeft % 60, 10);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;
    if(timeLeft <= -1){
        if(isPaused == true){
            isPaused = false;
            timeLeft = timePause;
            travail.style.color = 'white';
            pause.style.color = 'green';

        } else {
            timeLeft = workTime;
            isPaused = true;
            travail.style.color = 'green';
            pause.style.color = 'white';
        }
        
    } else {
        elem.innerHTML = `${minutes}:${secondes}`;
        timeLeft--; 
    }
}

boutonReset.addEventListener('click', ()=>{
    location.reload();
});

// Références aux éléments du formulaire
const timerForm = document.getElementById('timer-form');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
let boutonMettreAJour = document.getElementById('mettreAJour')

// Écouteur d'événement pour le formulaire
timerForm.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    
    // Récupère les valeurs saisies par l'utilisateur
    const newWorkDuration = parseInt(workDurationInput.value, 10) * 60; // Convertit en secondes
    const newBreakDuration = parseInt(breakDurationInput.value, 10) * 60; // Convertit en secondes
    
    // Met à jour les durées de travail et de pause
    workTime = newWorkDuration;
    timeLeft = newWorkDuration;
    timePause = newBreakDuration;
    isPaused = true;
    temps = newWorkDuration / 60;
    temps = temps;
    
    // Réinitialise l'affichage
    elem.innerHTML = `${temps}:00`;
    
    boutonMettreAJour.addEventListener('click', ()=>{
        timerForm.style.display = 'none';
    })
    // Affiche le bouton "Démarrer"
    button.style.display = 'inline-block';
});


boutonReset.addEventListener('click', ()=>{
    location.reload();
});