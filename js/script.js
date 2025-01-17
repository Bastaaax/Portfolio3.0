/**
*	Oblo - Creative Portfolio Template (HTML)
*	Version: 1.1
*	Author: beshleyua
*	Author URL: http://themeforest.net/user/beshleyua
*	Copyright © Oblo by beshleyua. All Rights Reserved.
**/

( function( $ ) {
	'use strict';

/** 
	Preloader 
**/
$(window).on("load", function() {
	$('body').imagesLoaded( {}, function() {
		var preload = $('.preloader');
		preload.addClass('loaded');
		preload.find('.centrize').fadeOut();
		/*setTimeout(function(){*/

			/**
				hide Preloader
			
			preload.fadeOut();**/

			/**
				init Cursor
			**/
			initCursor();

			/**
				init Scrolla
			**/
			$('.scroll-animate').scrolla({
				once: true,
				mobile: true
			});

			/** 
				init Hero Slider 
			**/
			if($('.main-slider-items__image').length) {
			initMainSlider();
			}

			/** 
				init Full Slider 
			**/

			if($('.full-slider-items__image').length) {
			initFullSlider();
			}

			/** 
				init Half Slider 
			**/
			if($('.half-slider-items__image').length) {
			initHalfSlider();
			}

			/** 
				init Hero Started 
			**/
			if($('.started-items__image').length) {
			initHeroStarted();
			}

		/*}, 1200);*/
	});
});

$(function() {
	'use strict';

	setHeightFullSection();
	$(window).resize(function() {
		setHeightFullSection();
	});

	/**
		Splitting
	**/
	Splitting();

	/**
		Skrollr
	**/
	if ($(window).width() > 1200 ) {
	var s = skrollr.init();
	}

	/**
		Header Sticky
	**/
	if($('.navbar').length) {
		$(window).on('scroll', function(event){
			//console.log(this.oldScroll > this.scrollY);
			
			if ( $(window).scrollTop() > 100 ) {
				$('.header').addClass('sticky');
				if ( this.oldScroll < this.scrollY ) {
					$('.header').addClass('animate-in');
				} else {
					if ( $(window).scrollTop() < 200 ) {
						$('.header').addClass('animate-out');
					}
				}
			} else {
				$('.header').removeClass('sticky');
				$('.header').removeClass('animate-in');
				$('.header').removeClass('animate-out');
			}

			this.oldScroll = this.scrollY;
		});
	}

	function checkScrollDirectionIsUp(event) {
		if (event.wheelDelta) {
			return event.wheelDelta > 0;
		}
		return event.deltaY < 0;
	}

	/**
		Navbar OnePage
	
	if($('.navbar').length) {
		$('.navbar ul li a').on('click', function(){
			var id = $(this).attr('href');
			var h = parseFloat($(id).offset().top);
			
			$('body,html').animate({
				scrollTop: h
			}, 800);
			
			return false;
		});
	}**/

	/**
		Menu Full Overlay
	**/
	$('.header').on('click', '.menu-btn.full', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).addClass('no-touch');
			$('body').removeClass('no-scroll');
			$('.menu-full-overlay').removeClass('is-open');
			$('.menu-full-overlay').removeClass('has-scroll');
			$('.menu-full-overlay').removeClass('animate-active');
			setTimeout(function(){
				$('.menu-full-overlay').removeClass('visible');
				$('.menu-btn.full').removeClass('no-touch');
			}, 1000);
		}
		else {
			$(this).addClass('active no-touch');
			var height = $(window).height();
			$('.menu-full-overlay').css({'height': height});
			$('body').addClass('no-scroll');
			$('.menu-full-overlay').addClass('is-open visible');
			setTimeout(function(){
				$('.menu-full-overlay').addClass('has-scroll animate-active');
				$('.menu-btn.full').removeClass('no-touch');
			}, 1000);
		}
		return false;
	});

	/**
		Menu Full Overlay Submenu
	**/
	$('.menu-full').on('click', '.has-children > a', function(){
		if($(this).closest('li').hasClass('opened')) {
			$(this).closest('li').removeClass('opened');
			$(this).closest('li').addClass('closed');
			$(this).closest('li').find('> ul').css('max-height', 0);
		} else {
			$(this).closest('ul').find('> li').removeClass('closed').removeClass('opened');
			$(this).closest('ul').find('> li').find('> ul').css('max-height', 0);
			
			$(this).closest('li').addClass('opened');

			var submenu_h = 0;
			$(this).closest('li').find('> ul > li').each(function(){
				submenu_h += $(this).height() + 20;
			});
			$(this).closest('li').find('> ul').css('max-height', submenu_h + 20);
		}
		return false;
	});

	/**
		Works Carousel
	**/
	var works_carousel = new Swiper('.m-works-carousel .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 30,
		centeredSlides: true,
		speed: 700,
		loop: true,
		pagination: false,
		keyboard: true,
		mousewheel: true,
		preventInteractionOnTransition: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 3,
			},
		}
	});

	/**
		Gallery Carousel
	**/
	var gallery_carousel = new Swiper('.m-gallery-carousel .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 100,
		speed: 700,
		loop: false,
		pagination: false,
		breakpoints: {
			0: {
				spaceBetween: 30,
			},
			768: {
				spaceBetween: 50,
			},
			1200: {
				spaceBetween: 100,
			},
		}
	});

	/*
		Initialize portfolio items
	*/
	var $container = $('.works-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.works-col',
			percentPosition: true,
		});
	});

	/*
		Filter items on button click
	*/
	$('.filter-links').on( 'click', 'a', function() {
		var filterValue = $(this).attr('data-href');
		$container.isotope({ filter: filterValue });

		$('.filter-links a').removeClass('active');
		$(this).addClass('active');

		if (!$(filterValue).find('.scroll-animate').hasClass('animate__active')) {
			$(filterValue).find('.scroll-animate').addClass('animate__active');
		}

		return false;
	});

	/*
		Image popup
	
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});*/
	
	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
            patterns: {
                youtube_short: {
                  index: 'youtu.be/',
                  id: 'youtu.be/',
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
				  
                }
            }
        },
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay')   ;
			}
		}
	});
	
	/*
		Music popup
	*/
	$('.has-popup-audio').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});

	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
        var gallery = $(this).attr('href');
    
        $(gallery).magnificPopup({
            delegate: 'a',
            type:'image',
            closeOnContentClick: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            fixedContentPos: false,
            gallery: {
                enabled: true
            }
        }).magnificPopup('open');

        return false;
    });

	/**
		Tabs
	**/
	$('.tab-menu').on('click', '.tab-btn', function(){
		var tab_bl = $(this).attr('href');
		
		$(this).closest('.tab-menu').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		
		$(this).closest('.tabs').find('> .tab-item').hide();
		$(tab_bl).fadeIn();

		return false;
	});

	/**
		Collapse
	**/
	$('.collapse-item').on('click', '.collapse-btn', function(){
		if($(this).closest('.collapse-item').hasClass('active')) {
			$(this).closest('.collapse-item').find('.collapse-content').slideUp();
			$(this).closest('.collapse-item').removeClass('active');
			$(this).removeClass('active');
		}
		else {
			$(this).closest('.collapse-item').find('.collapse-content').slideDown();
			$(this).closest('.collapse-item').addClass('active');
			$(this).addClass('active');
		}
	});

	/**
		Video
	**/
	$('.m-video-large .video').on('click', '.play, .img', function(){
		$(this).closest('.video').addClass('active');
		var iframe = $(this).closest('.video').find('.js-video-iframe');

		largeVideoPlay(iframe);

		return false;
		
	});

	/**
		Google Map Init
	**/
	if($('#map').length) {
		initMap();
	}

	function largeVideoPlay( iframe ) {
		var src = iframe.data('src');
		iframe.attr('src', src);
	}
});

