window.addEventListener('DOMContentLoaded', () => {
	/**
	 * *Открывает и закрывает меню на мобильной версии
	 */
	const menuTogglerWrapper = document.getElementById('MainBurgerMenuToggler');
	const menuToggler = document.querySelector('.main-header__menu-button');
	const headerMenu = document.getElementById('HeaderMenu');
	const headerMenuContent = document.querySelector('.main-header__menu-list');

	let isMenuOpened = false;

	menuTogglerWrapper.addEventListener('click', function () {
		menuToggler.classList.toggle('toggler--active');
		if (!isMenuOpened) {
			openMenu();
		} else {
			closeMenu();
		}
	});

	function openMenu() {
		headerMenu.classList.add('menu--opened');
		headerMenuContent.classList.remove('collapse');
		headerMenuContent.classList.remove('smoothlyHide');
		headerMenuContent.classList.add('smoothlyShow');
		isMenuOpened = true;
	};

	function closeMenu() {
		headerMenuContent.classList.remove('smoothlyShow');
		headerMenuContent.classList.add('smoothlyHide');
		setTimeout(function () {
			headerMenuContent.classList.add('collapse');
		}, 300);
		headerMenu.classList.remove('menu--opened');
		isMenuOpened = false;
	};

	/**
	 * *Переключатель левого меню
	 */
	var leftMenuTogglerWrapper = document.getElementById('LeftBurgerMenuToggler');
	if (!leftMenuTogglerWrapper) return;

	var leftMenuToggler = document.querySelector('.main-header__menu-button--left');
	var leftHeaderMenu = document.getElementById('Sidebar');
	let isLeftMenuOpened = false;

	leftMenuTogglerWrapper.addEventListener('click', function () {
		if (!isLeftMenuOpened) {
			openLeftMenu();
		} else {
			closeLeftMenu();
		}
	});

	function openLeftMenu() {
		setSpoilerDisplayAfterPageReload();
		leftMenuToggler.classList.add('menu--left');
		leftHeaderMenu.classList.add('left-menu--max-height');
		setTimeout(function () {
			leftHeaderMenu.classList.add('left-menu--opened');
		}, 100);
		isLeftMenuOpened = true;
	};

	function closeLeftMenu() {
		leftMenuToggler.classList.remove('menu--left');
		leftHeaderMenu.classList.remove('left-menu--opened');
		setTimeout(function () {
			leftHeaderMenu.classList.remove('left-menu--max-height');
		}, 500);
		isLeftMenuOpened = false;
	};
});