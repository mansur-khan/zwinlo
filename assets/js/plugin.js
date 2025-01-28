import Lenis from 'lenis';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Parallax, Thumbs } from 'swiper/modules';
import { Power2, gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from 'split-type';
import Splitting from "splitting";
import Choices from 'choices.js';

document.addEventListener("DOMContentLoaded", function () {

    // Initialize Lenis for smooth scrolling
    // const lenis = new Lenis({ smooth: true, duration: 2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    // function raf(time) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);

    // Initialize splitting
    Splitting();
    // Initialize Swipers
    const initSwiper = (selector, config) => {
        const element = document.querySelector(selector);
        if (element) {
            return new Swiper(element, config);
        }
        return null;
    };

    // testimonial slider
    initSwiper('.testimonial-swiper', {
        modules: [Autoplay, Navigation],
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        speed: 1000,
        autoplay: { delay: 6000, },
        navigation: { nextEl: '.testimonial-next', prevEl: '.testimonial-prev' },
    });

    // product slider
    let productThumb = initSwiper('.swiper-thumb', {
        modules: [Thumbs],
        slidesPerView: 4,
        spaceBetween: 10,
    });

    initSwiper('.product-swiper', {
        modules: [Thumbs],
        slidesPerView: 1,
        spaceBetween: 0,
        // loop: true,
        thumbs: {
            swiper: productThumb,
        }
    });
 
    // Initialize choices
    const petType = document.getElementById('pet-type');
    if (petType) {
        new Choices(petType, {
            shouldSort: false,
        });
    }

    const serviceType = document.getElementById('service-type');
    if (serviceType) {
        new Choices(serviceType, {
            shouldSort: false,
        });
    }


    const sortType = document.getElementById('sort-type');
    if (sortType) {
        new Choices(sortType, {
            shouldSort: true,
        });
    }
    const countryName = document.getElementById('country-name');
    if (countryName) {
        new Choices(countryName, {
            shouldSort: true,
        });
    }
    const stateName = document.getElementById('state-name');
    if (stateName) {
        new Choices(stateName, {
            shouldSort: true,
        });
    }

    // gsap
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger,);

    // Blur animation
    gsap.utils.toArray(".section-blur").forEach(section => {
        gsap.set(section, { filter: "blur(10px)" });
        gsap.to(section, {
            filter: "blur(0px)",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top center",
                scrub: true
            }
        });
    });

    // Image reveal animation
    const revealAnimation = (selector, axis, percent, scale) => {
        gsap.utils.toArray(selector).forEach(revealItem => {
            const image = revealItem.querySelector("img");
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: revealItem,
                    toggleActions: "play none none reverse",
                }
            });
            tl.set(revealItem, { autoAlpha: 1 })
                .from(revealItem, 1.5, { [`${axis}Percent`]: -percent, ease: Power2.out })
                .from(image, 1.5, { [`${axis}Percent`]: percent, scale, delay: -1.5, ease: Power2.out });
        });
    };

    revealAnimation(".reveal-left", 'x', 100, 1.3);
    revealAnimation(".reveal-bottom", 'y', 100, 1.3);

    // Title animation
    const splitAndAnimate = (selector, splitType, child, triggerStart, staggerDelay) => {
        gsap.utils.toArray(selector).forEach(title => {
            new SplitType(title, { types: splitType });
            const elements = title.querySelectorAll(`.${child}`);
            elements.forEach((el, index) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${triggerStart}%`,
                        end: "bottom 60%",
                        scrub: false,
                        toggleActions: "play none none reverse"
                    }
                }).from(el, {
                    duration: 0.8,
                    x: 70,
                    delay: index * staggerDelay,
                    autoAlpha: 0
                });
            });
        });
    };

    splitAndAnimate(".text-animation-line", "lines", "line", 90, 0.03);
    splitAndAnimate(".text-animation-word", "words", "word", 90, 0.01);

    // Select all elements with the class 'banner-element'
    const bannerElements = document.querySelectorAll('.banner-element');

    bannerElements.forEach(element => {
        let tween;

        if (element.classList.contains('elementLeft')) {
            tween = gsap.to(element, {
                left: '100%',
                ease: 'none'
            });
        } else if (element.classList.contains('elementRight')) {
            tween = gsap.to(element, {
                right: '100%',
                ease: 'none'
            });
        } else if (element.classList.contains('elementBottom')) {
            tween = gsap.to(element, {
                bottom: '100%',
                ease: 'none'
            });
        } else if (element.classList.contains('elementTop')) {
            tween = gsap.to(element, {
                top: '100%',
                ease: 'none'
            });
        } else if (element.classList.contains('rotateLeft')) {
            tween = gsap.to(element, {
                rotation: 45,
                ease: 'none'
            });
        } else if (element.classList.contains('rotateRight')) {
            tween = gsap.to(element, {
                rotation: -45,
                ease: 'none'
            });
        }

        if (tween) {
            ScrollTrigger.create({
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                animation: tween
            });
        }
    });
})