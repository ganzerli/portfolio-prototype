document.addEventListener('DOMContentLoaded',()=>{

const menu =document.querySelector('#menu-fixed');
const menuContainer = document.querySelector('#menu-container');
const buttons= document.querySelectorAll('.btn');
const overlayPart = document.querySelectorAll('.overlayPart');

menu.addEventListener('click',()=>{
	menu.classList.toggle("active");
	menuContainer.classList.toggle("opac");
	buttons.forEach(btn => btn.classList.toggle("menu-inactive"));

	setTimeout(()=> overlayPart.forEach(oPart => oPart.classList.toggle("show-3D")), 500 );
	setTimeout(()=> menuContainer.classList.toggle("active"), 500 );

});


////////// END EVENT document.addEventListener('DOMContentLoaded'  tpktpktktpk..}
});
