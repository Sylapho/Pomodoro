const departMinutes = 25;
let temps = departMinutes * 60


let boutonDepart = document.getElementById('debut');
let boutonReset = document.getElementById('reset');

boutonReset.style.display = 'none';

const chronoElement = document.getElementById('chrono');

boutonDepart.addEventListener('click', ()=>{
    document.getElementById('debut').style.display = 'none'
    boutonReset.style.display = 'block'
    setInterval(() => {
        let minutes = parseInt(temps / 60, 10);
        let secondes = parseInt(temps % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        secondes = secondes < 10 ? "0" + secondes : secondes;
      
        chronoElement.innerText = `${minutes}:${secondes}`;
        temps = temps <= 0 ? 0 : temps - 1;
      }, 1000);
})

boutonReset.addEventListener('click', ()=>{
    location.reload();
});
