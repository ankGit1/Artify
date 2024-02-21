import { fetchImages, getStoreData } from "../unsplashApi/unsplash";

const spans = document.querySelectorAll(".a_tags span");
const display = document.querySelector("#display");
const displayDiv = document.getElementById("diaplay_images");
const toggleBtn = document.getElementById("toggleBtn");
const toggleDiv = document.getElementById("toggle");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const popup = document.querySelector("#popup");
const cutBtn = document.querySelector("#cutBtn");

let data = []; //storing array of images
let toggle = false;
let index = 0;
let favourite_images = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetchImages("Art"); //fetching data from unsplash
  data = getStoreData(); // storing that data
});

// showing images of different categories when click on any category
const showImages = async (e) => {
  // console.log(e.target.getAttribute("name"));
  await fetchImages(e.target.getAttribute("name"));
  data = getStoreData();
};

spans.forEach((span) => {
  span.addEventListener("click", showImages);
});

// creating dynamic div element to show image details
const displayImage = async (e) => {
  const desiredImage = data.find((img) => img.id === e.target.id);
  index = data.findIndex((image) => image.id === desiredImage.id);
  if (index >= 0) {
    const divToRemove = document.querySelector(".popup_main");
    if (divToRemove) {
      popup.removeChild(divToRemove); // removing the image details from popup so that to add new details
    }
  }
  const details = `
  <div class="popup_main">
          <div class="flex_popup">
            <img
              src=${desiredImage.urls.small}
            />
            <div class="flex_info">
              <span><b>Title - </b></span>
              <p>${desiredImage.alt_description}</p>
              <span><b>Description -</b></span>
              <p>${desiredImage.description}</p>
              <div class='extra_info'>
              <div>
              <span><b>Likes -</b></span>
              <p>${desiredImage.likes}</p>
              </div>
              <div>
              <span><b>Color -</b></span>
              <p>${desiredImage.color}</p>
              </div>
              <div>
              <span><b>Tags -</b></span>
              <p># ${desiredImage.tags[0].title}</p>
              </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="user_info">
            <div>
              <img
                src=${desiredImage.user.profile_image.small}
                alt=""
              />
              <span><b>${desiredImage.user.name}</b></span>
            </div>
            <p>Location - ${desiredImage.user.location}</p>
            <p><a href=${desiredImage.user.social.portfolio_url}>Instagram</a> - ${desiredImage.user.instagram_username}</p>
            <p>Follow || Donate</p>
          </div>
        </div>
  `;
  popup.insertAdjacentHTML("beforeend", details);
  popup.style.display = "flex";
};

// checking which event get trigger
displayDiv.addEventListener("click", async (e) => {
  if (e.target.className === "pic") {
    displayImage(e);
  }
  if (e.target.className === "favouriteBtn") {
    const getImageArr = JSON.parse(localStorage.getItem("favorites")) || [];
    favourite_images = getImageArr;

    // checking if same is adding to favourite
    const checkImg = await getImageArr.find(
      (image) => image.id === e.target.id
    );

    if (!checkImg) {
      const saveImage = data.find((img) => img.id === e.target.id);
      favourite_images.push(saveImage);
      localStorage.setItem("favorites", JSON.stringify(favourite_images));
    }
  }
});

// removing the image details popup
cutBtn.addEventListener("click", () => {
  const divToRemove = document.querySelector(".popup_main");
  if (divToRemove) {
    popup.removeChild(divToRemove);
  }
  popup.style.display = "none";
});

toggleBtn.addEventListener("click", () => {
  if (toggle === false) {
    toggleDiv.style.display = "flex";
    toggle = true;
  } else {
    toggleDiv.style.display = "none";
    toggle = false;
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    const prevImg = data[index - 1];
    displayImage({ target: prevImg });
  }
});

nextBtn.addEventListener("click", () => {
  if (index < data.length) {
    const nextImg = data[index + 1];
    displayImage({ target: nextImg });
  }
});
