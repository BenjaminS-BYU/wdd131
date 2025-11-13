const temp = 8; // °C
const wind = 10; // km/h

function calculateWindChill(t, s) {
  return 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);
}

function displayWindChill() {
  const chillElement = document.querySelector('#windchill');
  if (temp <= 10 && wind > 4.8) {
    chillElement.textContent = `${calculateWindChill(temp, wind).toFixed(1)} °C`;
  } else {
    chillElement.textContent = "N/A";
  }
}

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

displayWindChill();
