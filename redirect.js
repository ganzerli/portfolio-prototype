


document.addEventListener("DOMContentLoaded", function(event) {

		function myFunction(el) {
			// the parameter is the id name
			const idName = el;
						//alert("the selected element id is "+ idName);
			// take the wanted attribute of the element
			let attribute = document.getElementById(idName).getAttribute("attrbref");
			//getting current path
			let myString = window.location.pathname;
			//taking the last "index.html"  away from the path
			var newString = myString.substr(0, myString.length-10);
			// making a new path name according to the ATTRIBUTE
			const myLocation = newString + attribute;
			//adding class for the animation
			document.getElementById(idName).parentElement.parentElement.classList.add("cover-screen");
			//redirecting..
			setTimeout(()=>location.replace(myLocation) ,700);
			document.getElementById(idName).classList.add("cover-screen");

		}
  });




