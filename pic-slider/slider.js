document.addEventListener("DOMContentLoaded", e => {

	const carouselSlide =document.querySelector('.carousel-slide');
	const carouselImages =document.querySelectorAll('.carousel-slide img');

	const prevBtn = document.querySelector('#prevBtn');
	const nextBtn = document.querySelector('#nextBtn');

	let counter =1;
	let size = carouselImages[0].clientWidth;
// at the begin for the welcome animation the picture can bealso the 3 or 4 and slides back to the first opening the page

// first declaration
carouselSlide.style.transform ="translateX("+ (-size * 5) +"px)";
//moovig all back to img 1 after 20 ms

setTimeout(()=>{
	carouselSlide.style.transition ="transform 2s";
	carouselSlide.style.transform ="translateX("+ (-size * counter) +"px)";
}, 500);


nextBtn.addEventListener('click',()=>{
	if(counter >= carouselImages.length-1)return;
	carouselSlide.style.transition ="transform 0.4s ease-in-out";
	counter++;
	carouselSlide.style.transform ="translateX("+ (-size * counter) +"px)";
});


prevBtn.addEventListener('click',()=>{
	if(counter <= 0)return;
	carouselSlide.style.transition ="transform 0.4s ease-in-out";
	counter--;
	carouselSlide.style.transform ="translateX("+ (-size * counter) +"px)";
});

carouselSlide.addEventListener('transitionend',()=>{
	if(carouselImages[counter]. id === 'last'){
		carouselSlide.style.transition ="none";
		counter = carouselImages.length -2;
		carouselSlide.style.transform ="translateX("+ (-size * counter) +"px)";
	}
	if(carouselImages[counter]. id === 'first'){
		carouselSlide.style.transition ="none";
		counter = 1;
		carouselSlide.style.transform ="translateX("+ (-size * counter) +"px)";
	}
});

});