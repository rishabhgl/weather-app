const weatherForm = document.querySelector('form');
const target = document.querySelector('input');
const p1 = document.querySelector('#m1');
const p2 = document.querySelector('#m2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const targetLocation = target.value;
    p1.textContent = "Loading Weather Information...";
    p2.textContent = "";
    fetch('/weather?address=' + targetLocation).then( response => {
    response.json().then( data => {
        if (data.error){
            p1.textContent = data.error;
            p2.textContent = ' ';
        }
        else{
            p1.textContent = data.location;
            p2.textContent = data.forecast;
        }
    })
})
})