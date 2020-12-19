// const get = element => document.getElementById(element);

// const open = get('menu-btn');
// const nav = get('nav');
// const exit = get('exit-btn');

// open.addEventListener('click', () => {
//     nav.classList.add('open-nav');
// });

// exit.addEventListener('click', () => {
//     nav.classList.remove('open-nav');
// });

var $;

    $(document).ready(function(){

	var elm_class = '.arrow'; // Adjust this accordingly. 

	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 300) { // 300px from top
			$(elm_class).fadeIn();
		} else {
			$(elm_class).fadeOut();
		}
	});
	
	//Click event to scroll to top
	$(elm_class).click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	
});