//  Unsplash API
const count = 10;
const apiKey = "n3c8c-ob6FKmkZprbe5JuVH7lMaxGc5kPaMgiT6NGqM";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// On load
getPhotos();