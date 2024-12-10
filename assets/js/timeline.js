// Detect hash change
window.addEventListener("hashchange", handleHashChange);

// Detect on initial page load
if (window.location.hash === "#work") {
    console.log("Work section detected on page load");
    runTimelineAnimation();
}

// Hash change handler
function handleHashChange() {
    if (window.location.hash === "#work") {
      console.log("Work section detected on hash change");

      // Reset all animated elements before running the animation
      resetTimelineElements();

      // Delay the animation after hash navigation to allow scrolling
      setTimeout(runTimelineAnimation, 300); 
    }
}

function resetTimelineElements() {
    $(".timeline-content")
    .removeClass("js--fadeInLeft js--fadeInRight visible")
    .css({ opacity: 0, transform: "translateY(50px)" });
  console.log("Reset timeline elements");
}

function runTimelineAnimation() {
    console.log("Timeline JS Loaded");

    window.sr = ScrollReveal({
        reset: true, // Allows repeating animations on scroll
        distance: "300px",
        duration: 800,
        easing: "ease-in-out",
    });
  
    if ($(window).width() < 768) {
        console.log("Mobile detected");

        if ($('.timeline-content').hasClass('js--fadeInLeft')) {
            console.log("Switching animation to js--fadeInRight");

            $('.timeline-content').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
        }
  
        sr.reveal('.js--fadeInRight', { origin: 'right' });
  
    } else {
        console.log("Desktop Detected");
        sr.reveal('.js--fadeInLeft', { origin: 'left' });
        sr.reveal('.js--fadeInRight', { origin: 'right' });
  
    }

    // Force visibility
    $('.timeline-content').addClass('visible');

    // Synchronize ScrollReveal if needed
    sr.sync();
  };
  