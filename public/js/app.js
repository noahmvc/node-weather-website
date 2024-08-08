//console.log("client side js file is loaded");

//Search button logic
const weatherForm = document.querySelector("form");

const search = document.querySelector("input");

const msg1 = document.querySelector("#msg-1");

const msg2 = document.querySelector("#msg-2");

//msg1.textContent = "from js";
//Add event listener on it
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //from refreshing so we can let it run

  const location = search.value;

  msg1.textContent = "Loading...";
  msg2.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON from the response
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("There was a problem with the fetch operation:", error);
    });
});
