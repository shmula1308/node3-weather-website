const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  const messageOne = document.querySelector("#message-1");
  const messageTwo = document.querySelector("#message-2");

  messageOne.textContent = "Location...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((result) => {
      if (result.error) {
        console.log(result.error);
        messageOne.textContent = result.error;
      } else {
        console.log(result.location, result.forecast);
        messageOne.textContent = result.location;
        messageTwo.textContent = result.forecast;
      }
    });
  });

  weatherForm.reset();
});
