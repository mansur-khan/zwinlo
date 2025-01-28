// preloader
// toggle mobile menu
// mobile menu functions
// accordion item
// Show current year on footer
// back to top

"use strict"

// preloader
setTimeout(() => {
    if (document.querySelector(".preloader")) {
        document.querySelector(".preloader").style.display = "none"
    }
}, 1000);

document.addEventListener('DOMContentLoaded', () => {

    // scroll header 
    const header = document.querySelector('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        window.onscroll = function () {
            let scrollPosition = window.pageYOffset;
            if (scrollPosition > headerHeight) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
    }

    // menu active class
    const navLinks = document.querySelectorAll('.menu-link a');
    const currentUrl = window.location.href.split(/[?#]/)[0];
    if (navLinks) {
        navLinks.forEach(link => {
            if (link.href === currentUrl) {
                link.classList.add('active');
                // Add active class to the parent menu-item if it exists
                let parentMenuItem = link.closest('.menu-item');
                if (parentMenuItem) {
                    parentMenuItem.classList.add('active');
                    if (parentMenuItem.parentElement.closest(".menu-item")) {
                        parentMenuItem.parentElement.closest(".menu-item").classList.add('active')
                    }
                }
            }
        });
    }

    // toggle mobile menu
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const navbarArea = document.querySelector(".navbar-area");
    if (menuToggleBtn && navbarArea) {
        menuToggleBtn.addEventListener("click", function () {
            navbarArea.classList.toggle("open");
        });
    }
    // outside click
    if (menuToggleBtn && navbarArea) {
        document.addEventListener("click", function (event) {
            if (!menuToggleBtn.contains(event.target) && !navbarArea.contains(event.target)) {
                navbarArea.classList.remove("open");
            }
        });
    }

    // mobile menu functions
    const mobileMenu = () => {
        if (window.matchMedia("(max-width: 991px)").matches) {
            const menuLinks = document.querySelectorAll(".menu-item button");
            menuLinks.forEach(function (link) {
                const subMenu = link.parentElement.querySelector(".sub-menu");
                animatedHeight(link, subMenu);

                if (subMenu) {
                    const subMenuItems = subMenu.querySelectorAll(".menu-item button");
                    subMenuItems.forEach(item => {
                        const subSubMenu = item.querySelector(".sub-menu");
                        animatedHeight(item, subSubMenu);
                    })
                }
            });
        }
    }

    mobileMenu();

    window.addEventListener("resize", function () {
        mobileMenu();
    })

    // search form
    const searchBtn = document.querySelector(".search-btn");
    const searchForm = document.querySelector(".search-form-wrapper");
    const searchCloseBtn = document.querySelector(".search-close-btn");
    if (searchBtn && searchForm) {
        searchBtn.addEventListener("click", function () {
            searchForm.classList.toggle("active");
        });
        searchCloseBtn.addEventListener("click", function () {
            searchForm.classList.remove("active");
        });
    }


    // Box Style 
    const targetBtn = document.querySelectorAll('.box-style')
    if (targetBtn) {
        targetBtn.forEach((element) => {
            element.addEventListener('mousemove', (e) => {
                const x = e.offsetX + 'px';
                const y = e.offsetY + 'px';
                element.style.setProperty('--x', x);
                element.style.setProperty('--y', y);
            })
        })
    }

    // accordion item
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        const accordionItem = header.parentNode;
        const accordionContent = accordionItem.querySelector('.accordion-content');

        // Set initial maxHeight to 0 if not open, otherwise set it to its full height
        if (!accordionItem.classList.contains('show')) {
            accordionContent.style.maxHeight = '0';
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        }

        header.addEventListener('click', () => {
            const isOpen = accordionItem.classList.contains('show');

            if (isOpen) {
                // Collapse the accordion item
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';

                requestAnimationFrame(() => {
                    accordionContent.style.maxHeight = '0';
                });
            } else {
                // Expand the accordion item
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }

            accordionItem.classList.toggle('show');

            // Optionally, collapse other accordion sections
            const otherContents = document.querySelectorAll('.accordion-item');
            otherContents.forEach(content => {
                if (content !== accordionItem) {
                    content.classList.remove('show');
                    content.querySelector('.accordion-content').style.maxHeight = '0';
                }
            });
        });
    });



    // // progress bar
    // const progressBarWraps = document.querySelectorAll('.progress-bar-wrap');
    // const updateProgressBar = (progressBarWrap) => {
    //     const progressValueElement = progressBarWrap.querySelector('.progress-bar-inner').getAttribute('data-value');
    //     // console.log(progressValueElement);
    //     const numericValue = parseInt(progressValueElement.replace('%', ''), 10);

    //     const progressBarInner = progressBarWrap.querySelector('.progress-bar-inner');
    //     progressBarInner.style.width = numericValue + '%';
    // };
    // const ProgressObserver = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             updateProgressBar(entry.target);
    //             observer.unobserve(entry.target); // Stop observing once the animation is done
    //         }
    //     });
    // }, {
    //     threshold: 0.1 // Trigger when 10% of the element is visible
    // });
    // progressBarWraps.forEach(progressBarWrap => {
    //     ProgressObserver.observe(progressBarWrap);
    // });

    // // team social list active
    // const socialLists = document.querySelectorAll('.social-link-wrapper');
    // if (socialLists) {
    //     socialLists.forEach(socialList => {
    //         const socialBtn = socialList.querySelector(".social-btn");
    //         const socialItem = socialList.querySelector(".social-items");
    //         const icon = socialBtn.querySelector('i')

    //         socialBtn.addEventListener("click", function () {
    //             socialItem.classList.toggle("active");
    //             if (icon.classList.contains('ph-plus')) {
    //                 icon.classList.remove('ph-plus')
    //                 icon.classList.add('ph-minus')
    //             } else {
    //                 icon.classList.remove('ph-minus')
    //                 icon.classList.add('ph-plus')
    //             }
    //         })
    //     });
    // }

    // // radio focused
    // document.querySelectorAll('.package-input .input-radiobox').forEach(input => {
    //     input.addEventListener('click', function () {
    //         // Remove the 'focused' class from all .package-input elements
    //         document.querySelectorAll('.package-input').forEach(packageInput => {
    //             packageInput.classList.remove('focused');
    //         });

    //         // Add the 'focused' class to the closest .package-input of the clicked item
    //         this.closest('.package-input').classList.add('focused');
    //     });
    // });

    // // credit card form select
    // const creditCardForm = document.querySelector('.credit-card-form');
    // const creditCardInput = document.querySelector('.creditCardInput');
    // if (creditCardForm && creditCardInput) {
    //     if (creditCardInput.checked) {
    //         creditCardForm.classList.add('active');
    //     } else {
    //         creditCardForm.classList.remove('active');
    //     }
    //     document.addEventListener("click", function () {
    //         if (creditCardInput.checked) {
    //             creditCardForm.classList.add('active');
    //         } else {
    //             creditCardForm.classList.remove('active');
    //         }
    //     })
    // }

    // Show current year on footer
    const yearEl = document.querySelector(".currentYear");
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }

    // back to top
    const backToTop = document.querySelector(".back-to-top")
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (this.window.scrollY > 200) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        })

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
    }

    // share options
    // const shareButton = document.getElementById('shareButton');
    // const shareOptions = document.getElementById('shareOptions');

    // if (shareButton && shareOptions) {
    //     function positionShareOptions() {
    //         const buttonRect = shareButton.getBoundingClientRect();
    //         const windowHeight = window.innerHeight;
    //         const optionsHeight = shareOptions.offsetHeight;

    //         if (buttonRect.bottom + optionsHeight > windowHeight) {
    //             shareOptions.classList.remove('below');
    //         } else {
    //             shareOptions.classList.add('below');
    //         }
    //     }

    //     shareButton.addEventListener('click', function () {
    //         shareOptions.classList.toggle('show-share-options');
    //         positionShareOptions();
    //     });

    //     const shareLinks = document.querySelectorAll('.share-option');
    //     shareLinks.forEach(link => {
    //         link.addEventListener('click', function (e) {
    //             e.preventDefault();
    //             const platform = this.getAttribute('data-platform');
    //             const url = encodeURIComponent(window.location.href);
    //             const text = encodeURIComponent('Check out this awesome post!');
    //             const title = encodeURIComponent(document.title);

    //             let shareUrl;
    //             switch (platform) {
    //                 case 'facebook':
    //                     shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    //                     break;
    //                 case 'twitter':
    //                     shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    //                     break;
    //                 case 'linkedin':
    //                     shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`;
    //                     break;
    //                 case 'pinterest':
    //                     shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
    //                     break;
    //                 case 'reddit':
    //                     shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
    //                     break;
    //                 case 'whatsapp':
    //                     shareUrl = `https://wa.me/?text=${text} ${url}`;
    //                     break;
    //                 case 'telegram':
    //                     shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    //                     break;
    //                 case 'tumblr':
    //                     shareUrl = `https://www.tumblr.com/share/link?url=${url}&name=${title}&description=${text}`;
    //                     break;
    //                 case 'email':
    //                     shareUrl = `mailto:?subject=${title}&body=${text} ${url}`;
    //                     break;
    //             }

    //             if (shareUrl) {
    //                 window.open(shareUrl, '_blank');
    //             }
    //         });
    //     });

    //     document.addEventListener("click", function (event) {
    //         if (!shareButton.contains(event.target) && !shareOptions.contains(event.target)) {
    //             shareOptions.classList.remove("show-share-options");
    //         }
    //     });

    //     window.addEventListener("resize", function () {
    //         positionShareOptions();
    //     });
    // }

    const shareButton = document.getElementById('shareButton');
    const shareOptions = document.getElementById('shareOptions');
    const copyLink = document.getElementById('copyLink');

    if (shareButton && shareOptions) {
        function positionShareOptions() {
            const buttonRect = shareButton.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const optionsWidth = shareOptions.offsetWidth;
            const windowHeight = window.innerHeight;
            const optionsHeight = shareOptions.offsetHeight;

            // Vertical positioning (above or below)
            if (buttonRect.bottom + optionsHeight > windowHeight) {
                shareOptions.classList.remove('below');
            } else {
                shareOptions.classList.add('below');
            }

            // Horizontal positioning (left or right)
            if (buttonRect.right + optionsWidth > windowWidth) {
                shareOptions.classList.add('left');
            } else {
                shareOptions.classList.remove('left');
            }
        }

        shareButton.addEventListener('click', function () {
            shareOptions.classList.toggle('show-share-options');
            positionShareOptions();
        });

        // Add event listener to each share option
        const shareLinks = document.querySelectorAll('.share-option');
        shareLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const platform = this.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Check out this awesome post!');
                const title = encodeURIComponent(document.title);

                let shareUrl;
                switch (platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`;
                        break;
                    case 'pinterest':
                        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
                        break;
                    case 'reddit':
                        shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${text} ${url}`;
                        break;
                    case 'telegram':
                        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                        break;
                    case 'tumblr':
                        shareUrl = `https://www.tumblr.com/share/link?url=${url}&name=${title}&description=${text}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${title}&body=${text} ${url}`;
                        break;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank');
                }
            });
        });

        copyLink.addEventListener('click', function (e) {
            e.preventDefault();
            const url = window.location.href;

            navigator.clipboard.writeText(url).then(() => {
                console.log('Link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });

            shareOptions.classList.remove("show-share-options"); // Hide the share options after copying
        });

        // Remove share options when clicked outside
        document.addEventListener("click", function (event) {
            if (!shareButton.contains(event.target) && !shareOptions.contains(event.target)) {
                shareOptions.classList.remove("show-share-options");
            }
        });

        window.addEventListener("resize", function () {
            positionShareOptions();
        });
    }




    // comment reply form toggle
    const commentReplayBtn = document.querySelectorAll(".comment-replay-btn");
    if (commentReplayBtn) {
        commentReplayBtn.forEach(btn => {
            btn.addEventListener("click", function () {
                const singleCommentParent = this.closest('.single-comment');
                const commentReplayForm = singleCommentParent.querySelector('.comment-replay-form');
                commentReplayForm.classList.add("active");
            });
        })
    }

    // range slider
    const minInput = document.querySelector('.min');
    const maxInput = document.querySelector('.max');
    const minLabel = document.querySelector('.min-label');
    const maxLabel = document.querySelector('.max-label');
    const sliderRange = document.querySelector('.slider-range');

    function updateSlider() {
        let minVal = parseInt(minInput.value);
        let maxVal = parseInt(maxInput.value);

        if (minVal > maxVal) {
            if (this === minInput) {
                maxVal = minVal;
                maxInput.value = maxVal;
            } else {
                minVal = maxVal;
                minInput.value = minVal;
            }
        }

        minLabel.textContent = minVal;
        maxLabel.textContent = maxVal;

        const minPercent = ((minVal - minInput.min) / (minInput.max - minInput.min)) * 100;
        const maxPercent = ((maxVal - minInput.min) / (minInput.max - minInput.min)) * 100;

        sliderRange.style.left = `${minPercent}%`;
        sliderRange.style.width = `${maxPercent - minPercent}%`;
    }
    if (minInput && maxInput) {
        minInput.addEventListener('input', updateSlider);
        maxInput.addEventListener('input', updateSlider);

        updateSlider(); // Initial call to set up the slider
    }

    // shop sidebar
    const shopSidebar = document.querySelector(".shop-sidebar");
    const shopSidebarBtn = document.querySelector(".shop-sidebar-btn");
    if (shopSidebarBtn && shopSidebar) {
        shopSidebarBtn.addEventListener("click", function () {
            shopSidebar.classList.toggle("active");
        })
    }
    // out side click
    document.addEventListener("click", function (event) {
        if (shopSidebar && shopSidebarBtn) {
            if (!shopSidebar.contains(event.target) && !shopSidebarBtn.contains(event.target)) {
                shopSidebar.classList.remove("active");
            }
        }
    });


    // quntity increment and decrement
    const quantityIncrement = document.querySelectorAll(".quantityIncrement")
    const quantityDecrement = document.querySelectorAll(".quantityDecrement")
    if (quantityIncrement && quantityDecrement) {
        quantityIncrement.forEach(increment => {
            increment.addEventListener("click", function () {
                const value = parseInt(increment.parentElement.querySelector("input").value)
                increment.parentElement.querySelector("input").value = value + 1
            })
        })

        quantityDecrement.forEach(decrement => {
            decrement.addEventListener("click", function () {
                const value = parseInt(decrement.parentElement.querySelector("input").value)
                if (value > 1) {
                    decrement.parentElement.querySelector("input").value = value - 1
                }
            })
        })
    }

    // image zoomer
    let imageZoomer = (zoomableContainers, minScale = 2, maxScale = 5) => {
        // selector, minScale, maxScale
        // Loop through each zoomable image container
        zoomableContainers.forEach(container => {
            const image = container.querySelector('img');
            const productImageSrc = image.src; // Use the source of the image inside the container

            // Create zoomed image container dynamically
            const zoomedImageContainer = document.createElement('div');
            zoomedImageContainer.classList.add('zoomed-image-container');
            container.appendChild(zoomedImageContainer);

            // Create zoomed image element
            const zoomedImage = document.createElement('img');
            zoomedImage.src = productImageSrc;
            zoomedImage.classList.add('zoomed-image');
            zoomedImageContainer.appendChild(zoomedImage);

            container.addEventListener('mousemove', (e) => {
                const { offsetX, offsetY } = e;
                const { width, height } = container.getBoundingClientRect();
                const x = (offsetX / width) * 100;
                const y = (offsetY / height) * 100;

                zoomedImage.style.transformOrigin = `${x}% ${y}%`;
                zoomedImage.style.transform = `scale(${minScale})`;
            });

            container.addEventListener('mouseleave', () => {
                zoomedImage.style.transformOrigin = 'center center'; // Reset transform origin
                zoomedImage.style.transform = `scale(${minScale})`;
            });

            container.addEventListener('wheel', (e) => {
                e.preventDefault(); // Prevent page scrolling
                const zoomAmount = 0.1;
                if (e.deltaY < 0 && minScale < maxScale) {
                    // Zoom in
                    minScale += zoomAmount;
                } else {
                    // Zoom out
                    minScale = Math.max(2, minScale - zoomAmount); // Ensure minimum scale is 2
                }
                zoomedImage.style.transform = `scale(${minScale})`;
            });
        });
    }
    const zoomableContainers = document.querySelectorAll('.zoomable-image-container')
    imageZoomer(zoomableContainers, 2, 5);


    // tab function
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    if (tabButtons && tabContents) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const tabNumber = button.getAttribute("data-tab");
                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                tabContents.forEach(content => content.classList.remove("active"));
                document.querySelector(`.tab-content[data-tab="${tabNumber}"]`).classList.add("active");
            });
        });
    }

    // // animated height
    // function animatedHeight(button, animatedItem) {
    //     if (!button || !animatedItem) {
    //         return;
    //     }
    //     button.addEventListener("click", function () {

    //         if (animatedItem.classList.contains("active")) {
    //             // If active, collapse the animatedItem
    //             animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Set to current height

    //             requestAnimationFrame(() => {
    //                 animatedItem.style.maxHeight = '0'; // Collapse to height 0
    //             });
    //         } else {
    //             // If not active, expand the animatedItem
    //             animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Expand to its full height
    //         }

    //         animatedItem.classList.toggle("active");
    //         // Clean up after the transition
    //         animatedItem.addEventListener('transitionend', function () {
    //             if (!animatedItem.classList.contains("active")) {
    //                 animatedItem.style.maxHeight = ''; // Remove the height when collapsed
    //             } else {
    //                 animatedItem.style.maxHeight = 'none'; // Keep it open at full height
    //             }
    //         }, { once: true });
    //     })

    // }

    // const couponToggleBtn = document.querySelector(".coupon-toggle-btn");
    // const couponForm = document.querySelector(".coupon-form");
    // animatedHeight(couponToggleBtn, couponForm);


    function animatedHeight(button, animatedItem) {
        if (!button || !animatedItem) {
            return;
        }

        // Initial styles for the animated item
        animatedItem.style.maxHeight = '0';
        animatedItem.style.opacity = '0';
        animatedItem.style.overflow = 'hidden';
        animatedItem.style.transition = 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out';

        button.addEventListener("click", function () {
            if (animatedItem.classList.contains("active")) {
                // If active, collapse the animatedItem
                animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Set to current height

                requestAnimationFrame(() => {
                    animatedItem.style.maxHeight = '0'; // Collapse to height 0
                });
            } else {
                // If not active, expand the animatedItem
                animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Expand to its full height
            }

            animatedItem.classList.toggle("active");

            if (animatedItem.classList.contains("active")) {
                animatedItem.style.opacity = '1'; // Fade in
            } else {
                animatedItem.style.opacity = '0'; // Fade out
            }

            // Clean up after the transition
            animatedItem.addEventListener('transitionend', function () {
                if (!animatedItem.classList.contains("active")) {
                    animatedItem.style.maxHeight = '0'; // Remove the height when collapsed
                } else {
                    animatedItem.style.maxHeight = 'none'; // Keep it open at full height
                }
            }, { once: true });
        });
    }

    const couponToggleBtn = document.querySelector(".coupon-toggle-btn");
    const couponForm = document.querySelector(".coupon-form");
    animatedHeight(couponToggleBtn, couponForm);







});
