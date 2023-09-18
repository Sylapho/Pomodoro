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
let minutes = parseInt(timeLeft /60,10);
let secondes = parseInt(timeLeft % 60, 10);

boutonReset.style.display = 'none';

elem.innerHTML = '25:00';

button.addEventListener('click', ()=>{
    document.getElementById('debut').style.display = 'none';
    boutonReset.style.display = 'block'
    travail.style.color = 'red';
    let timerId = setInterval(countdown, 1000);
});

function countdown() {
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;
    if(timeLeft <= -1){
        elem.innerHTML = 0 + ' seconds remaining';
        if(isPaused == true){
            isPaused = false;
            timeLeft = timePause;
            travail.style.color = 'black';
            pause.style.color = 'red';

        } else {
            timeLeft = workTime;
            isPaused = true;
            travail.style.color = 'red';
            pause.style.color = 'black';
        }
        
    } else {
        elem.innerHTML = `${minutes}:${secondes}`;
        timeLeft--;
        console.log(minutes);
        console.log(secondes); 
    }
}

boutonReset.addEventListener('click', ()=>{
    location.reload();
});


