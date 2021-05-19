/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/common/menuHandler.js":
/*!**********************************!*\
  !*** ./js/common/menuHandler.js ***!
  \**********************************/
/***/ (() => {



window.addEventListener('DOMContentLoaded', function () {
  /**
   * *Открывает и закрывает бургер-меню в мобильной версии
   */
  var menuTogglerWrapper = document.getElementById('MainBurgerMenuToggler');
  var menuToggler = document.querySelector('.main-header__menu-button');
  var headerMenu = document.getElementById('HeaderMenu');
  var headerMenuContent = document.querySelector('.main-header__menu-list');
  var isMenuOpened = false;

  var openMenu = function openMenu() {
    headerMenu.classList.add('menu--opened');
    headerMenuContent.classList.remove('collapse');
    headerMenuContent.classList.remove('smoothlyHide');
    headerMenuContent.classList.add('smoothlyShow');
    isMenuOpened = true;
  };

  var closeMenu = function closeMenu() {
    headerMenuContent.classList.remove('smoothlyShow');
    headerMenuContent.classList.add('smoothlyHide');
    setTimeout(function () {
      headerMenuContent.classList.add('collapse');
    }, 300);
    headerMenu.classList.remove('menu--opened');
    isMenuOpened = false;
  };

  menuTogglerWrapper.addEventListener('click', function () {
    menuToggler.classList.toggle('toggler--active');

    if (!isMenuOpened) {
      openMenu();
    } else {
      closeMenu();
    }
  });
  /**
   * *Переключатель спойлеров левого меню (сайдбар)
   */

  var spoilerLinks = document.querySelectorAll('.sidebar__link--spoiler'); // const spoilerIcons = document.querySelectorAll('.sidebar__link-icon');
  // const spoilerLists = document.querySelectorAll('.sidebar__list--spoiler');

  var getSpoilerState = function getSpoilerState(link) {
    return sessionStorage.getItem(link);
  };

  var setSpoilerState = function setSpoilerState(link, state) {
    return sessionStorage.setItem(link.id, state);
  };

  var getHiddenListHeight = function getHiddenListHeight(list, listHeight) {
    if (!listHeight) return 0;
    var links = list.querySelectorAll('.sidebar__elem');
    var totalHeight = 0;
    links.forEach(function (link) {
      var linkHeight = link.getBoundingClientRect().height;
      totalHeight += linkHeight;
    });
    return totalHeight;
  };

  var resizeSpoiler = function resizeSpoiler(link, height, time) {
    var list = link.parentNode.querySelector('.sidebar__list');
    list.style.height = getHiddenListHeight(list, height) + 'px';
    list.style.transition = time;
  };

  var rotateArrow = function rotateArrow(link, state, time) {
    var icon = link.parentNode.querySelector('.sidebar__link-icon');

    if (state === 'open') {
      icon.classList.remove('rotate-arrow');
    } else if (state === 'close') {
      icon.classList.add('rotate-arrow');
    }

    icon.style.transition = 'all ' + time;
  };

  var toggleSpoiler = function toggleSpoiler(link, state, time, height) {
    setSpoilerState(link, state);
    resizeSpoiler(link, height, time);
    rotateArrow(link, state, time);
  };

  var spoilerClickHandler = function spoilerClickHandler() {
    spoilerLinks.forEach(function (link) {
      return link.addEventListener('click', function (event) {
        var link = event.target;
        var linkState = getSpoilerState(link.id);

        if (!linkState || linkState === 'close') {
          toggleSpoiler(link, 'open', '0.7s', true);
        } else if (linkState === 'open') {
          toggleSpoiler(link, 'close', '0.7s', 0);
        }
      });
    });
  };

  spoilerClickHandler();

  var setSpoilerDisplayAfterPageReload = function setSpoilerDisplayAfterPageReload() {
    spoilerLinks.forEach(function (link) {
      var linkState = getSpoilerState(link.id);

      if (linkState === 'close') {
        toggleSpoiler(link, 'close', '0s', 0);
      } else if (linkState === 'open') {
        toggleSpoiler(link, 'open', '0s', true);
      }
    });
  };

  setSpoilerDisplayAfterPageReload();
  /**
   * *Переключатель левого меню (сайдбар) в мобильной версии
   */

  var leftMenuTogglerWrapper = document.getElementById('LeftBurgerMenuToggler');
  var leftMenuToggler = document.querySelector('.main-header__menu-button--left');
  var leftHeaderMenu = document.getElementById('Sidebar');
  var isLeftMenuOpened = false;
  if (!leftMenuTogglerWrapper) return false;

  var openLeftMenu = function openLeftMenu() {
    setSpoilerDisplayAfterPageReload();
    leftMenuToggler.classList.add('menu--left');
    leftHeaderMenu.classList.add('left-menu--max-height');
    setTimeout(function () {
      leftHeaderMenu.classList.add('left-menu--opened');
    }, 100);
    isLeftMenuOpened = true;
  };

  var closeLeftMenu = function closeLeftMenu() {
    leftMenuToggler.classList.remove('menu--left');
    leftHeaderMenu.classList.remove('left-menu--opened');
    setTimeout(function () {
      leftHeaderMenu.classList.remove('left-menu--max-height');
    }, 500);
    isLeftMenuOpened = false;
  };

  leftMenuTogglerWrapper.addEventListener('click', function () {
    if (!isLeftMenuOpened) {
      openLeftMenu();
    } else {
      closeLeftMenu();
    }
  });
});

/***/ }),

