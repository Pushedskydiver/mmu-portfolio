(function($) {
  "use strict";





//------------------------------------- START: Smooth scroll setup ------------------------------------------------//

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
      $('html,body').animate({
          scrollTop: target.offset().top
    -40}, 2000);
      return false;
       }
      }
   });
});

//------------------------------------- END: Smooth scroll setup ------------------------------------------------//





//------------------------------------- START: Navigation setup ------------------------------------------------//

$(function() {
    //caches a jQuery object containing the header element
    var header = $('header');
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var nav = $('.nav');

        if (scroll > 50) {
                nav.addClass('dark').fadeIn(1000);

            }
          else {
            if (scroll != 0) {
            nav.removeClass('dark').fadeIn(500);
          }
        }

    });
  });

//------------------------------------- END: Navigation setup ------------------------------------------------//





//------------------------------------- START: Mobile navigation setup ------------------------------------------------//

$(function() {
  var ww = $(window).width();

  if (ww > 700) {
  	$('.trigger-nav').css('display', 'none');
  	$('.main-nav').css('display', 'block');
  } else {
  	$('.trigger-nav').css('display', 'block');
  	$('.main-nav').css('display', 'none');
  }

  $('.trigger-nav').on('click', function() {

  	if (!$(this).hasClass('open-nav')) {
  		$(this).addClass('open-nav');
  		toggleNav(true);
  	} else {
  		$(this).removeClass('open-nav');
  		toggleNav(false);
  	}

  });

  $(window).bind('resize', function() {

  	if (ww > 700) {
  		$('.trigger-nav').css('display', 'none');
  		$('.main-nav').css('display', 'block');

  		if ($('.trigger-nav').hasClass('open-nav')) {
  			$('.trigger-nav').removeClass('open-nav');
  		}
  	} else {
  		$('.trigger-nav').css('display', 'block');
  		$('.main-nav').css('display', 'none');
  	}

  });

  $(window).bind('scroll', function() {

  	if ($('.trigger-nav').hasClass('open-nav')) {
  		$('.trigger-nav').removeClass('open-nav');
  		toggleNav(false);
  	}

  });

  function toggleNav(bool) {

  	if (bool === true) $('.main-nav').slideDown();
  	else $('.main-nav').slideUp();

  }

});

//------------------------------------- END: Mobile navigation setup ------------------------------------------------//





//------------------------------------- START: Contact form animation setup ------------------------------------------------//

$(".input-field").each(function () {
    var $this = $(this);
    if ($this.val().length) {
        $this.parent().addClass("input-filled")
    }
    $this.on("focus", function () {
        $this.parent().addClass("input-filled");
    });
    $this.on("blur", function () {
        if (!$this.val().length) {
            $this.parent().removeClass("input-filled")
        }
    })
});

$(function () {

  // Get the form.
  var form = $('#ajax-contact'),
      // Get the messages div.
      formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
      // Stop the browser from submitting the form.
      e.preventDefault();


      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
              type: 'POST',
              url: $(form).attr('action'),
              data: formData
          })
          .done(function (response) {
              // Make sure that the formMessages div has the 'success' class.
              $(formMessages).removeClass('error').addClass('success').fadeIn().delay(5000).fadeOut();
              // Set the message text.
              $(formMessages).text(response);

              // Clear the form.
              $(form).trigger("reset");
          })
          .fail(function (data) {
              // Make sure that the formMessages div has the 'error' class.
              $(formMessages).removeClass('success').addClass('error').fadeIn().delay(5000).fadeOut();
              // Set the message text.
              if (data.responseText !== '') {
                  $(formMessages).text(data.responseText);
              } else {
                  $(formMessages).text('Oops! An error occured and your message could not be sent.');
              }


          });

    });

});

//------------------------------------- END: Contact form animation setup ------------------------------------------------//





//------------------------------------- START: Parallax setup ------------------------------------------------//

$('.parallax-window').parallax({
    imageSrc: 'images/bg.jpg',
  });

  $('.parallax-window-blog').parallax({
      imageSrc: 'images/blog-intro.jpg',
    });

//------------------------------------- END: Parallax setup ------------------------------------------------//



})(jQuery);
