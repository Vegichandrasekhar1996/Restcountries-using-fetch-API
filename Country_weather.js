
var countries;
fetch('https://restcountries.eu/rest/v2/all')
.then(Response => {
    return Response.json()
}).then (function(data) {
    countries = data;
    var country_cards =  document.getElementById('country_card');
    countries.forEach(obj => {
        var col = createCountryCards('div','row col-lg-4 col-sm-12 mt-5 ml-2')
        var card = createCountryCards('div', 'card')
        var cardhead = createCountryCards('h5','card-header')
        cardhead.innerHTML = obj.name
        var anchortag = createCountryCards('a')
        anchortag.setAttribute('href',obj.image)

        var cardbody = createCountryCards('div','card-body')

        var img = createCountryCards('img','card-img mb-3','flag')
        img.setAttribute('src',obj.flag)
        anchortag.append(img)
        

        var h6 = createCountryCards('h6')
        h6.textContent = 'Capital : '+obj.capital

        var h6_2 = createCountryCards('h6')
        h6_2.textContent = 'Region : '+obj.region

        var h6_3 = createCountryCards('h6')
        h6_3.textContent = 'Country Code :'+obj.alpha3Code

        var button = createbuttonclick()
        button.textContent = 'Click For weather' 
        
        cardbody.append(img,h6,h6_2,h6_3,button)

        card.append(cardhead,cardbody)

        col.append(card)

        country_cards.append(col)
        function createbuttonclick(){                    
        var element = document.createElement('button');
                element.setAttribute("class","btn btn-primary");                    
                element.onclick = function(){
                    let country_name = obj.name
                    let latlong_values =  obj.latlng
                    let latval = latlong_values[0]
                    let longval = latlong_values[1]
                    base_url = 'https://api.openweathermap.org/data/2.5/weather?'
                    complete_url = base_url+"lat="+latval+"&lon="+longval+"&units=metric&appid=8103f92a3523e20edce042878c28f22a"
                    fetch(complete_url)
                    .then(Response => {
                    return Response.json()
                    }).then (function(data) {
                        alert ("Country: "+country_name+"\n"+"weather Description: "+data.weather[0].description+"\n"+"Tempearture is "+data.main.temp+" °C"+"\n"+"Humidity is "+data.main.humidity+" %");
                    })
                    .catch((err) => {
                        console.log(err);
                        });                        
                }                     
                return element                  
            }                           
    })              
function createCountryCards(eleName, eleClass= "", eleId=""){
    var element = document.createElement(eleName);
            element.setAttribute("class",eleClass);
            element.setAttribute("id",eleId);
            return element                    
        }                                                
    })
.catch((err) => {
    console.log(err);
    });