/***/ "./js/common/notificationHub.js":
/*!**************************************!*\
  !*** ./js/common/notificationHub.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault/index.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/asyncToGenerator/index.js"));

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
  "finance": "finance_notices"
};
window.addEventListener('DOMContentLoaded', function () {
  var newMessageTitleStatuses = [];
  var mainMenuDialogElement = document.querySelector(".main-menu__dialogs");
  var dialogNewMessageIcon = document.getElementById("dialogNewMessageIcon");
  var purchasesNoticeTab = $("#PurchasesQty");
  var purchasesNotificationList = $("#PurchasesNotice");
  var offersNoticeTab = $("#OffersQty");
  var offersNotificeList = $("#OffersNotice");
  var auctionsNoticeTab = $("#AuctionsQty");
  var AuctionsNotificeList = $("#AuctionsNotice");
  var contractsNoticeTab = $("#ContractsQty");
  var contractsNotificeList = $("#ContractsNotice");
  var dealsNoticeTab = $("#DealsQty");
  var dealsNotificeList = $("#DealsNotice");
  var financeNoticeTab = $("#FinancesQty");
  var financeNoticeList = $("#FinansesNotice");

  function connectToNotificationHub() {
    return _connectToNotificationHub.apply(this, arguments);
  }

  function _connectToNotificationHub() {
    _connectToNotificationHub = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              notificationHubConnection = new signalR.HubConnectionBuilder().withUrl("/Notifications/NotificationHub").build(); // Повторное подключение вручную

              notificationHubConnection.onclose( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return startNotificationHubConnectionWithAutoReconnect(10000);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));
              notificationHubConnection.on("UpdateNotificationCounters", function (data) {
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
              }); //increase by one notices counters

              notificationHubConnection.on("ReceiptedNewMessage", function (dialogId) {
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
              notificationHubConnection.on("DialogReaded", function (dialogId) {
                var selector = "#dialog_" + dialogId;

                if (newMessageTitleStatuses.includes(selector)) {
                  newMessageTitleStatuses.splice(selector);
                }

                displayCounterUnreadDialogs(newMessageTitleStatuses.length);
              });
              notificationHubConnection.on("PurchaseNotification", function () {
                increaseByOneNoticeCounter(purchasesNoticeTab);
                addPulseForButton();
              });
              notificationHubConnection.on("OfferNotification", function () {
                increaseByOneNoticeCounter(offersNoticeTab);
                addPulseForButton();
              });
              notificationHubConnection.on("AuctionNotification", function () {
                increaseByOneNoticeCounter(auctionsNoticeTab);
                addPulseForButton();
              });
              notificationHubConnection.on("ContractNotification", function () {
                increaseByOneNoticeCounter(contractsNoticeTab);
                addPulseForButton();
              });
              notificationHubConnection.on("DealNotification", function () {
                increaseByOneNoticeCounter(dealsNoticeTab);
                addPulseForButton();
              });
              notificationHubConnection.on("FinanceNotification", function () {
                increaseByOneNoticeCounter(financeNoticeTab);
                addPulseForButton();
              }); //get notifications

              notificationHubConnection.on("DisplayPurchasesNotices", function (data) {
                addNoticeList(purchasesNotificationList, data);
                displayNoticeCounter(purchasesNoticeTab, data);
              });
              notificationHubConnection.on("DisplayOffersNotices", function (data) {
                addNoticeList(offersNotificeList, data);
                displayNoticeCounter(offersNoticeTab, data);
              });
              notificationHubConnection.on("DisplayAuctionsNotices", function (data) {
                addNoticeList(AuctionsNotificeList, data);
                displayNoticeCounter(auctionsNoticeTab, data);
              });
              notificationHubConnection.on("DisplayContractsNotices", function (data) {
                addNoticeList(contractsNotificeList, data);
                displayNoticeCounter(contractsNoticeTab, data);
              });
              notificationHubConnection.on("DisplayDealsNotices", function (data) {
                addNoticeList(dealsNotificeList, data);
                displayNoticeCounter(dealsNoticeTab, data);
              });
              notificationHubConnection.on("DisplayFinanceNotices", function (data) {
                data.forEach(function (d) {
                  return console.log(d.isNew);
                });
                addNoticeList(financeNoticeList, data);
                displayNoticeCounter(financeNoticeTab, data);
              }); // Запуск хаба

              _context2.next = 19;
              return startNotificationHubConnection();

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _connectToNotificationHub.apply(this, arguments);
  }

  ;

  function startNotificationHubConnection() {
    return _startNotificationHubConnection.apply(this, arguments);
  }

  function _startNotificationHubConnection() {
    _startNotificationHubConnection = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              notificationHubConnection.logging = true;
              _context3.next = 4;
              return notificationHubConnection.start();

            case 4:
              console.log("notifications connected.");
              notificationHubConnection.invoke("GetNotifications")["catch"](function (err) {
                return console.log(err.toString());
              });
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));
    return _startNotificationHubConnection.apply(this, arguments);
  }

  ;

  function startNotificationHubConnectionWithAutoReconnect(_x, _x2) {
    return _startNotificationHubConnectionWithAutoReconnect.apply(this, arguments);
  }

  function _startNotificationHubConnectionWithAutoReconnect() {
    _startNotificationHubConnectionWithAutoReconnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(timeoutMs, reload) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return notificationHubConnection.start();

            case 3:
              if (reload) {
                console.log("notice hub reloading...");
                window.location.reload(true);
              } else {
                console.log("notice hub connected.");
              }

              _context4.next = 10;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              setTimeout(function () {
                return startNotificationHubConnectionWithAutoReconnect(timeoutMs, true);
              }, timeoutMs);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 6]]);
    }));
    return _startNotificationHubConnectionWithAutoReconnect.apply(this, arguments);
  }

  ; //Dialogs

  /**
   * Обновляет счетчик в меню
   * @param {any} count
   */

  function displayCounterUnreadDialogs(count) {
    if (!dialogNewMessageIcon) return false;

    if (count > 0) {
      dialogNewMessageIcon.classList.remove('collapse');
    } else {
      dialogNewMessageIcon.classList.add('collapse');
    }
  }

  ; //Auctions

  /**
   * Обновляет счетчик в меню уведомлений
   * @param {any} container
   * @param {any} value
   */

  function displayNoticeCounter(container, value) {
    if (value > 0) {
      container.html(value);
    } else {
      container.html('0');
    }
  }

  ;
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

    collection.reverse().forEach(function (notice) {
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
  }

  ;

  function addEmptyNotificationMessage(ul) {
    var li = document.createElement("li");
    li.textContent = "Оповещений нет";
    li.classList.add("drop-card__link");
    ul.append(li);
  }

  ;

  function addPulseForButton() {
    $('#DropdownToggler').addClass('pulsingButton');
  }

  ;

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

    notificationHubConnection.invoke(methodName)["catch"](function (err) {
      return console.log(err.toString());
    });
  }

  ;

  function readAllNotices() {
    notificationHubConnection.invoke("ReadAll")["catch"](function (err) {
      return console.log(err.toString());
    });
  }

  var readAllButton = document.getElementById("ReadAllNotices");
  if (!readAllButton) return;
  /**
   * *Запускает процесс загрузки данных для просматриваемой группы (карточки) уведомлений*
   */

  var notificationGroups = document.querySelectorAll('.drop-card');
  notificationGroups.forEach(function (group) {
    group.addEventListener('click', displayNotificationGroup);
  });

  function displayNotificationGroup() {
    var currentTypes = this.getAttribute('data-type');
    var arrOfTypes = currentTypes.split(" ");
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
  var bellIcon = document.querySelector('.fa-bell');
  dropdownToggler.addEventListener('click', function () {
    var togglerState = dropdownToggler.getAttribute('data-state');
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


  var cardTogglers = document.querySelectorAll('.toggler--js');
  var notificationQuantities = document.querySelectorAll('.drop-card__qty');
  var cardFixedHeight = 200;
  var currentCard = null;
  var prevCard = null;
  cardTogglers.forEach(function (toggler) {
    toggler.addEventListener('click', function () {
      var togglerID = toggler.dataset.id;
      var cardID = 'card-' + togglerID;
      currentCard = document.querySelector('[data-id=' + cardID + ']');
      var state = currentCard.getAttribute('data-state');

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
    var numOfQtyCounters = +notificationQuantities.length;
    var counter = 0;
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


  var symLimit = 39;
  var tag = document.getElementById('headerOrganizationName');
  if (!tag) return false;
  var name = tag.textContent;

  if (name.length > symLimit) {
    var cuttedText = name.slice(0, symLimit);
    tag.textContent = cuttedText + "...";
  }

  connectToNotificationHub();
});

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! ./common/notificationHub */ "./js/common/notificationHub.js");

__webpack_require__(/*! ./common/menuHandler */ "./js/common/menuHandler.js");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./js/main.js","vendors-node_modules_babel_runtime_helpers_asyncToGenerator_index_js-node_modules_babel_runti-36f517"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map