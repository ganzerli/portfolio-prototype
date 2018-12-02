
document.addEventListener("DOMContentLoaded", (event)=> {
// moove the position of the words in the direction wanted.
	const elements = document.querySelectorAll('.welcome-text');
	const welcomeContainer = document.querySelector('.welcome-container');

	function delayLoadingPage(){
	setTimeout(()=>{
		welcomeContainer.style.display='none';
		welcomeContainer.style.width='';
		welcomeContainer.style.height='';
		welcomeContainer.style.margin='-3000px 0 0 0'
	},2000);

	type(elements[0],160);
	type2(elements[1],160);
	}

	//giving to delayLoadingPage a sense to be 
	setTimeout(delayLoadingPage,10);

});



	let counter= 0;
	let text = "";
	let counter2= 0;
	let text2 = "";

function type(element,timems){
	if (counter < 1){
		text = element.innerHTML;
		element.innerHTML = "";
	}
	if(counter < text.length){
		console.log(counter, element.innerHTML);
		element.innerHTML+= text.charAt(counter);
		counter++;
		setTimeout(type, timems, element, timems);
	}else{
		return;
	}
	return;
}

function type2(element,timems){
	if (counter2 < 1){
		text2 = element.innerHTML;
		element.innerHTML = "";
	}
	if(counter2 < text2.length){
		console.log(counter2, element.innerHTML);
		element.innerHTML+= text2.charAt(counter2);
		counter2++;
		setTimeout(type2, timems, element, timems);
	}else{
		return;
	}
	return;
}