document.addEventListener("DOMContentLoaded", () => {
    const sections = ["#work", "#projects"];

    // Attach click listeners
    sections.forEach((section) => {
        document.querySelector(`a[href='${section}']`).addEventListener("click", () => {
            handleSectionAnimation(section);
        });
    });

    // Handle initial hash if present
    const initialHash = window.location.hash;
    if (sections.includes(initialHash)) {
        console.log(`${initialHash} section detected on page load`);
        handleSectionAnimation(initialHash);
    }
});

// Detect direct URL navigation (hashchange event)
window.addEventListener("hashchange", () => {
    const currentHash = window.location.hash;
    const sections = ["#work", "#projects"];

    if (sections.includes(currentHash)) {
        console.log(`Navigated directly to ${currentHash}`);
        handleSectionAnimation(currentHash);
    }
});

function handleSectionAnimation(section) {
    setTimeout(() => {
        resetTimelineAnimation(section); 
        runTimelineAnimation(section); 
    }, 800);
}

function resetTimelineAnimation(section) {
    console.log(`Resetting timeline for ${section}...`);

    document.querySelectorAll(`${section} .timeline-content`).forEach((el) => {
        el.style.visibility = '';  
        el.style.transform = '';   
        el.style.opacity = '';     
        el.classList.remove('sr', 'sr--reveal', 'sr--visible');
    });

    if (window.sr) {
        window.sr.destroy(); 
    }
}

function runTimelineAnimation(section) {
    console.log(`Running timeline animation for ${section}...`);

    window.sr = ScrollReveal();

    if (window.innerWidth < 768) {
        console.log("Mobile detected");

        document.querySelectorAll(`${section} .timeline-content`).forEach((el) => {
            el.classList.remove('js--fadeInLeft');
            el.classList.add('js--fadeInRight');
        });

        sr.reveal(`${section} .js--fadeInRight`, { 
            origin: 'right', 
            distance: "300px",
            duration: 800,
            easing: "ease-in-out",
            reset: false 
        });

    } else {
        console.log("Desktop detected");

        sr.reveal(`${section} .js--fadeInLeft`, { 
            origin: 'left', 
            distance: "300px",
            duration: 800,
            easing: "ease-in-out",
            reset: false 
        });

        sr.reveal(`${section} .js--fadeInRight`, { 
            origin: 'right', 
            distance: "300px",
            duration: 800,
            easing: "ease-in-out",
            reset: false 
        });
    }
}
