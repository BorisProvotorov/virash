$(document).ready(function(){ 

	//Слайдер на главной
	var mainSlider = $('.main-slider');

	if(mainSlider.length > 0) {
		mainSlider.slick({
			dots: true,
			arrows: false
		});
	} 

	//Кнопка бургера
	var burger = $('.burger');

	burger.on('click', function(){
		$(this).toggleClass('on');
		$('.top-line').toggleClass('on');
	});

	//Мобильное меню slideUp
	$('.mobile-menu__arrow').on('click', function(){
		var thisParentItem = $(this).closest('.mobile-menu__item--has-child');
		var subMenu = thisParentItem.find('.mobile-menu__sub');
		thisParentItem.toggleClass('on');
		subMenu.slideToggle();
	});
 

	//Скрытие меню при прокрутке
	var lastScrollTop = 0;
	$(window).on('scroll', function () {
	  var st = $(this).scrollTop();

	  if (st > lastScrollTop) {
	      $('.main-navbar-fix').addClass('off');
	  } else {
	      $('.main-navbar-fix').removeClass('off');
	  }

	  if (st <= 0) {
	    $('.main-navbar-fix').removeClass('off');
	  }

	  lastScrollTop = st;
	});


	//Навигация на странице контакты
	var selectAddress = $('.select-address-js'),
	selectAddressItem = $('.select-address__item');

	if(selectAddress.length > 0) {
		selectAddress.slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			infinite: false,
			variableWidth: true,
			accessibility: true,
			responsive: [ 
			    {
			      breakpoint: 768,
			      settings: {
			        variableWidth: true,
			        slidesToShow: 3
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			       	focusOnSelect: true,
			       	centerMode: true,
			       	initialSlide:3
			      }
			    }
			]   
		//Управление слайдами мышкой	 
		}).mousewheel(function(e) {
		    e.preventDefault();
		    if (e.deltaY < 0) {
		      $(this).slick('slickNext');
		    } else {
		      $(this).slick('slickPrev');
		    }
		});


		selectAddress.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  $('.select-address__item[data-slick-index="'+nextSlide+'"]')
		 .find('input[type="radio"]')
		 .focus()
		  .prop('checked', true);
		});

		//Для смены направления стрелки
		selectAddress.find('.slick-arrow').on('click',function(){
			var btnDisabled = $(this).attr('aria-disabled'),
				btnNext = selectAddress.find('.slick-next'),
				btnPrev = $('.slick-prev');

			if(btnNext.hasClass('slick-disabled')) {
				btnNext.css({'visibility':'hidden'});
				btnPrev.css({'visibility':'visible'});
			}

			if(btnPrev.hasClass('slick-disabled')) {
				btnPrev.css({'visibility':'hidden'});
				btnNext.css({'visibility':'visible'});
			}
			
		});

		//Активируем текущий элемент
		selectAddressItem.each(function(){
			if($(this).hasClass('slick-current')) {
				$(this).find('input[type="radio"]').prop('checked', true);
			}
		});

		//Активируем текущий элемент при клике на него
		selectAddressItem.on('click', function(){
			$(this).addClass('slick-current');
			$(this).siblings().removeClass('slick-current');
			$('slick-current').find("input[type='radio']").focus();
		});
	}


	//Яндекс карта
	var contactMap = $('#contact-map');
	if(contactMap.length > 0) {

		function createMap(groups) {

			ymaps.ready(yandexMapInit);

			function yandexMapInit() {
				//Центр карты по-умолчанию
				var defaultcenterMap = [50.447472, 30.503022],
					zoomMap = 13;

				var myMap = new ymaps.Map('contact-map', {
						center: defaultcenterMap,
						controls: []
				},{
					suppressMapOpenBlock: true
				});


				function createMenuGroup (groups, cityName, geoZoomMap) {
				
					var collection = new ymaps.GeoObjectCollection(null, { 
						iconLayout: 'default#image',
						iconImageHref: 'img/ico-map.svg' 
					});
	
					$('.contact-map__city').text(cityName);
					$('.contact-map__list').html('');
					
					for (var j = 0, m = groups[cityName].length; j < m; j++) {
						createSubMenu(groups[cityName][j], collection);
					}
	
					var setCenterMap = groups[cityName][0].setCenterMap,
						setCenterMapMobile = groups[cityName][0].setCenterMapMobile;
	
					myMap.geoObjects.removeAll();	
					myMap.geoObjects.add(collection);
	
					
					function centerMap () {
						if($(window).innerWidth() <= 767) {
							myMap.setCenter(setCenterMapMobile, 12);
						} else {
							myMap.setCenter(setCenterMap, geoZoomMap);	
						}
					}
	
					centerMap();
	
					$(window).on('resize', function() {
						centerMap();
					});
				}
			
				function createSubMenu (item, collection) {
			
					if(item.name !== undefined) {
						var submenuItem = $('<div class="contact-map__item"><a class="contact-map__geo" href="#" data-id="' + item.id + '">' + item.name + '</a></div>');
						submenuItem;
						submenuItem.appendTo('.contact-map__list');
					}
	
					var placemark = new ymaps.Placemark(item.center, {
						hintContent: item.name,
						opacity: 0
					}, {
						visible: true
					});
					collection.add(placemark);
	
	
					$('body').on('click', '.contact-map__geo', function(e) {
	
						e.preventDefault();
					
						var id = $(this).data('id');
	
						placemark.options.set('visible', false);
	
						if(item.id == id) {
							if(placemark.options._options.visible === true) {
								placemark.options.set('visible', false);
							} else {
								placemark.options.set('visible', true);
							}
						}
	
					});
	
				}
	
				//Фильтрация меток
				$('.select-address__item input[type="radio"]').on('change', function() {
					var cityName = $(this).val();
					console.log(groups);
					createMenuGroup(groups, cityName, 13);	    
				});	

				createMenuGroup(groups, 'Киров', zoomMap);  

			}

		}

		window.createMap = createMap;

	}


	//Скрыть/показать поиск в мобильной версии
	$('.search-show').on('click', function() {
		$('.top-line__search').toggleClass('open');
	});


	$('.search__hide').on('click', function(){
		$('.top-line__search').removeClass('open');
	});

	//Выбор города - выпадалка

	var selectCity = $('.select-city'),
		selectCurrent = $('.select-city__current-name');

	selectCity.on('click', function(){
		$(this).find('.select-city__list').toggleClass('open');
	});

	selectCity.find('.select-city__name').on('click', function(){
		selectCurrent.text($(this).text());
	});



	//Модальное окно галереи
	var gallFancybox = $(".gallery-fancybox");

	if(gallFancybox.length > 0) {

		gallFancybox.on('click', function(){
		 	var src = $(this).data('img'),
		 		title = $(this).data('title'),
		 		modal = $('#gallery-modal');	

		 		modal.find('.gallery-modal__img').attr('src',src);
		 		modal.find('.gallery-modal__title').text(title);

		 	$.fancybox.open({
		 		src: '#gallery-modal',
		 		autoSize: true,
		 		loop: true
	   		});
		}); 	
	
		$('.gallery-modal__close').on('click', function(){
			$.fancybox.close();
		});
	}


	//Модальное окно каталога

	var catalogFancybox = $(".catalog-fancybox");
	var catalogModal = $('#catalog-modal');

	if(catalogFancybox.length > 0) {

		$('body').on('click', '.catalog-fancybox', function(){

			var windowTitle = catalogModal.find('.catalog-modal__title'),
				windowPrice = catalogModal.find('.catalog-modal__price span'),
				windowPriceDate = catalogModal.find('.catalog-modal__price-descr span'),
				windowImg = catalogModal.find('.catalog-modal__img img'),
				windowInfo = catalogModal.find('.catalog-modal__container'),
				windowData = $(this).attr('data-load'),
				windowNav = catalogModal.find('.catalog-modal__nav'),
				windowThumbs = catalogModal.find('.catalog-modal__thumbs');
				
			var	isNextPage = $(this).closest('.catalog-grid__col').next().find('.catalog-fancybox'),
				isPrevPage = $(this).closest('.catalog-grid__col').prev().find('.catalog-fancybox'),
				nextPage = '<a class="catalog-modal__next" href="#">К следующему проекту</a>',
				prevPage = '<a class="catalog-modal__prev" href="#">К предыдущему проекту</a>'

				const isAttrDataLoadNext = typeof(isNextPage.attr('data-load')) !== 'undefined';
				const isAttrDataLoadPrev = typeof(isPrevPage.attr('data-load')) !== 'undefined';

				if(isAttrDataLoadNext && isAttrDataLoadPrev) {
					windowNav.html(prevPage + nextPage)
				} else if(!isAttrDataLoadPrev && isAttrDataLoadNext){
					windowNav.html(nextPage)
				} else if(isAttrDataLoadPrev && !isAttrDataLoadNext){
					windowNav.html(prevPage)
				} else {
					windowNav.html('')
				}

				windowNav.find('.catalog-modal__next').on('click', function(){	
					isNextPage.trigger('click');
				});

				windowNav.find('.catalog-modal__prev').on('click', function(){	
					isPrevPage.trigger('click');
				});

				if(typeof(windowData) !== 'undefined') {
					$.fancybox.close({
						src: "#catalog-modal"
					})
	
					$.fancybox.open({
						src: "#catalog-modal",
						fullScreen: {
							autoStart: true
						},
						opts: {
						  beforeShow: function beforeShow() {
							windowInfo.css({
							  'opacity': 0
							});
						  },
						  afterShow: function afterShow(instance) {
							$.ajax({
							  type: 'GET',
							  url: windowData,
							  dataType: 'json',
							  success: function success(data) {
								windowTitle.html(data.title);
								windowPrice.html(data.price);
								windowPriceDate.html(data.price_time);
								windowImg.attr('src', 'http://virazh.h6.srv43.ru' + data.photo[0].original);
								windowThumbs.html('');
	
								data.photo.map(function(item, index) {
									var active = index === 0 ? 'slick-current' : ''
									windowThumbs.append('<div class="catalog-modal__thumbs-item ' + active +'"><a class="catalog-modal__thumbs-link" href="' + 'http://virazh.h6.srv43.ru' + item.original +'">' + '<img src="' + 'http://virazh.h6.srv43.ru' + item.thumb +'"/></a></div>')
								});

								const catalogModalThumb = windowThumbs.find('.catalog-modal__thumbs-item');

								if(catalogModalThumb.length > 0) {

									catalogModalThumb.on('click', function(e){
										e.preventDefault()
										$(this).addClass('slick-current').siblings().removeClass('slick-current');
										windowImg.attr('src', $(this).children().attr('href'));
									});

									windowThumbs.slick({
										infinite: false,
										slidesToShow: 3,
										slidesToScroll: 1,
										vertical: true,
										focusOnSelect: true,
										prevArrow: '<button type="button" class="catalog-modal__thumbs-prev">Previous<\/button>',
										nextArrow: '<button type="button" class="catalog-modal__thumbs-next">Next<\/button>',
										responsive: [{
											breakpoint: 1199,
											settings: {
												vertical: false,
												slidesToShow: 3,
												slidesToScroll: 1,
												prevArrow: '<button type="button" class="catalog-modal__thumbs-prev red">Previous<\/button>',
												nextArrow: '<button type="button" class="catalog-modal__thumbs-next red">Next<\/button>',
											}
										  },{
											breakpoint: 480,
											settings: {
												vertical: false,
												slidesToShow: 2,
												slidesToScroll: 1,
												prevArrow: '<button type="button" class="catalog-modal__thumbs-prev red">Previous<\/button>',
												nextArrow: '<button type="button" class="catalog-modal__thumbs-next red">Next<\/button>',
											}
										  }]
									}); 

									windowThumbs.on('beforeChange', function(event, slick, currentSlide, nextSlide){
										const hrefBigSlide = $(this).find("[data-slick-index=" + nextSlide + "] a").attr('href');
										windowImg.attr('src', hrefBigSlide);
									});

									windowThumbs.slick('setPosition');
								}
	
								windowImg.on('load', function () {
									windowInfo.css({
									  'opacity': 1
									});
									windowImg.css({
									  'opacity': 1
									});
								});
	
							  }
							});
						  }
						}
					  });
				}		
				$('.catalog-modal__close').on('click', function(){
					$.fancybox.close();
					windowThumbs.slick('unslick');
				});		

				windowThumbs.slick('unslick');
		});

		
	}

	//Запуск видео на внутренних страницах
	$('.video-play-js').on('click', function(e){
		
		e.preventDefault();

		if($(this).hasClass('open')) {
			return false;
		} else {
			var videoTag = '<iframe src="' + $(this).data('video') + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
			$(this).addClass('open');
			$(this).find('.video-iframe-js').html(videoTag);
		}
		 
	});

  function scrollNav() {
    $("a[href^='#nav']").on("click", function () {
      var _href = $(this).attr("href");

      $("html, body").animate({
        scrollTop: $(_href).offset().top + "px"
      });
      return false;
    });
  }

	 scrollNav();

});