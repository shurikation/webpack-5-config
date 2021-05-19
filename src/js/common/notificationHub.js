var notificationHubConnection;
var purchaseNoticesreceived = false;
var offerNoticesreceived = false;
var auctionNoticesreceived = false;
var contractNoticesreceived = false;
var financeNoticesreceived = false;

/* Значения используются в качестве классов списков групп уведомлений*/
var wrapper = {
    "unreadDialogs": "unread_dialogs",
    "purchases": "purchases_notices",
    "offers": "offers_notices",
    "auctions": "auctions_notices",
    "startedAuctions": "started_auctions_notices",
    "finishedAuctions": "finished_auctions_notices",
    "updatedContracts": "contracts_notices",
    "updatedDeals": "deals_notices",
    "purchasesArchive": "purchases_archive_notices",
    "finance": "finance_notices",
};

window.addEventListener('DOMContentLoaded', () => {

var newMessageTitleStatuses = [];
const mainMenuDialogElement = document.querySelector(".main-menu__dialogs");
const dialogNewMessageIcon = document.getElementById("dialogNewMessageIcon");


const purchasesNoticeTab = $("#PurchasesQty");
const purchasesNotificationList = $("#PurchasesNotice");

const offersNoticeTab = $("#OffersQty");
const offersNotificeList = $("#OffersNotice");

const auctionsNoticeTab = $("#AuctionsQty");
const AuctionsNotificeList = $("#AuctionsNotice");

const contractsNoticeTab = $("#ContractsQty");
const contractsNotificeList = $("#ContractsNotice");

const dealsNoticeTab = $("#DealsQty");
const dealsNotificeList = $("#DealsNotice");

const financeNoticeTab = $("#FinancesQty");
const financeNoticeList = $("#FinansesNotice");

async function connectToNotificationHub() {
    notificationHubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/Notifications/NotificationHub")
        .build();

    // Повторное подключение вручную
    notificationHubConnection.onclose(async () => {
        await startNotificationHubConnectionWithAutoReconnect(10000);
    });

    notificationHubConnection.on("UpdateNotificationCounters", (data) => {
        displayCounterUnreadDialogs(data.unreadDialogCount);
        displayNoticeCounter(purchasesNoticeTab, data.purchaseNoticeCount);
        displayNoticeCounter(offersNoticeTab, data.offersNoticeCount);
        displayNoticeCounter(auctionsNoticeTab, data.auctionNoticeCount);
        displayNoticeCounter(contractsNoticeTab, data.updatedContractCount);
        displayNoticeCounter(dealsNoticeTab, data.updatedDealCount);
        displayNoticeCounter(financeNoticeTab, data.financeNoticeCount);

        if (data.sumCount > 0) {
            addPulseForButton();
        } else {
			removePulseForButton();
		}
    });

    //increase by one notices counters
    notificationHubConnection.on("ReceiptedNewMessage", (dialogId) => {
        var selector = "#dialog_" + dialogId;
        if (!newMessageTitleStatuses.includes(selector)) {
            var first = $(selector).find('span.dialogs-title');
            first.after("<div class=\"dialogs-title dialogs-new-message-trigger--temp\"><span class=\"dialog-new-message-button--temp\">Новое сообщение</span></div>");
            var img = $(selector).find('img');
            img.attr('src', '/images/convert.svg');
            newMessageTitleStatuses.push(selector);
        }
        displayCounterUnreadDialogs(newMessageTitleStatuses.length);
    });

    notificationHubConnection.on("DialogReaded", (dialogId) => {
        var selector = "#dialog_" + dialogId;
        if (newMessageTitleStatuses.includes(selector)) {
            newMessageTitleStatuses.splice(selector);
        }
        displayCounterUnreadDialogs(newMessageTitleStatuses.length);
    });

    notificationHubConnection.on("PurchaseNotification", () => {
        increaseByOneNoticeCounter(purchasesNoticeTab);
        addPulseForButton();
    });

    notificationHubConnection.on("OfferNotification", () => {
        increaseByOneNoticeCounter(offersNoticeTab);
        addPulseForButton();
    });

    notificationHubConnection.on("AuctionNotification", () => {
        increaseByOneNoticeCounter(auctionsNoticeTab);
        addPulseForButton();
    });

    notificationHubConnection.on("ContractNotification", () => {
        increaseByOneNoticeCounter(contractsNoticeTab);
        addPulseForButton();
    });

    notificationHubConnection.on("DealNotification", () => {
        increaseByOneNoticeCounter(dealsNoticeTab);
        addPulseForButton();
    });

    notificationHubConnection.on("FinanceNotification", () => {
        increaseByOneNoticeCounter(financeNoticeTab);
        addPulseForButton();
    });

    //get notifications
    notificationHubConnection.on("DisplayPurchasesNotices", (data) => {
        addNoticeList(purchasesNotificationList, data);
        displayNoticeCounter(purchasesNoticeTab, data);
    });

    notificationHubConnection.on("DisplayOffersNotices", (data) => {
        addNoticeList(offersNotificeList, data);
        displayNoticeCounter(offersNoticeTab, data);
    });

    notificationHubConnection.on("DisplayAuctionsNotices", (data) => {
        addNoticeList(AuctionsNotificeList, data);
        displayNoticeCounter(auctionsNoticeTab, data);
    });

    notificationHubConnection.on("DisplayContractsNotices", (data) => {
        addNoticeList(contractsNotificeList, data);
        displayNoticeCounter(contractsNoticeTab, data);
    });

    notificationHubConnection.on("DisplayDealsNotices", (data) => {
        addNoticeList(dealsNotificeList, data);
        displayNoticeCounter(dealsNoticeTab, data);
    });

    notificationHubConnection.on("DisplayFinanceNotices", (data) => {
        data.forEach(d => console.log(d.isNew));
        addNoticeList(financeNoticeList, data);
        displayNoticeCounter(financeNoticeTab, data);
    });

    // Запуск хаба
    await startNotificationHubConnection();
};



async function startNotificationHubConnection() {
    try {
        notificationHubConnection.logging = true;
        await notificationHubConnection.start();
        console.log("notifications connected.");

        notificationHubConnection.invoke("GetNotifications")
            .catch(function (err) { return console.log(err.toString()); });
    } catch (err) {
        console.log(err);
    }
};

async function startNotificationHubConnectionWithAutoReconnect(timeoutMs, reload) {
    try {
        await notificationHubConnection.start();

        if (reload) {
            console.log("notice hub reloading...");
            window.location.reload(true);
        } else {
            console.log("notice hub connected.");
        }
    }
    catch (err) {
        console.log(err);
        setTimeout(() => startNotificationHubConnectionWithAutoReconnect(timeoutMs, true), timeoutMs);
    }
};

//Dialogs

/**
 * Обновляет счетчик в меню
 * @param {any} count
 */
function displayCounterUnreadDialogs(count) {
	if(!dialogNewMessageIcon) return false;

    if (count > 0) {
		dialogNewMessageIcon.classList.remove('collapse');		
	}
    else {
        dialogNewMessageIcon.classList.add('collapse');	
    }
};

//Auctions

/**
 * Обновляет счетчик в меню уведомлений
 * @param {any} container
 * @param {any} value
 */
function displayNoticeCounter(container, value) {
    if (value > 0) {
        container.html(value);
    }
    else {
        container.html('0');
    }
};
/**
 * Возвращает текущее значение счетчика
 * @param {any} container
 */
function increaseByOneNoticeCounter(container) {
    var value = parseInt(container.html());
    value++;
    container.html(value);
}

/**
 * Добавляет на страницу список уведомлений в соответствующую группу
 * @param {any} container - ul-обертка для li
 * @param {any} collection 
 */
function addNoticeList(container, collection) {    
    if (!collection.length) {
        addEmptyNotificationMessage(container);
    }

    collection.reverse().forEach((notice) => {
        var li = document.createElement("li");
        li.classList.add("drop-card__item");

        if (notice.isNew) {
            li.classList.add('item--isNew');
        }

        var a = document.createElement("a");
        a.classList.add("drop-card__link");
        a.href = "/Notification/RedirectToSource?id=" + notice.id;
        a.textContent = notice.title;

        if (notice.message) {
            var span = document.createElement("span");
            span.classList.add("drop-card__message");
            span.textContent = notice.message;
            a.appendChild(span);
        }

        li.appendChild(a);
        container.append(li);
    });
};

function addEmptyNotificationMessage(ul) {
    var li = document.createElement("li");
    li.textContent = "Оповещений нет";
    li.classList.add("drop-card__link");
    ul.append(li);
};

function addPulseForButton() {
    $('#DropdownToggler').addClass('pulsingButton');
};

function removePulseForButton() {
	$('#DropdownToggler').removeClass('pulsingButton');
}

var purchaseNoticesReceived = false;
var offerNoticesReceived = false;
var auctionNoticesReceived = false;
var contractNoticesReceived = false;
var dealNoticesReceived = false;
var financeNoticesReceived = false;

function uploadNotifications(type) {
    var methodName;
    switch (type) {
        case wrapper.purchases:
            if (purchaseNoticesReceived) return;
            purchaseNoticesReceived = true;
            methodName = "GetPurchasesNotices";
            break;

        case wrapper.offers:
            if (offerNoticesReceived) return;
            offerNoticesReceived = true;
            methodName = "GetOffersNotices";
            break;

        case wrapper.auctions:
            if (auctionNoticesReceived) return;
            auctionNoticesReceived = true;
            methodName = "GetAuctionsNotices";
            break;

        case wrapper.updatedContracts:
            if (contractNoticesReceived) return;
            contractNoticesReceived = true;
            methodName = "GetContractsNotices";
            break;

        case wrapper.updatedDeals:
            if (dealNoticesReceived) return;
            dealNoticesReceived = true;
            methodName = "GetDealsNotices";
            break;

        case wrapper.finance:
            if (financeNoticesReceived) return;
            financeNoticesReceived = true;
            methodName = "GetFinanceNotices";
            break;

        default:
            return;
    }
    notificationHubConnection.invoke(methodName)
        .catch(function (err) { return console.log(err.toString()); });
};

function readAllNotices() {
    notificationHubConnection.invoke("ReadAll")
        .catch(function (err) { return console.log(err.toString()); });
}



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


/**
* *Ограничивает количество символов названия организации в хэдере
*/

const symLimit = 39;
const tag = document.getElementById('headerOrganizationName');

if (!tag) return false;

const name = tag.textContent;

if(name.length > symLimit) {
	const cuttedText = name.slice(0, symLimit);
	tag.textContent = cuttedText + "...";
}


connectToNotificationHub();
});








