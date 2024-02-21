let getImageArray = localStorage.getItem("favorites");
let storedImageArray = JSON.parse(getImageArray) || [];

const fav_display = document.getElementById("diaplay_images");

// showing favourites images on screen
function disFavImg(data) {
  fav_display.innerHTML = "";
  data.map((i) => {
    const node = document.createElement("div");
    node.classList.add("image_contain_div");
    const element = `
        <img id=${i.id} class='pic' src=${i.urls.small} />
        <button id=${i.id} class='removeImg'>Remove</button>
        `;
    node.innerHTML = element;
    fav_display.appendChild(node);
  });
}

if (storedImageArray.length > 0) {
  disFavImg(storedImageArray);
}

fav_display.addEventListener("click", (e) => {
  if (e.target.className === "removeImg") {
    storedImageArray = JSON.parse(localStorage.getItem("favorites"));
    let filterImages = storedImageArray.filter(
      (image) => image.id !== e.target.id
    );
    localStorage.setItem("favorites", JSON.stringify(filterImages));
    disFavImg(filterImages);
  }
});
