var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=lf35C66EkenQ-tKMtSPMv7nZ1I9tE1pC6GFP9O0BUR0";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
    var x = new XMLHttpRequest();
    x.open("GET", corsApiUrl + options.url);
    x.send(options.data);
    return x;
};

var urlTxt = "https://trefle.io/api/v1/plants" + apiToken

const addParameters = (parameters) => {
    window.urlTxt = `${urlTxt}&${parameters}`
}

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
    new Promise((resolve, reject) => {
        const request = doCORSRequest({
            url: window.urlTxt,
        });
        resolve(request);
    });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
    (request) =>
    (request.onload = request.onerror = function() {
        // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
        handleResponse(request.response)
    })
);

const searchBar = document.getElementById("search-plant");
document.getElementById("search-plant-btn").addEventListener("click", function(event) {
    console.log("search for " + searchBar.value)
    addParameters(`q=${searchBar.value}`)
    corsPromise()
});

document.getElementById("list-plants-btn").addEventListener("onclick", function(event) {
    console.log("get the list of plants")
    corsPromise()
});

document.getElementById("remove-list-plants-btn").addEventListener("click", function(event) {
    console.log("empty the list")
    document.getElementById("response").textContent = "";
});

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////

const handleResponse = (response) => {
    console.log(urlTxt)

    if (!response.ok) {
        document.getElementById("response").textContent = "Error on getting the result";
    }
    console.log(response)
    const data = JSON.parse(response).data
    console.log(data)
    document.getElementById("response").textContent = JSON.stringify(data, undefined, 2);
};