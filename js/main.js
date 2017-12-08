(function () {
  // start with retrieving the elements from the page, and then adding event handling. then write the logic. refer to the seasons example / homework

  //Variables
   var theModel = document.querySelector('.modelName');
   var thePrice = document.querySelector('.priceInfo');
   var theDesc = document.querySelector('.modelDetails');
   var cars = document.querySelectorAll('.data-ref');
   const httpRequest = new XMLHttpRequest();
	
	function changeElements()
	{
		/*const url = './includes/functions.php?carModel=' + this.id;
		
		fetch(url)
		.then((resp) => resp.json())
		.then((data) => { processResult(data); })
		.catch(function(error))
			{
			 console.log(error);  
			});*/
		//set up the AJAX call => handle errors first
		/*if(!httpRequest)
			{
				alert('giving up, you suck');
				return false;
			}
		httpRequest.onreadystatechange = processRequest;
		httpRequest.open('GET', './includes/functions.php?carModel=' + this.id); //sets up url string so it adds the right element aka car name
		httpRequest.send();*/
	}
	
	
  /*function processRequest() {
    let reqIndicator = document.querySelector('.request-state');
    reqIndicator.textContent = httpRequest.readyState;
	  //debugger;
	  
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) { // 200 means everything is awesome
        //debugger;
        let data = JSON.parse(httpRequest.responseText);

        processCarData(data); //send the data to the function that'll plug 
      } else {
        alert('There was a problem with the request.');
      }
    }
  }*/
	
   //Functions
   function processCarData(data)
   {
	   const {modelName, pricing, modelDetails} = data; //deconstruction assignment
	   
	 let model = document.querySelector('.modelName').textContent = modelName;
	 let price = document.querySelector('.priceInfo').innerHTML = pricing;
	 let desc = document.querySelector('.modelDetails').textContent = modelDetails;
	   
     //let objectIndex = carData[this.id];
      //appliedClass = this.id;

      //theModel.firstChild.nodeValue = objectIndex.model;
    	//theDesc.firstChild.nodeValue = objectIndex.description;
      //thePrice.firstChild.nodeValue = objectIndex.price;

      cars.forEach(function(car, index){
        car.classList.add('nonActive');
      })
      //this.classList.remove('nonActive');
	  document.querySelector(`#${data.model}`).classList.remove('nonActive');
   }



   //Listeners
   cars.forEach(function(car, index){
     car.addEventListener('click', changeElements, false);
   });

})();
