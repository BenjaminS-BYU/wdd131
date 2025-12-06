const year = new Date().getFullYear();
document.querySelector("#copyright").innerHTML =
  `© ${year} | Benjamin Strong | Canada`;
document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

const nav = document.querySelector(".navigation");
const btn = document.querySelector("#menu");

btn.addEventListener("click", () => {
    nav.classList.toggle("show");
    btn.textContent = btn.textContent === "≡" ? "X" : "≡";
});

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Cardston Alberta",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923, August, 26",
    area: 88562,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/cardston-alberta-temple/cardston-alberta-temple-13287-main.jpg"
  },
  {
    templeName: "Lethbridge Alberta",
    location: "Lethbridge, Alberta, Canada",
    dedicated: "2025, April, 26",
    area: 45000,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/lethbridge-alberta-temple/lethbridge-alberta-temple-48270-main.jpg"
  },
  {
    templeName: "Calgary Alberta",
    location: "Calgary, Alberta, Canada",
    dedicated: "2012, October, 28",
    area: 33000,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/calgary-alberta-temple/calgary-alberta-temple-13199-main.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Edmonton Alberta",
    location: "Edmonton, Alberta, Canada",
    dedicated: "1999, April, 25",
    area: 10700,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/edmonton-alberta-temple/edmonton-alberta-temple-51155-main.jpg"
  },
];

createTempleCards(temples);

function filterTemplesByArea(minArea) {
  return temples.filter(temple => temple.area >= minArea);
}

function filterTemplesByLocation(keyword) {
  return temples.filter(temple =>
    temple.location.toLowerCase().includes(keyword.toLowerCase())
  );
}

function clearTempleCards() {
  const gallery = document.querySelector(".gallery");
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}



function createTempleCards(temples) {
  temples.forEach(temple => {
    let card = document.createElement("section");
    let name = document.createElement("h2");
    let location = document.createElement("p");
    let dedicated = document.createElement("p");
    let area = document.createElement("p");
    let image = document.createElement("img");

    name.textContent = temple.templeName;
    location.textContent = `Location: ${temple.location}`;
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;
    image.setAttribute("src", temple.imageUrl);
    image.setAttribute("alt", `Image of the ${temple.templeName} Temple`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "400");
    image.setAttribute("height", "250");
    

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);

    document.querySelector(".gallery").appendChild(card);
  });
}

function getDedicatedYear(dedicatedStr) {
  if (!dedicatedStr) return NaN;
  const yearMatch = dedicatedStr.match(/^\s*(\d{3,4})/);
  return yearMatch ? parseInt(yearMatch[1], 10) : NaN;
}

function handleFilter(key) {
  let filtered = temples;
  let title = "Home";
  switch ((key || "").toString().toLowerCase()) {
    case "old":
      filtered = temples.filter(t => getDedicatedYear(t.dedicated) < 2000);
      title = "Old Temples";
      break;
    case "new":
      filtered = temples.filter(t => getDedicatedYear(t.dedicated) > 2000);
      title = "New Temples";
      break;
    case "large":
      filtered = temples.filter(t => t.area > 90000);
      title = "Large Temples";
      break;
    case "small":
      filtered = temples.filter(t => t.area < 10000);
      title = "Small Temples";
      break;
    case "alberta":
      filtered = filterTemplesByLocation("Alberta");
      title = "Alberta Temples";
      break;
    case "home":
      filtered = temples;
      title = "Home";
      break;
    default:
      filtered = temples;
      break;
  }
  const heading = document.querySelector(".filter-name");
  heading.textContent = title;
  clearTempleCards();
  createTempleCards(filtered);
}

// Attach listeners to navigation links
const navLinks = document.querySelectorAll('.navigation li a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const text = link.textContent.trim();
    handleFilter(text);
    // close mobile nav if open
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
      btn.textContent = '≡';
    }
  });
});

// Attach to select dropdown if present
const selectFilter = document.querySelector('#filter');
if (selectFilter) {
  selectFilter.addEventListener('change', () => {
    handleFilter(selectFilter.value);
  });
}
