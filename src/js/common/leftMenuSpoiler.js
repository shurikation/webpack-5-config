/**
 * *Обработчик спойлеров левого меню (сайдбар)
 */

	const spoilerLinks = document.querySelectorAll('.sidebar__link--spoiler');
	const spoilerIcons = document.querySelectorAll('.sidebar__link-icon');
	const spoilerLists = document.querySelectorAll('.sidebar__list--spoiler');

	const getSpoilerState = link => sessionStorage.getItem(link);

	const setSpoilerState = (link, state) => sessionStorage.setItem(link.id, state);

	const getHiddenListHeight = (list, listHeight) => {
		if (!listHeight) return 0;
		
		const links = list.querySelectorAll('.sidebar__elem');
		let totalHeight = 0;
		links.forEach(link => {
			let linkHeight = link.getBoundingClientRect().height;
			totalHeight += linkHeight;
		});
		return totalHeight;
	};

	const resizeSpoiler = (link, height, time) => {
		const list = link.parentNode.querySelector('.sidebar__list');
		list.style.height = getHiddenListHeight(list, height) + 'px';
		list.style.transition = time;
	};

	const rotateArrow = (link, state, time) => {
		const icon = link.parentNode.querySelector('.sidebar__link-icon');
		
		if (state === 'open') {
			icon.classList.remove('rotate-arrow');
		} else if (state === 'close') {
			icon.classList.add('rotate-arrow');
		}

		icon.style.transition = 'all ' + time;
	};

	const toggleSpoiler = (link, state, time, height) => {
		setSpoilerState(link, state);
		resizeSpoiler(link, height, time);
		rotateArrow(link, state, time);
	};

	const spoilerClickHandler = () => {
		spoilerLinks.forEach(link => link.addEventListener('click', (event) => {
			const link = event.target;
			const linkState = getSpoilerState(link.id);
			if (!linkState || linkState === 'close') {
				toggleSpoiler(link, 'open', '0.7s', true);
			} else if (linkState === 'open') {
				toggleSpoiler(link, 'close', '0.7s', 0);
			}
		}));
	};
	spoilerClickHandler();

	const setSpoilerDisplayAfterPageReload = () => {
		spoilerLinks.forEach(link => {
			const linkState = getSpoilerState(link.id);
			if (linkState === 'close') {
				toggleSpoiler(link, 'close', '0s', 0);
			} else if (linkState === 'open') {
				toggleSpoiler(link, 'open', '0s', true);
			}
		});
	};
	setSpoilerDisplayAfterPageReload();



