document.addEventListener("DOMContentLoaded",()=>{

let btnNext = document.querySelector('#fixed2');
let btnPrev = document.querySelector('#fixed1');
let xPos = window.pageXOffset;
let sectionsArray = document.querySelectorAll('.part');
let width = document.getElementById('wrapper').offsetWidth;
let widthOneScreen= Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const PIXELPERPART = Math.floor(width / sectionsArray.length);
const MAXOFFSET = width - widthOneScreen +20; //probably 20 for the scrollbar

let beginEachElement = new Array(); 
beginEachElement=findOffsetBlocks(sectionsArray); // values of begin of the block
let theNewGoal = 0; //  get axcessed with the butto get pressed;

btnNext.addEventListener('click',()=>{
	if(isFree){
		isFree=false;
		skip=false; //needed for the 'prev' function
		theNewGoal = nextBlock(window.pageXOffset,beginEachElement); 
		console.log(window.pageXOffset, theNewGoal, MAXOFFSET);
		a();
	}
});

let isFree=true;
let skip = false;

btnPrev.addEventListener('click',()=>{
	if(isFree){
		isFree=false;
		skip = false; //needed for the next function
		theNewGoal= prevBlock(window.pageXOffset,beginEachElement);
		b();
	}
});

let goBack = (function(){   return window.requestAnimationFrame  || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(/*function*/ callback /*, element*/ ){ window.setTimeout(callback, 1000 / 60); }; })();
function b(){
	xPos = window.pageXOffset;
	let x = xPos;
	if (xPos < PIXELPERPART){
		window.scrollTo(0,0);
		skip = true;
	}
	window.scrollTo(theNewGoal * 0.95,0);
	skip ? isFree = true : goBack(b);
	return
}	

let goFurther = (function(){   return window.requestAnimationFrame  || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(/*function*/ callback /*, element*/ ){ window.setTimeout(callback, 1000 / 60); }; })();
function a(){
	xPos = window.pageXOffset;
	let x = xPos;
	if (theNewGoal >= MAXOFFSET - 25){ // correct an issue in the end of the ban
		theNewGoal = MAXOFFSET;
	}
	if (xPos >= theNewGoal-20){
		window.scrollTo(theNewGoal+20,0);
		skip = true;
	}
		
	x +=(theNewGoal - xPos)* 0.05;
	window.scrollTo(x,0);

	skip ? isFree=true : goFurther(a);
	return
}	

function findOffsetBlocks(domObjectsArray){	
	let arr = new Array();
	for (let i in domObjectsArray){
		arr.push( i * PIXELPERPART);
	}
	return arr;
}

function nextBlock(windowPosition,beginEachElement){
	let lastToPass = 0;
	if(windowPosition < MAXOFFSET - PIXELPERPART){ 
		for (let i in beginEachElement){
			if(windowPosition > beginEachElement[i]){
				lastToPass = beginEachElement[i];
			}else{
				return lastToPass + PIXELPERPART +20;
			}
		}
	}else if(lastToPass > MAXOFFSET - PIXELPERPART - 20){
		return MAXOFFSET - 20;
	}else{ 
		return MAXOFFSET - 20;
	}
}

function prevBlock(windowPosition,beginEachElement){
	let lastToPass = 0;
	if(windowPosition > PIXELPERPART){ 
		for (let i in beginEachElement){
			if(windowPosition > beginEachElement[i]){
				lastToPass = beginEachElement[i];
			}else{
				return beginEachElement[i-1] +20;
			}
		}
	}else{ 
		return 0;
	}
}



});

























//window.requestAnimationFrame = (function(){   return window.requestAnimationFrame  || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(/*function*/ callback ,/*DOMElement*/ element ){ window.setTimeout(callback, 1000 / 60); }; })();
/*
function bewegung(){

//	let zielx;
//	let 

	if(Math.round(x - zielx) <1 && Math.round(zielx -x) <1){
		zielx = Math.random() * 1500;
	}

	x +=(zielx - x)* 0.05;
		requestAnimFrame(bewegung,b);
	}

b = document.getElementById("bew");
*/