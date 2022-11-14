// console.log('deneme');
// fetch('http://localhost:3000/weather?address=malatya').then(response => {
//     response.json().then(data => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data);
//         }
//     }).catch(error => {
//         console.log(error);
//     })
// })

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');
const errorMessage = document.getElementById('error-message');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = search.value;
    const url = "/weather?address="+address;
    console.log(url);
    messageOne.textContent = 'Loading ....';
    fetch(url)
    .then(response => {
            response.json().then(data => {
                if(data.error){
                   errorMessage.textContent  = data.error;
                }else{
                    let text = document.createElement("p");
                    messageOne.textContent = data.forecast;
                    messageTwo.textContent = data.forecastCode + " -  " + data.locat0ion;
                    text.innerHTML=`Wind speed is : ${data.forecastWind}`;
                    document.getElementById('infos').appendChild(text);
                }
            }).catch(error => {
                errorMessage.textContent = error;
            })
        })
        
    
})