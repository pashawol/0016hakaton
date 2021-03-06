const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".nav-wrap"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),


	modalCall() {

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
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					// document.body.classList.toggle("fixed");
					// document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			// document.body.classList.remove("fixed");
			// document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 1200px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	loadFaq() {
		if (window.location.href.includes('faq')) {
			$.getJSON("/mock/faq.json", function (faq) {
				console.log(faq);
				$(document).ready(function () {
					let html = '';
					faq[0].articles.forEach(article => {
						html = html + `<div class="accordion accordion--js ">` +
							`<div class="accordion__head">${article.question}` +
							`<div class="accordion__plus">\n` +
							`</div>\n` +
							`</div>\n` +
							`<div class="accordion__body">\n` +
							`${article.answer}` +
							`</div>\n` +
							`</div>`
					})
					$('#faqContainer').html(html);
					$(".accordion--js ").on('click', '.accordion__head', function () {
						$(this).toggleClass('active').next().slideToggle();
					})
				});
			});
		}
		// const API_BASE = 'https://ideahack.ru/api/v1/'
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


	confirmClaim() {
		const API_BASE = 'https://ideahack.ru/api/v1/'

		if (window.location.href.includes('confirmation') && window.location.search !== '') {
			$.ajax({
				contentType: 'application/json',
				url: API_BASE + 'claim/confirm' + window.location.search,
				type: 'POST'
			}).done(function (response) {
				$(document).ready(function () {
					$('#confirmTitle').text("Заявка успешно подтверждена!")
					$('#confirmDescription').html('Вы прошли первый этап регистрации на Интеллектуальный конкурс "Хакатон Идей".<br/>' +
						'Ссылку для регистрации на платформе, где пройдет Конкурс, мы позже вышлем Вам на почту, указанную в заявке на участие.')
					$('#confirmButton').text("Перейти в чат");
					$('#confirmButton').attr("href", "https://t.me/joinchat/DZs6tUVcVQnJ4wEVDjQUOg");
				});
			}).fail(function () {
				$(document).ready(function () {
					$('#confirmTitle').text("Ошибка подтверждения заявки")
					$('#confirmDescription').html("Ссылка больше не действительна. Попробуйте отправить ссылку повторно.<br/> " +
						"В случае проблем, пожалуйста, обратитесь в службу поддержки.")
				});
			});
		}
	},

	sendForm() {
		const API_BASE = 'https://ideahack.ru/api/v1/'

		const dictCopy = (dict, copyFields) => {
			const result = {};
			for (const [key, value] of Object.entries(dict)) {
				if (copyFields.includes(key)) {
					result[key] = value;
				}
			}
			return result;
		}

		$("#registrationForm").submit(function (e) {
			e.preventDefault();
			let data = {}
			$('form').serializeArray().forEach(el => {
				data[el['name']] = el['value'];
			});
			data['name'] = data['fname']
			data['surname'] = data['lname']
			data['has_team'] = data['has_team'] === 'on'
			data['confirm_url'] = window.location.origin + '/confirmation.html'
			data = dictCopy(data, ['name', 'surname', 'patronymic', 'telegram', 'phone', 'email', 'city',
				'confirm_url', 'has_team'])
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
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

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
	JSCCommon.loadFaq();


	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	// var x = window.location.host;
	// let screenName;
	// screenName = 'main.jpg';
	// if (screenName && x === "localhost:3000") {
	// 	$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		loop: true,
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },

	}

	const swiper4 = new Swiper('.sCases__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		watchOverflow: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	});
	swiper4.on('slideChange', function () {
		window.location.href = window.location.origin + '#sCases/case/' + swiper4.activeIndex;
	});

	if (window.location.href.includes('/case/')) {
		$(document).ready(function () {
			const splitHref = window.location.href.split('/')
			swiper4.slideTo(parseInt(splitHref[splitHref.length - 1]));
			swiper4.update();
		});
	}

	const swiper5 = new Swiper('.slider-line--js', {
		// slidesPerView: 5,
		// ...defaultSl,
		slidesPerView: 'auto',
		speed: 15000,
		loop: true,
		allowTouchMove: false, // можно ещё отключить свайп
		autoplay: {
			delay: 0,
			disableOnInteraction: false // или сделать так, чтобы восстанавливался autoplay после взаимодействия
		},
	});

	// modal window

	$("marquee .marquee-inner").each(function () {
		let html = $(this).html();
		$(this).html(html.repeat(100))
	})
	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 100);
	}
	$(".accordion--js ").on('click', '.accordion__head', function () {
		$(this).toggleClass('active').next().slideToggle();
	})
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
