gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});






// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();






var tl = gsap.timeline()

tl.from("#nav h3", {
    y: -50,
    opacity: 0,
    delay:0.4,
    duration:1,
    stagger:0.3
})

tl.from("#main-1 h1", {
    x: -500,
    opacity: 0,
    duration: 0.8,
    stagger: 0.5
})

tl.from("img", {
    x: 100,
    rotate: 45,
    opacity: 0,
    duration: 0.5,
    stagger: 0.5
})





gsap.to("#main-2 h1", {
    transform: "translateX(-100%)",
    scrollTrigger:{
        trigger:"#main-2",
        scroller:"#main",
        // markers:true,
        start:"top 0",
        end:"top -100%",
        scrub:2,
        pin:true
    }
})



// Test by changing opacity to verify image presence
gsap.set("#img4", {opacity: 1, x: 0}); // Ensure image becomes visible immediately

gsap.from("#main-3 h1",{
    x: -500,
    opacity: 0,
    duration: 2,
    stagger: 0.5,
    scrollTrigger:{
        trigger:"#main-3",
        scroller:"#main",
        start: "top 80%", // Animation starts when #main-3 top reaches 80% of the viewport
        end: "top 20%", // Ends when the top reaches 20% of the viewport
        scrub: true // Smooth animation while scrolling
    }
})

// Scroll-triggered animation for #img4 (image in #main-3)
gsap.from("#img4", {
    x: 500, // Moves from the right
    opacity: 0, // Starts with no opacity
    delay:2,
    duration: 5,
    scrollTrigger: {
        trigger: "#main-3", // Animation starts when #main-3 is in view
        scroller: "#main",
        // markers: true, // Enable markers for debugging
        start: "top 80%", // Animation starts when #main-3 top reaches 80% of the viewport
        end: "top 20%", // Ends when the top reaches 20% of the viewport
        scrub: true // Smooth animation while scrolling
    }
})

