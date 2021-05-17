/*
$(function () {
	$('#BurgerMenuToggler').click(function(event){
              $('#mobile-menu').show();
	});

	$('.close').click(function(event){
              $('#mobile-menu').hide();
   });

});
*/

// burger menu
// breakpoint = 995px;
let mainMenu = document.querySelector('.main-menu');
let menuTrigger = document.querySelector('.main-menu__trigger'); 
let menuOpen = false;

if (menuTrigger !== null) {
    menuTrigger.onclick = function () {

        if (menuOpen === false) {
            menuOpen = true;
            let openMenu = gsap.timeline();
            openMenu.to(".main-menu", { duration: .2, display: 'block', autoAlpha: 1 })

        } else if (menuOpen) {
            menuOpen = false;
            let closeMenu = gsap.timeline();
            closeMenu.to(".main-menu", { duration: .2, display: 'none', autoAlpha: 0 })
        }
    }
}   



