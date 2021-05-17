(function () {
	const readAllButton = document.getElementById("ReadAllNotices");

	if (!readAllButton) return;
	/**
	 * *Запускает процесс загрузки данных для просматриваемой группы (карточки) уведомлений*
	 */
	const notificationGroups = document.querySelectorAll('.drop-card');
	notificationGroups.forEach(function (group) {
		group.addEventListener('click', displayNotificationGroup);
	});

	function displayNotificationGroup() {
		const currentTypes = this.getAttribute('data-type');
		const arrOfTypes = currentTypes.split(" ");

		arrOfTypes.forEach(function (type) {
			uploadNotifications(type);
		});
	}
	document.getElementById("ReadAllNotices").addEventListener('click', readAllNotices);


	/**
	 * *Отображает/скрывает меню всех уведомлений* 
	 */
	var dropdownToggler = document.getElementById('DropdownToggler');
	var dropdownMenu = document.getElementById('DropdownMenu');
	const bellIcon = document.querySelector('.fa-bell');

	dropdownToggler.addEventListener('click', function () {
		const togglerState = dropdownToggler.getAttribute('data-state');
		console.log(togglerState);
		switch (togglerState) {
			case 'closed':
				openNotificationMenu();
				break;
			case 'opened':
				closeNotificationMenu();
				break;
		}
	});

	document.addEventListener('click', function (event) {
		if (event.target.closest("#DropdownMenu") || event.target === dropdownToggler || event.target === bellIcon) return;
		closeNotificationMenu();
	});

	function openNotificationMenu() {
		dropdownMenu.classList.remove('collapse');
		dropdownMenu.classList.remove('smoothlyHide');
		dropdownMenu.classList.add('smoothlyShow');
		dropdownToggler.setAttribute('data-state', 'opened');
	}

	function closeNotificationMenu() {
		dropdownMenu.classList.remove('smoothlyShow');
		dropdownMenu.classList.add('smoothlyHide');
		setTimeout(function () {
			dropdownMenu.classList.add('collapse');
		}, 300);
		dropdownToggler.setAttribute('data-state', 'closed');
	}


	/**
	 * *Раскрывает/скрывает выбранную группу (карточку) уведомлений*
	 */
	const cardTogglers = document.querySelectorAll('.toggler--js');
	const notificationQuantities = document.querySelectorAll('.drop-card__qty');
	const cardFixedHeight = 200;

	let currentCard = null;
	let prevCard = null;

	cardTogglers.forEach(function (toggler) {
		toggler.addEventListener('click', function () {

			const togglerID = toggler.dataset.id;
			const cardID = 'card-' + togglerID;
			currentCard = document.querySelector('[data-id=' + cardID + ']');
			const state = currentCard.getAttribute('data-state');

			if (state === 'closed') {
				toggleCard(currentCard, cardFixedHeight, 'opened');
			} else if (state === 'opened') {
				toggleCard(currentCard, 0, 'closed');
			}

			if (prevCard && prevCard !== currentCard) {
				toggleCard(prevCard, 0, 'closed');
			}

			prevCard = currentCard;

			setTimeout(function () {
				if (isNotifictionsRead()) {
					dropdownToggler.classList.remove('pulsingButton');
				}
			}, 1500);
		});
	});

	function toggleCard(card, cardHeight, state) {
		card.style.height = cardHeight + "px";
		card.setAttribute('data-state', state);
	}

	function isNotifictionsRead() {
		let numOfQtyCounters = +notificationQuantities.length;
		let counter = 0;

		notificationQuantities.forEach(function (qty) {
			if (qty.textContent == '0') {
				counter++;
			}
		});

		if (counter >= numOfQtyCounters) {
			return true;
		} else {
			return false;
		}
	}
})();

/**
 * *Ограничивает количество символов названия организации в хэдере
 */
 document.addEventListener('DOMContentLoaded', () => {
	const symLimit = 39;
	const tag = document.getElementById('headerOrganizationName');
	
	if (!tag) return false;

	const name = tag.textContent;

	if(name.length > symLimit) {
		const cuttedText = name.slice(0, symLimit);
		tag.textContent = cuttedText + "...";
	}
});




