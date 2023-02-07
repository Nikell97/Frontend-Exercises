// Find the elements.
let form = document.querySelector('form');
let list = document.querySelector('#cities');

form.onsubmit = async event => {
    // Prevent the default "reload page" behavior.
    event.preventDefault();

    // Get the values entered by the user.
    let cityName = form.city.value;
    let latitude = form.latitude.value;
    let longitude = form.longitude.value;

    //                 hostname              /path            ?query
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=1a4693f7c32167ab6bd3bde2e289dab0'
    let response = await fetch(url);
    let json = await response.json();

    // Create a list item and set its text content to the city name.
    let listItem = document.createElement('li');
    listItem.textContent = cityName + ': ' + json.current.temp + ' °C';
    // Add the list item to the list.
    list.append(listItem);

    // Clear the inputs.
    form.city.value = '';
    form.latitude.value = '';
    form.longitude.value = '';
};