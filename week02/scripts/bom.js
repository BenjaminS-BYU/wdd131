const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");


button.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    const deleteButton = document.createElement("button");

    li.textContent = text;
    deleteButton.textContent = "X";

    li.append(deleteButton);
    list.append(li);


    deleteButton.addEventListener('click', () => {
        li.remove();
});

    input.value = "";
    input.focus();
});



input.focus();
