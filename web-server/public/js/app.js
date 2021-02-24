const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener("submit", (e) => {
  //e for Event, this is how we'll commonly see this
  e.preventDefault();
  message1.textContent = 'Loading';
  message2.textContent = '';

  const location = search.value; //value will get us the input value

  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        //here we are converting response to a JSON file
        if (data.error) {
          message1.textContent = data.error; //textContent will update the value of the selected element
        } else {
          message1.textContent = data.forecast;
          message2.textContent = data.location;
        }
      });
    }
  );
});
