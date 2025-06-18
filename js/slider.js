let totalItems = $(".banner .carousel-item").length;
let currentIndex = $(".banner .carousel-item.active").index() + 1;
$(".num").html(`0${currentIndex} / 0${totalItems}`);

$("#home-slider").on("slid.bs.carousel", function () {
  currentIndex = $(".carousel-item.active").index() + 1;
  $(".num").html(`0${currentIndex} / 0${totalItems}`);
});

// DISABLE NEXT & PREV ARROWS ON SLIDE
$("#home-slider").on("slid.bs.carousel", checkitem);
function checkitem() {
  currentSlide = $(this).find(".carousel-item.active");
  if (currentSlide.is(":first-child")) {
    $(".carousel-control-prev").addClass("disabled");
    return;
  } else {
    $(".carousel-control-prev").removeClass("disabled");
  }
  if (currentSlide.is(":last-child")) {
    $(".carousel-control-next").addClass("disabled");
    return;
  } else {
    $(".carousel-control-next").removeClass("disabled");
  }
}
