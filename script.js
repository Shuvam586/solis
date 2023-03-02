alignDivs = () => {
    lmao = (800 - window.innerHeight) / 4;
    imageDivs = document.getElementsByClassName('bg-image');

    if (window.innerHeight < 800) {
        for (let i = 0; i < imageDivs.length; i++) {

            imageDivs[i].style.transform = 'translateY(-' + String(lmao) + 'px)';
        }
    }

    bottomJinish = document.querySelector('.pack-2');
    bottomJinish.style.bottom = String((window.innerHeight - 600) / 2 + 10) + 'px';

    thoughtJinish = document.querySelector('.pack-3');
    thoughtJinish.style.paddingTop = String((300 - thoughtJinish.offsetHeight) / 2) + 'px';

    authorJinish = document.querySelector('.pack-4');
    authorJinish.style.bottom = String((window.innerHeight - 550) / 2 + 10) + 'px';

    footerJinish = document.querySelector('.footer');
    footerJinish.style.bottom = String((window.innerHeight - 550) / 2 + 10) + 'px';
}

updateTime = () => {
    var d = new Date();
    days = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" }
    months = { 0: "Jan", 1: "Feb", 2: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }
    numbers = { 0: "00", 1: "01", 2: "02", 3: "03", 4: "04", 5: "05", 6: "06", 7: "07", 8: "08", 9: "09", 10: "10", 11: "11", 12: "12", 13: "13", 14: "14", 15: "15", 16: "16", 17: "17", 18: "18", 19: "19", 20: "20", 21: "21", 22: "22", 23: "23", 24: "24", 25: "25", 26: "26", 27: "27", 28: "28", 29: "29", 30: "30", 31: "31", 32: "32", 33: "33", 34: "34", 35: "35", 36: "36", 37: "37", 38: "38", 39: "39", 40: "40", 41: "41", 42: "42", 43: "43", 44: "44", 45: "45", 46: "46", 47: "47", 48: "48", 49: "49", 50: "50", 51: "51", 52: "52", 53: "53", 54: "54", 55: "55", 56: "56", 57: "57", 58: "58", 59: "59" }

    dayInfo = document.querySelector(".day-info");
    timeInfo = document.querySelector(".time-info");

    timeInfo.innerText = `${numbers[d.getHours()]}:${numbers[d.getMinutes()]}`;
    dayInfo.innerText = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

puttingInfo = () => {

    openWeatherKey = "cc46fd7fb64a54521d5fdb91ba060264";
    openWeatherKey2 = "c5fdebb786aa4c1218a28a1c7395df26";
    var city = "Kolkata"
    var lat = 22.5726;
    var lon = 88.3639;
    weatherDes = document.querySelector('.pack-2-weather');
    actualTemp = document.querySelector('.actual-temp');
    weatherText = document.querySelector('.a-5-text');

    // getting location 
    url1 = "http://worldtimeapi.org/api/ip";
    fetch(`${url1}`).then(response => {
        return response.json();
    }).then(data => {
        city = data.timezone.split("/")[1];
    })

    url2 = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherKey}`;
    fetch(`${url2}`).then(response => {
        return response.json();
    }).then(data => {
        lat = data[0].lat;
        lon = data[0].lon;
    })


    const optionas = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'edad73df64msh41d1a22add27a66p166a78jsn6f3b61ba2379',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${lat}&lon=${lon}`, optionas)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            humidText = ""
            if (data.humidity > 90) {
                humidText = "It's <b>really humid</b> here"
            } else if (data.humidity > 70) {
                humidText = "It's <b>humid</b> here"
            } else if (data.humidity > 50) {
                humidText = "It's <b>somewhat fresh</b> here"
            } else if (data.humidity > 30) {
                humidText = "It's <b>a bit dry</b> here"
            } else {
                humidText = "It's <b>really dry</b> here"
            }

            feelsLikeText = `Feels like <b>${data.feels_like}</b>°C.`

            weatherText.innerHTML = `${humidText}. ${feelsLikeText}`
            weatherDes.innerHTML = `It's about <b>${data.temp}°C</b> here`
            actualTemp.innerText = String(data.temp)
        })
        .catch(err => console.error(err));
}

showerThoughts = () => {
    thoughtDiv = document.querySelector('.pack-3-thought')
    authorDiv = document.querySelector('.pack-4-thought-author')
    authorLink = document.querySelector('.author-link')

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'edad73df64msh41d1a22add27a66p166a78jsn6f3b61ba2379',
            'X-RapidAPI-Host': 'stapi-showerthoughts.p.rapidapi.com'
        }
    };

    fetch('https://stapi-showerthoughts.p.rapidapi.com/api/v1/stapi/top', options)
        .then(response => response.json())
        .then(data => {
            console.log('shower thought are working')
            thoughtDiv.innerText = data.data[0].showerthought;
            authorDiv.innerText = data.data[0].user;
            authorLink.href = `https://www.reddit.com/user/${data.data[0].user.slice(2)}`
        }).catch(err => console.error(err));
}

alignDivs();
puttingInfo();
showerThoughts();

setInterval(updateTime, 900)