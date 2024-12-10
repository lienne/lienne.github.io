document.querySelector("a[href='#work']").addEventListener("click", () => {
    setTimeout(() => {
        resetTimelineAnimation();  // Reset animations before running them
        runTimelineAnimation(); 
    }, 800);
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#work") {
        console.log("Work section detected on page load");
        setTimeout(() => {
            resetTimelineAnimation(); 
            runTimelineAnimation(); 
        }, 800);
    }
});

function resetTimelineAnimation() {
    console.log("Resetting timeline...");

    // Remove all ScrollReveal styles and classes
    document.querySelectorAll('.timeline-content').forEach((el) => {
        el.style.visibility = '';  // Reset visibility
        el.style.transform = '';   // Reset transforms
        el.style.opacity = '';     // Reset opacity
        el.classList.remove('sr', 'sr--reveal', 'sr--visible');
    });

    if (window.sr) {
        window.sr.destroy();  // Remove ScrollReveal instance if it exists
    }
}

function runTimelineAnimation() {
    console.log("Running timeline animation...");

    // Create new ScrollReveal instance
    window.sr = ScrollReveal();

    if (window.innerWidth < 768) {
        console.log("Mobile detected");

        document.querySelectorAll('.timeline-content').forEach((el) => {
            el.classList.remove('js--fadeInLeft');
            el.classList.add('js--fadeInRight');
        });

        sr.reveal('.js--fadeInRight', { 
            origin: 'right', 
            distance: "300px",
            duration: 800,
            easing: "ease-in-out",
            reset: false 
        });

    } else {
        console.log("Desktop detected");

        sr.reveal('.js--fadeInLeft', { 
            origin: 'left', 
            distance: "300px",
            duration: 800,
            easing: "ease-in-out",
            reset: false 
        });

        sr.reveal('.js--fadeInRight', { 
            origin: 'right', 
            distance: "300px",
            duration: 800,
            easing: "ease-in-out",
            reset: false 
        });
    }
}
