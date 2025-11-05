const year = new Date().getFullYear();
document.querySelector("#copyright").innerHTML =
  `© ${year} | Benjamin Strong | Canada`;
document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

const nav = document.querySelector(".navigation");
const btn = document.querySelector("#menu");

btn.addEventListener("click", () => {
    nav.classList.toggle("show");
    btn.classList.toggle("show-x");
})
