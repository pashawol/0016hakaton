"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".nav-wrap"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active"); // document.body.classList.toggle("fixed");
					// document.querySelector('html').classList.toggle("fixed");


					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active"); // document.body.classList.remove("fixed");
			// document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 1200px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	// табы  .
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /табы
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	loadFaq: function loadFaq() {
		if (window.location.href.includes('faq')) {
			$.getJSON("/mock/faq.json", function (faq) {
				console.log(faq);
				$(document).ready(function () {
					var html = '';
					faq[0].articles.forEach(function (article) {
						html = html + "<div class=\"accordion accordion--js \">" + "<div class=\"accordion__head\">".concat(article.question) + "<div class=\"accordion__plus\">\n" + "</div>\n" + "</div>\n" + "<div class=\"accordion__body\">\n" + "".concat(article.answer) + "</div>\n" + "</div>";
					});
					$('#faqContainer').html(html);
					$(".accordion--js ").on('click', '.accordion__head', function () {
						$(this).toggleClass('active').next().slideToggle();
					});
				});
			});
		} // const API_BASE = 'https://ideahack.ru/api/v1/'
		// $.ajax({
		// 	url: API_BASE + 'faq',
		// 	type: 'GET'
		// }).done(function (response) {
		// 	$( document ).ready(function() {
		//
		// 	});
		// }).fail(function () {
		// 	$( document ).ready(function() {
		// 		faq
		// 	});
		// });

	},
	confirmClaim: function confirmClaim() {
		var API_BASE = 'https://ideahack.ru/api/v1/';

		if (window.location.href.includes('confirmation') && window.location.search !== '') {
			$.ajax({
				contentType: 'application/json',
				url: API_BASE + 'claim/confirm' + window.location.search,
				type: 'POST'
			}).done(function (response) {
				$(document).ready(function () {
					$('#confirmTitle').text("Заявка успешно подтверждена!");
					$('#confirmDescription').html('Вы прошли первый этап регистрации на Интеллектуальный конкурс "Хакатон Идей".<br/>' + 'Ссылку для регистрации на платформе, где пройдет Конкурс, мы позже вышлем Вам на почту, указанную в заявке на участие.');
					$('#confirmButton').text("Перейти в чат");
					$('#confirmButton').attr("href", "https://t.me/joinchat/DZs6tUVcVQnJ4wEVDjQUOg");
				});
			}).fail(function () {
				$(document).ready(function () {
					$('#confirmTitle').text("Ошибка подтверждения заявки");
					$('#confirmDescription').html("Ссылка больше не действительна. Попробуйте отправить ссылку повторно.<br/> " + "В случае проблем, пожалуйста, обратитесь в службу поддержки.");
				});
			});
		}
	},
	sendForm: function sendForm() {
		var API_BASE = 'https://ideahack.ru/api/v1/';

		var dictCopy = function dictCopy(dict, copyFields) {
			var result = {};

			for (var _i = 0, _Object$entries = Object.entries(dict); _i < _Object$entries.length; _i++) {
				var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
						key = _Object$entries$_i[0],
						value = _Object$entries$_i[1];

				if (copyFields.includes(key)) {
					result[key] = value;
				}
			}

			return result;
		};

		$("#registrationForm").submit(function (e) {
			e.preventDefault();
			var data = {};
			$('form').serializeArray().forEach(function (el) {
				data[el['name']] = el['value'];
			});
			data['name'] = data['fname'];
			data['surname'] = data['lname'];
			data['has_team'] = data['has_team'] === 'on';
			data['confirm_url'] = window.location.origin + '/confirmation.html';
			data = dictCopy(data, ['name', 'surname', 'patronymic', 'telegram', 'phone', 'email', 'city', 'confirm_url', 'has_team']);
			$.ajax({
				contentType: 'application/json',
				url: API_BASE + 'claim',
				type: 'POST',
				data: JSON.stringify(data),
				processData: false
			}).done(function (response) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-success',
					type: 'inline'
				});
				$(this).trigger("reset");
			}).fail(function () {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-error',
					type: 'inline'
				});
			});
		});
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.confirmClaim();
	JSCCommon.sendForm();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.loadFaq(); // JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	// var x = window.location.host;
	// let screenName;
	// screenName = 'main.jpg';
	// if (screenName && x === "localhost:3000") {
	// 	$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }
	// /добавляет подложку для pixel perfect

	function whenResize() {
		var topH = $("header ").innerHeight();

		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		loop: true // navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },

	};
	var swiper4 = new Swiper('.sCases__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		watchOverflow: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true // renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }

		}
	}));
	swiper4.on('slideChange', function () {
		window.location.href = window.location.origin + '#sCases/case/' + swiper4.activeIndex;
	});

	if (window.location.href.includes('/case/')) {
		$(document).ready(function () {
			var splitHref = window.location.href.split('/');
			swiper4.slideTo(parseInt(splitHref[splitHref.length - 1]));
			swiper4.update();
		});
	}

	var swiper5 = new Swiper('.slider-line--js', {
		// slidesPerView: 5,
		// ...defaultSl,
		slidesPerView: 'auto',
		speed: 15000,
		loop: true,
		allowTouchMove: false,
		// можно ещё отключить свайп
		autoplay: {
			delay: 0,
			disableOnInteraction: false // или сделать так, чтобы восстанавливался autoplay после взаимодействия

		}
	}); // modal window

	$("marquee .marquee-inner").each(function () {
		var html = $(this).html();
		$(this).html(html.repeat(100));
	});

	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	};

	$(".accordion--js ").on('click', '.accordion__head', function () {
		$(this).toggleClass('active').next().slideToggle();
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}