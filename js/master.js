(function () {
  // select the cars from the DOM (the web page) using the data-ref class. this creates a list of elements; it's like an array, so we can loop through them and do things like add event listeners and change classes one at a time with a forEach method (method is just another word for function)

  // constants are exactly what the word means - something that doesn't change. You can't change or redefine a constant once it's declared, so they're good for things that are meant to be constant throughout the runtime of an app
  const carButtons = document.querySelectorAll('.data-ref');

  // the XMLHttpRequest object is a built-in part of every browser's JavaScript API. It has methods (functions) and propeties that you can run to do an AJAX request. Declaring it with round brackets at the end instantiates (creates) a new instance of the object.
  const httpRequest = new XMLHttpRequest();

  // the getCarData function fires every time you click on a car thumbnail; it passes itself into the function (the 'this' keyword referes to the object that called the function => the element clicked on) so that we can use that element's ID attribute as a reference to pass to the query we want to run. We're retrieving a single row from the database where the ID that we pass matches the field we've referenced in the query (in the functions.php file)
  function getCarData() {
    // make an AJAX call to the database; handle errors first
    if (!httpRequest) { // this is for older browser that don't support AJAX
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false; // exit the whole process and don't do anything else - we're done
    }

    // there are 4 stages to an AJAX request: the init, sending the url, getting the response, and done. every time that state changes (the readystate) we fire the processRequest function to catch errors or do something with the data that gets returned from the database when the request is finished
    httpRequest.onreadystatechange = processRequest;
    httpRequest.open('GET', './includes/functions.php?carModel=' + this.id); // pass in the id from the element we're clicking on
    httpRequest.send(); // run the PHP file (or whatever is in the .open method above)
  }

  // httpRequest.onreadystatechange (on line 19) will call this 4 times. We process / monitor the status of the AJAX call. When it's done (lines 29 and 30) that means our call was successful and we have some data returned from the database to process
  function processRequest() {
    let reqIndicator = document.querySelector('.request-state');
    reqIndicator.textContent = httpRequest.readyState;

    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) { // 200 means everything is awesome
        //debugger;
        // JSON.parse turns the stingified database response (the database row) into a plain object that JavaScript can use
        let data = JSON.parse(httpRequest.responseText);

        // send our object through to the function that will do the page update - plug in the text, change the css opacity, etc
        processResult(data);
      } else {
        // if anything went wrong with the AJAX call, this will be called instead and we'll be done => need to fix any errors
        alert('There was a problem with the request.');
      }
    }
  }

  // processResult is run when the AJAX call is complete and we have the data back. It gets called on line 36, and the data variable gets passed in from that function (it's the JavaScript object we got from the database)
  function processResult(data) {
    // destructure the data and extract only what we need
    // the data is coming in as an object - it's 'structured' data. We can reach into it and pull out just the values we need by using a destructuring assignment
    const { modelName, pricing, modelDetails } = data;

    // this is statement chaining - we can select an element and change its content all at once, instead of doing it in multiple steps
    let model = document.querySelector('.modelName').textContent = modelName;
    let price = document.querySelector('.priceInfo').innerHTML = pricing;
    let desc = document.querySelector('.modelDetails').textContent = modelDetails;

    // loop through all the car thumbnails again and add a nonActive class to them to fade them out. a forEach function uses the collection we set up in our variable declaration at the top on line 5, and passes each element in one at a time (that's what the car in the round brackets is). It also tracks what iteration of the loop it's on with the index variable (0, 1, 2 etc), which we're not using in the function.
    carButtons.forEach(function(car, index) {
      car.classList.add('nonActive');
    });

    //this.classList.remove('nonActive');
    // the "this" keyword won't work any more because we're out of scope (we'll get into scope and what it means in the winter term). we need to select the current element another way - the model field is part of the dataset we got back from the database, and it's also the ID of the current model (they match) so we can use that to select the element on the page using a JavaScript template string
    //
    // template strings are new in ES6; among other things, they let you dig in to data and pull out values, create HTML blobs in JavaScript files, and generally make life a lot easier for JS developers who have had to write hacky ways to do things like this
    document.querySelector(`#${data.model}`).classList.remove('nonActive');
  }

  // loop through and add event handling to each car thumbnail on the page. on a click, they'll fire the AJAX call at the top of the script file.
  carButtons.forEach(function(car, index) {
    car.addEventListener('click', getCarData, false);
  });

})();
