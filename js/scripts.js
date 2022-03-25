$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Игроки
	const playersSliders = []

	$('.players .swiper-container').each(function (i) {
		$(this).addClass('players_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				spaceBetween: 16,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					bulletActiveClass: 'active'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					},
					1280: {
						slidesPerView: 3
					}
				}
			}

		playersSliders.push(new Swiper('.players_s' + i, options))

		if (slides > playersSliders[i].params.slidesPerView) {
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			playersSliders[i].destroy(true, true)
			playersSliders[i] = new Swiper('.players_s' + i, options)
		}
	})


	// Фильтр
	if ($('.filter .type input:checked + label').length) {
		let filterActivePosition = $('.filter .type input:checked + label').position().left

		$('.filter .type .roller').css('transform', `translateX(${filterActivePosition}px)`)
	}

	$('.filter .type label').click(function () {
		let newPosition = $(this).position().left

		$('.filter .type .roller').css('transform', `translateX(${newPosition}px)`)
	})

	$('.filter select').change(function () {
		let parent = $(this).closest('.item')

		parent.addClass('active')
	})

	$('.filter .item .clear_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		parent.removeClass('active').find('select').val(0).niceSelect('update');
	})


	// Турнирная таблица - Лиги
	if ($('.leaderboard .leagues .btn.active').length) {
		let leaderboardActivePosition = $('.leaderboard .leagues .btn.active').position()

		$('.leaderboard .leagues .roller').css('transform', `translate(${leaderboardActivePosition.left}px, ${leaderboardActivePosition.top}px`)
	}

	$('.leaderboard .leagues .btn').click(function () {
		let leaderboardActivePosition = $(this).position()

		$('.leaderboard .leagues .roller').css('transform', `translate(${leaderboardActivePosition.left}px, ${leaderboardActivePosition.top}px`)
	})


	// Форма - Пароль
	$('.form .view_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? $(this).closest('.field').find('.input').attr('type', 'text')
			: $(this).closest('.field').find('.input').attr('type', 'password')
	})


	// Таймер
	$('.timer').each(function () {
		let timerDate = $(this).data('date')

		$(this).countdown(timerDate, function (event) {
			$(this).find('.days .val').text(event.strftime('%D'))
			$(this).find('.hours .val').text(event.strftime('%H'))
			$(this).find('.minutes .val').text(event.strftime('%M'))
		})
	})


	// Статистика
	if ($('.statistics .leagues .btn.active').length) {
		let statisticsActivePosition = $('.statistics .leagues .btn.active').position()

		$('.statistics .leagues .roller').css('transform', `translate(${statisticsActivePosition.left}px, ${statisticsActivePosition.top}px`)
	}

	$('.statistics .leagues .btn').click(function () {
		let statisticsActivePosition = $(this).position()

		$('.statistics .leagues .roller').css('transform', `translate(${statisticsActivePosition.left}px, ${statisticsActivePosition.top}px`)
	})


	// Страница лиги
	if ($('.leagues_links .btn.active').length) {
		let leagueActivePosition = $('.leagues_links .btn.active').position()

		$('.leagues_links .roller').css('transform', `translate(${leagueActivePosition.left}px, ${leagueActivePosition.top}px)`)
	}


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})
})



$(window).on('load', () => {
	// Статьи
	let articles = $('.articles .grid'),
		articlesGutter = parseInt(articles.css('--articles_gutter'))

	masonry = articles.masonry({
		percentPosition: true,
		gutter: articlesGutter,
		itemSelector: '.masonry_item',
		columnWidth: articles.find('.article').width()
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Статьи
		setTimeout(() => {
			let articles = $('.articles .grid'),
				articlesGutter = parseInt(articles.css('--articles_gutter'))

			masonry = articles.masonry({
				percentPosition: true,
				gutter: articlesGutter,
				itemSelector: '.masonry_item',
				columnWidth: articles.find('.article').width()
			})
		})


		// Перезапись ширины окна
		WW = $(window).width()
	}
})