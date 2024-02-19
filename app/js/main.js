
$(function () {
  // Змінні
  var header = $(".header");
  var videoBox = document.querySelector('.video__box');
  var wow;

  // Логіка скролла заголовка
  $(window).scroll(function () {
    var scrollPosition = $(window).scrollTop();
    updateHeaderStyles(scrollPosition);
  });

  // Клік на пункт меню
  $('.menu__dropdown').click(function (event) {
    event.preventDefault();
    var isOpen = $(this).hasClass('active');

    $('.menu__dropdown').removeClass('active');
    $('.submenu').removeClass('active');

    if (!isOpen) {
      $(this).addClass('active');
      $(this).next('.submenu').addClass('active');
    }

    updateHeaderStyles($(window).scrollTop());
  });

  // Оновлення стилів заголовка
  function updateHeaderStyles(scrollPosition) {
    if (scrollPosition > 0) {
      header.addClass("scroll");
    } else {
      header.removeClass("scroll");
    }
  }

  // Hover на елементах сервісу
  $('.service__item').hover(
    function () {
      $(this).find('.service__item-btn').addClass('active');
    },
    function () {
      $(this).find('.service__item-btn').removeClass('active');
    }
  );

  // Розгортання/згортання спойлера
  $('.spoiler__box-title').on('click', function () {
    var spoilerBox = $(this).closest('.spoiler__box');
    var isActive = spoilerBox.find('.spoiler__box-text').hasClass('active');

    $('.spoiler__box-text').removeClass('active').slideUp(300);
    $('.spoiler__box-title').removeClass('active');

    if (!isActive) {
      spoilerBox.find('.spoiler__box-text').addClass('active').slideDown(300);
      $(this).addClass('active');
    }
  });

  // Відтворення відео
  videoBox.addEventListener('click', function () {
    if (videoBox.classList.contains('video__box--ready')) {
      return;
    }

    videoBox.classList.add('video__box--ready');
    var src = videoBox.getAttribute('data-src');
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.frameBorder = 0;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    var imgClone = videoBox.querySelector('.video__box-img').cloneNode(true);

    videoBox.innerHTML = '';
    videoBox.appendChild(iframe);
    videoBox.appendChild(imgClone);

    iframe.addEventListener('load', function () {
      iframe.contentWindow.postMessage('{"event":"command","func":"addEventListener","args":["onStateChange","finishVideo"]}', '*');
    });

    window.finishVideo = function (event) {
      if (event.data === 0) {
        videoBox.innerHTML = '';
        videoBox.appendChild(imgClone);
        videoBox.classList.remove('video__box--ready');
      }
    };
  });

  // Клік на зображення в тестимоніалі
  $('.testimonial__img-box').click(function () {
    var itemDescr = $(this).siblings('.testimonial__item-descr');
    itemDescr.toggleClass('active');
  });

  // Ініціалізація слайдера
  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    speed: 800,
    prevArrow: null,
  });

  // Ініціалізація анімації WOW.js
  wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 0,
    mobile: true,
    live: true
  });
  wow.init();

  // Клік на бургер-меню
  $('.burger-menu').click(function () {
    $(this).toggleClass('active');
    $('.menu').toggleClass('active');
  });

  // Клік на заголовок елемента сервісу
  $('.service__item-title').click(function () {
    $(this).toggleClass('active');
  });

  // Клік на кнопці тестимоніалу
  $(".testimonial__btn").click(function (event) {
    event.preventDefault();
    $(".testimonial__item").not(":first").toggleClass("hidden");
    toggleButtonText();
  });

  // Зміна тексту кнопки тестимоніалу
  function toggleButtonText() {
    var buttonText = $(".testimonial__btn").text();
    if (buttonText === "view more") {
      $(".testimonial__btn").text("hide");
    } else {
      $(".testimonial__btn").text("view more");
    }
  };

});

