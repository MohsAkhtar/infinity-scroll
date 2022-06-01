const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//  Unsplash API
let count = 5;
const apiKey = "1U45I4f3mqg5ixMZmZS2QHQDC_VNOtCy3o6ypjBlMr0";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//  Check if all images were loaded
function imageLoaded() {
    console.log("image loaded");
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready = ", ready);
        count = 30;
    }
}

//  Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, add to DOM
function displayPhotos() {
    totalImages += photosArray.length;
    console.log("totalImages", totalImages);
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        })
        
        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // Event Listener, check when each is finished loading
        img.addEventListener("load", imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }
})

// On load
getPhotos();