/**
	Google Map Options
**/
function initMap() {
	var myLatlng = new google.maps.LatLng(40.773328,-73.960088); // <- Your latitude and longitude
	var styles = [
	  {
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#212121"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.icon",
	    "stylers": [
	      {
	        "visibility": "off"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#212121"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative.country",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#9e9e9e"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative.locality",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#bdbdbd"
	      }
	    ]
	  },
	  {
	    "featureType": "poi",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#181818"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#616161"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#1b1b1b"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "geometry.fill",
	    "stylers": [
	      {
	        "color": "#2c2c2c"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#8a8a8a"
	      }
	    ]
	  },
	  {
	    "featureType": "road.arterial",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#373737"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#3c3c3c"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway.controlled_access",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#4e4e4e"
	      }
	    ]
	  },
	  {
	    "featureType": "road.local",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#616161"
	      }
	    ]
	  },
	  {
	    "featureType": "transit",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#757575"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#3d3d3d"
	      }
	    ]
	  }
	]

	var mapOptions = {
		zoom: 14,
		center: myLatlng,
		mapTypeControl: false,
		disableDefaultUI: true,
		zoomControl: true,
		scrollwheel: false,
		styles: styles
	}
	
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'We are here!'
	});
}

/*function initCursor() {
	var mouseX=window.innerWidth/2, mouseY=window.innerHeight/2;

	var cursor = {
		el: $('.cursor'),
		x: window.innerWidth/2, 
		y: window.innerHeight/2, 
		w: 30, 
		h: 30, 
		update:function() {
			var l = this.x-this.w/2; 
			var t = this.y-this.h/2; 
			this.el.css({ 'transform':'translate3d('+l+'px,'+t+'px, 0)' }); 
		}
	}

	$(window).mousemove (function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	$('a, .swiper-pagination, .swiper-buttons, button, .button, .btn').hover(function() {
		$('.cursor').addClass("cursor-zoom");
	}, function(){
		$('.cursor').removeClass("cursor-zoom");
	});

	setInterval(move,1000/60);
	
	function move() {
		cursor.x = lerp (cursor.x, mouseX, 0.1);
		cursor.y = lerp (cursor.y, mouseY, 0.1);
		cursor.update() 
	}

	function lerp (start, end, amt) {
		return (1-amt)*start+amt*end
	}
}*/

function setHeightFullSection() {
	var width = $(window).width();
	var height = $(window).height();

	/* Set full height in started blocks */
	$('.section.main-slider, .section.full-slider, .section.half-slider, .section.m-works-carousel, .section.m-contacts-map, .error-page, .section.hero-started, .menu-full-overlay, .preloader .centrize').css({'height': height});
	$('.logged-in .section.main-slider, .logged-in .section.full-slider, .logged-in .section.half-slider, .logged-in .section.m-works-carousel, .logged-in .section.m-contacts-map, .logged-in .error-page, .logged-in .section.hero-started').css({'height': height-32});
	if(width < 783) {
		$('.section.main-slider, .section.full-slider, .section.half-slider, .section.m-works-carousel, .section.m-contacts-map, .error-page, .section.hero-started, .menu-full-overlay, .preloader .centrize').css({'height': height});
		$('.logged-in .section.main-slider, .logged-in .section.full-slider, .logged-in .section.half-slider, .logged-in .section.m-works-carousel, .logged-in .section.m-contacts-map, .logged-in .error-page, .logged-in .section.hero-started').css({'height': height-46});
	}
}

} )( jQuery );