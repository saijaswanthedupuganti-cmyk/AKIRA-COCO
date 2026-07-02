/**
 * AKIRA Javascript
 * Sticky Header, Mobile Menu Overlay, and Scroll Reveals.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* 0. DYNAMIC RENDERING FROM data.js */
    if (typeof siteData !== 'undefined') {
        
        // Render Founder
        const founderGrid = document.getElementById('dynamic-founder');
        if (founderGrid) {
            let timelineHtml = '';
            if (siteData.founder.timeline && siteData.founder.timeline.length) {
                timelineHtml = `<div class="founder-timeline mt-sm">`;
                siteData.founder.timeline.forEach((item, i) => {
                    const delay = i + 2;
                    timelineHtml += `
                        <div class="timeline-node reveal delay-${delay}">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <span class="timeline-year">${item.year}</span>
                                <h4>${item.title}</h4>
                                <p>${item.text}</p>
                            </div>
                        </div>
                    `;
                });
                timelineHtml += `</div>`;
            }

            founderGrid.innerHTML = `
                <div class="founder-img reveal">
                    <img src="${siteData.founder.imagePath}" alt="${siteData.founder.imageAlt}">
                </div>
                <div class="founder-text reveal delay-1">
                    <span class="eyebrow">${siteData.founder.eyebrow}</span>
                    <h2>${siteData.founder.headlineHtml}</h2>
                    ${siteData.founder.byline ? `<p class="founder-byline">${siteData.founder.byline}</p>` : ''}
                    ${siteData.founder.paragraphs.map(p => `<p>${p}</p>`).join('')}
                    ${siteData.founder.quote ? `<blockquote class="founder-quote">${siteData.founder.quote}</blockquote>` : ''}
                    ${timelineHtml}
                </div>
            `;
        }

        // Render Ritual
        // We are moving the intro heading into the sticky left column so it stays pinned with the image.
        const ritualIntro = document.getElementById('dynamic-ritual-intro');
        if (ritualIntro) {
            ritualIntro.remove(); // Remove the old centered container from the DOM
        }

        const ritualVisuals = document.getElementById('dynamic-ritual-visuals');
        const ritualContent = document.getElementById('dynamic-ritual-content');
        
        if (ritualVisuals && ritualContent) {
            let imagesHtml = ``;
            let stepsHtml = `
                <div class="cinematic-intro-block">
                    <span class="eyebrow">${siteData.ritualIntro.eyebrow}</span>
                    <h2 class="cinematic-main-title">${siteData.ritualIntro.headlineHtml}</h2>
                    <p class="cinematic-intro-desc" style="opacity:0.8; font-size:18px;">${siteData.ritualIntro.description}</p>
                </div>
                <div class="cinematic-timeline-track">
                    <div class="cinematic-timeline-fill" id="cinematic-progress"></div>
                </div>
            `;
            
            siteData.ritualSteps.forEach((step, index) => {
                const isActive = index === 0 ? 'active' : '';
                imagesHtml += `
                    <div class="cinematic-media-container ${isActive}" id="ritual-img-${step.id}">
                        <img src="${step.imagePath}" alt="${step.imageAlt}" class="cinematic-img">
                    </div>
                `;
                
                stepsHtml += `
                <div class="cinematic-step" id="step-${step.id}" data-step="${step.id}" data-ambient="${step.ambientClass}">
                    <div class="mobile-ritual-img mobile-only">
                        <img src="${step.imagePath}" alt="${step.imageAlt}">
                    </div>
                    <div class="cinematic-step-content">
                        <span class="cinematic-number">${step.number}</span>
                        <h3 class="cinematic-step-title">${step.title}</h3>
                        <div class="cinematic-divider"></div>
                        <p class="cinematic-desc">${step.description}</p>
                    </div>
                </div>`;
            });
            
            ritualVisuals.innerHTML = imagesHtml;
            ritualContent.innerHTML = stepsHtml;
        }

        // Render Collection
        const collectionIntro = document.getElementById('dynamic-collection-intro');
        if (collectionIntro) {
            collectionIntro.innerHTML = `
                <span class="eyebrow">${siteData.collectionIntro.eyebrow}</span>
                <h2>${siteData.collectionIntro.headlineHtml}</h2>
            `;
        }

        const collectionGrid = document.getElementById('dynamic-collection-grid');
        if (collectionGrid) {
            let collectionHtml = '';
            siteData.products.forEach((prod, idx) => {
                const elevClass = prod.isElevated ? 'elevated' : '';
                const delayClass = `delay-${idx + 1}`;
                collectionHtml += `
                <div class="fancy-card ${elevClass} reveal ${delayClass}">
                    <div class="card-img-wrap"><img src="${prod.imagePath}" alt="${prod.name}"></div>
                    <div class="card-content">
                        <h3>${prod.name}</h3>
                        <p class="notes">${prod.notes}</p>
                        <div class="card-footer">
                            <span class="price">${prod.price}</span>
                            <button class="link-btn" onclick="orderWhatsApp('${prod.name}')">Order &rarr;</button>
                        </div>
                    </div>
                </div>`;
            });
            collectionGrid.innerHTML = collectionHtml;
        }

        // Render Gallery
        const galleryGrid = document.getElementById('dynamic-gallery-grid');
        if (galleryGrid) {
            let galleryHtml = '';
            siteData.socialGallery.items.forEach(item => {
                if (item.type === 'cta') {
                    galleryHtml += `
                    <div class="social-item ${item.gridClass} reveal ${item.delayClass}">
                        <div class="social-cta-content">
                            <h2>${siteData.socialGallery.cta.headlineHtml}</h2>
                            <p>${siteData.socialGallery.cta.description}</p>
                            <a href="${siteData.socialGallery.cta.buttonLink}" target="_blank" class="btn-fancy-outline mt-sm">${siteData.socialGallery.cta.buttonText}</a>
                        </div>
                    </div>`;
                } else {
                    galleryHtml += `
                    <div class="social-item ${item.gridClass} reveal ${item.delayClass}">
                        <img src="${item.path}" alt="${item.alt}">
                    </div>`;
                }
            });
            galleryGrid.innerHTML = galleryHtml;
        }
    }
    
    /* 1. Cinematic Sequential Hero Reveal */
    setTimeout(() => document.querySelector('.seq-1').classList.add('loaded'), 200);
    setTimeout(() => document.querySelector('.seq-2').classList.add('loaded'), 600);
    setTimeout(() => document.querySelector('.seq-3').classList.add('loaded'), 1000);
    setTimeout(() => document.querySelector('.seq-4').classList.add('loaded'), 1400);

    /* 2. Sticky Header Logic */
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    /* 3. Mobile Hamburger Menu Logic */
    const toggleBtn = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle menu open/closed
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Prevent scrolling on the body when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* 4. Ultra-smooth Scroll Reveals */
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* 5. Cinematic Story (Scroll Logic) */
    const cinematicSteps = document.querySelectorAll('.cinematic-step');
    const cinematicMedia = document.querySelectorAll('.cinematic-media-container');
    const processSection = document.getElementById('process');
    const progressFill = document.getElementById('cinematic-progress');

    if (cinematicSteps.length > 0 && cinematicMedia.length > 0) {
        // Trigger crossfade when the text step enters the middle 40% of the screen
        const cinematicObserverOptions = {
            root: null,
            rootMargin: "-40% 0px -40% 0px", 
            threshold: 0
        };

        const cinematicObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Activate current text step
                    cinematicSteps.forEach(s => s.classList.remove('active'));
                    entry.target.classList.add('active');

                    const stepNum = entry.target.getAttribute('data-step');
                    const ambientClass = entry.target.getAttribute('data-ambient');
                    
                    // Update Timeline Progress Height based on step
                    if (progressFill) {
                        const progressPct = ((parseInt(stepNum)) / cinematicSteps.length) * 100;
                        progressFill.style.height = `${progressPct}%`;
                    }

                    // Update ambient background class on the main #process container
                    if (processSection && ambientClass) {
                        // Remove all other ambient classes
                        processSection.className = 'ritual-section';
                        processSection.classList.add(ambientClass);
                    }

                    // Slow crossfade to corresponding sticky media (includes Ken Burns)
                    cinematicMedia.forEach(media => {
                        if (media.id === `ritual-img-${stepNum}`) {
                            media.classList.add('active');
                        } else {
                            media.classList.remove('active');
                        }
                    });
                }
            });
        }, cinematicObserverOptions);

        cinematicSteps.forEach(step => cinematicObserver.observe(step));
    }

    /* 6. Luxury FAQ Accordion Logic */
    const faqCards = document.querySelectorAll('.faq-card');
    
    faqCards.forEach(card => {
        const btn = card.querySelector('.faq-question-btn');
        const answer = card.querySelector('.faq-answer-wrapper');
        const answerContent = card.querySelector('.faq-answer-content');

        if (btn && answer && answerContent) {
            btn.addEventListener('click', () => {
                const isOpen = card.classList.contains('open');

                // Close all others first
                faqCards.forEach(c => {
                    c.classList.remove('open');
                    const cBtn = c.querySelector('.faq-question-btn');
                    const cAns = c.querySelector('.faq-answer-wrapper');
                    if (cBtn) cBtn.setAttribute('aria-expanded', 'false');
                    if (cAns) cAns.style.height = '0px';
                });

                if (!isOpen) {
                    // Open this one
                    card.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                    
                    // Set height for CSS transition
                    const contentHeight = answerContent.getBoundingClientRect().height;
                    answer.style.height = `${contentHeight}px`;

                    // Keep height updated if window resizes
                    const resizeObserver = new ResizeObserver(() => {
                        if (card.classList.contains('open')) {
                            answer.style.height = `${answerContent.getBoundingClientRect().height}px`;
                        }
                    });
                    resizeObserver.observe(answerContent);
                }
            });
        }
    });

    /* 7. FAQ Scroll Reveal with Stagger */
    const faqRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const revealElements = entry.target.querySelectorAll('.reveal-faq');
                revealElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, index * 70); // 70ms stagger
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const faqSection = document.getElementById('faq');
    if (faqSection) faqRevealObserver.observe(faqSection);

});
/* Advanced UI Drawer Inquiry */
window.orderWhatsApp = function(productName, event) {
    if (event) event.preventDefault();
    const drawer = document.getElementById('advanced-drawer');
    const drawerProduct = document.getElementById('drawer-product');
    if (drawer && drawerProduct) {
        drawerProduct.textContent = productName;
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    } else {
        // Fallback if drawer isn't in HTML yet
        const msg = `Hello, I am interested in the ${productName} from AKIRA Luxury Cacao. Please share further details.`;
        window.open(`https://wa.me/918121117999?text=${encodeURIComponent(msg)}`, '_blank');
    }
}

window.closeDrawer = function() {
    const drawer = document.getElementById('advanced-drawer');
    if (drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    }
}

window.confirmWhatsApp = function() {
    const drawerProduct = document.getElementById('drawer-product').textContent;
    const msg = `Hello, I am interested in the ${drawerProduct} from AKIRA Luxury Cacao. I appreciate the genuine trust you have built.`;
    window.open(`https://wa.me/918121117999?text=${encodeURIComponent(msg)}`, '_blank');
    closeDrawer();
}
