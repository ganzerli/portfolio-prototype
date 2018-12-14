
document.addEventListener("DOMContentLoaded", (event)=> {
// moove the position of the words in the direction wanted.
	const elements = document.querySelectorAll('.welcome-text');
	const welcomeContainer = document.querySelector('.welcome-container');

	function delayLoadingPage(){
	setTimeout(()=>{
		welcomeContainer.style.display='none';
		welcomeContainer.style.width='0';
		welcomeContainer.style.height='0';
		welcomeContainer.style.margin='-3000px 0 0 0'
	},2200);

	type(elements[0],180);
	type2(elements[1],180);
		
	}
		if(elements && welcomeContainer){
			//giving to delayLoadingPage a sense to be 
			setTimeout(delayLoadingPage,10);
		}

});


	const mainText ="WELCOME";
	let counter= 0;
	let text = "";
	let counter2= 0;
	let text2 = "";

function type(element,timems){
	if (counter < 1){
		element.innerHTML = "";
	}
	if(counter < mainText.length){
		element.innerHTML+= mainText.charAt(counter);
		counter++;
		setTimeout(type, timems, element, timems);
	}else{
		return;
	}
	return;
}

function type2(element,timems){
	if (counter2 < 1){
		element.innerHTML = "";
	}
	if(counter2 < mainText.length){
		console.log(counter2, element.innerHTML);
		element.innerHTML+= mainText.charAt(counter2);
		counter2++;
		setTimeout(type2, timems, element, timems);
	}else{
		return;
	}
	return;
}