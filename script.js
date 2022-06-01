const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

//  Unsplash API
const count = 10;
const apiKey = "1U45I4f3mqg5ixMZmZS2QHQDC_VNOtCy3o6ypjBlMr0";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//  Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, add to DOM
function displayPhotos() {
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

// On load
getPhotos();