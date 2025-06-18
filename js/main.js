$(document).ready(function () {

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  // scroll events
  var zero = 0;
  var header = $('header.header');
  $(window).on('scroll', function () {
    let $scrollPosition = $(this).scrollTop();
    gsap.to('.triangle-shape', { rotation: '+=' + ($scrollPosition / 500) + 'deg' });
    header.toggleClass('hide', $(this).scrollTop() > zero);
    zero = $(this).scrollTop();

    if ($(window).scrollTop() > 500) {
      gsap.to('.back-to-top', { autoAlpha: 1 });
    } else {
      gsap.to('.back-to-top', { autoAlpha: 0 });
    }
    $('.back-to-top').click(function (e) {
      e.preventDefault();
      gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "none" });
    });

  });

  let tlBanner = gsap.timeline();

  tlBanner
    .to('.preloader .line .progress', { duration: 1, scaleY: 1 })
    .to('.preloader .logo-8x img', { duration: 1, autoAlpha: 1 }, '<')
    .to('.preloader .logo', { autoAlpha: 1 }, '<')
    .to('.preloader .logo-8x .bar', { duration: 1, scaleX: 1, ease: 'power1.inOut' }, "<")
    .to('.preloader .logo-8x', { duration: 1, delay: 1, autoAlpha: 0, xPercent: -100, ease: 'power1' })
    .to('.preloader .logo', { autoAlpha: 0 }, '<')
    .to('.preloader .line', { duration: 1, scaleY: 0, transformOrigin: 'top' }, '<')
    .to('.preloader .top', { duration: 2, scaleY: .2, ease: 'expo.inOut' })
    .to('.preloader .bottom', { duration: 2, scaleY: .2, ease: 'expo.inOut' }, '<')
    .to('.banner .carousel', { duration: 1.7, scale: 1, ease: 'expo.inOut' })
    .to('.preloader', { duration: 1.5, xPercent: 100, ease: 'expo.inOut' }, '<')
    .to('.banner .bg', { duration: 1.5, xPercent: 100, ease: 'expo.inOut' }, '<')
    .to('.contact-form', { duration: 1.5, autoAlpha: 1 }, '-=.7')
    .to('.banner .carousel .after', { duration: 1, scaleY: 1, ease: 'expo.inOut' }, '<')
    .to('.banner .carousel .carousel-caption', { duration: 1, autoAlpha: 1 }, '<')
    .to('header.header', { duration: 1, autoAlpha: 1 }, '<')
    .to('.triangle-shape', { duration: 1, x: 0, ease: 'expo.out' }, '<')
    .to('ul.social-links', { duration: 1, autoAlpha: 1 }, '<')
    .to('body', { position: 'static' }, '<')

  // tlBanner.timeScale(15);
  // tlBanner.seek(8);



  // ANIMATE SITE BUTTON
  $(".site-btn").mouseenter(function (e) {
    var parentOffset = $(this).offset();
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;
    $(this).find(".circle").css({ "left": x, "top": y });
    $(this).find(".circle").removeClass("desplode-circle");
    $(this).find(".circle").addClass("explode-circle");
  });

  $(".site-btn").mouseleave(function (e) {
    var parentOffset = $(this).offset();
    var x = e.pageX - parentOffset.left;
    var y = e.pageY - parentOffset.top;
    $(this).find(".circle").css({ "left": x, "top": y });
    $(this).find(".circle").removeClass("explode-circle");
    $(this).find(".circle").addClass("desplode-circle");
  });

  // ANIMATE ABOUT SECTION
  let aboutTl = gsap.timeline();
  aboutTl.to('section.about .about-bg', { scale: 1 })
    .to('section.about .about-bg', { scale: 1.3, transformOrigin: '0 50%' })
    .to('section.about h2.main-title', { autoAlpha: 1, y: 0 }, '<')
    .to('section.about .box', { autoAlpha: 1, y: 0, stagger: .1 })
  ScrollTrigger.create({
    trigger: 'section.about',
    animation: aboutTl,
    start: 'top top',
    end: '+=200%',
    scrub: .2,
    pin: 'section.about',
    // pinSpacing: false,
    // markers: true
  })

  // ANIMATE PROJECT SECTION
  gsap.to('section.project-details .lamp', {
    scrollTrigger: {
      trigger: 'section.project-details .lamp',
      start: 'top 10%',
      end: '+=100%',
      toggleClass: 'light',
      // markers: true
    }
  })

});