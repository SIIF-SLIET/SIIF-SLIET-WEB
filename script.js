// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Hero Carousel - Auto-rotate every 3 seconds
const heroCarousel = new bootstrap.Carousel('#heroCarousel', {
    interval: 3000, // 3 seconds
    ride: 'carousel',
    wrap: true, // Infinite looping
    pause: false // Don't pause on hover (remove this line if you want to pause on hover)
});

// Change navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Gallery Page Specific Scripts - Mobile Optimized
if (document.querySelector('.gallery-container')) {
    // Initialize Isotope for filtering
    const galleryGrid = document.querySelector('.gallery-container');
    const iso = new Isotope(galleryGrid, {
        itemSelector: '.gallery-item',
        layoutMode: 'fitRows',
        percentPosition: true,
        stagger: 30,
        transitionDuration: '0.4s'
    });

    // Filter buttons with mobile-friendly behavior
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterGroup = document.querySelector('.filter-group');
    const yearFilter = document.getElementById('year-filter');
    
    // Function to apply filters
    const applyFilters = () => {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const yearValue = yearFilter.value;
        
        // Combine filters
        let combinedFilter;
        if (yearValue === '*' && activeFilter === '*') {
            combinedFilter = '*';
        } else if (yearValue === '*') {
            combinedFilter = activeFilter;
        } else if (activeFilter === '*') {
            combinedFilter = yearValue;
        } else {
            combinedFilter = `${activeFilter}${yearValue}`;
        }
        
        iso.arrange({
            filter: combinedFilter
        });
        
        // Scroll to top of gallery on filter change (mobile friendly)
        galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // Filter button click handler
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            applyFilters();
            
            // Scroll filter button into view on mobile
            if (window.innerWidth < 768) {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        });
    });

    // Year filter change handler
    yearFilter.addEventListener('change', applyFilters);

    // Initialize lightGallery with mobile-friendly settings
    lightGallery(document.getElementById('lightgallery'), {
        selector: '.gallery-card',
        download: false,
        counter: false,
        getCaptionFromTitleOrAlt: false,
        mobileSettings: {
            controls: true,
            showCloseIcon: true,
            download: false,
            rotate: false
        }
    });

    // Load more button functionality
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            
            // Simulate AJAX load (replace with actual implementation)
            setTimeout(() => {
                // In a real implementation, this would append new items
                alert('More gallery items would be loaded here in a production environment.');
                this.disabled = false;
                this.textContent = 'Load More';
            }, 800);
        });
    }

    // Video card click handlers
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent lightGallery from handling this click
            e.stopPropagation();
            
            // In a real implementation, this would open a modal with the video
            // For demo, we'll use a simple alert
            alert('Video player would open here in a production environment.\n\nOn mobile, this would use the device\'s native video player.');
        });
    });

    // Fix for filter initialization on mobile
    window.addEventListener('load', () => {
        iso.layout();
        
        // Recalculate Isotope layout after images load
        const images = galleryGrid.querySelectorAll('img');
        let loadedCount = 0;
        
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        iso.layout();
                    }
                });
            }
        });
        
        if (loadedCount === images.length) {
            iso.layout();
        }
    });
}


// asademic page  

// Academics Page Specific Scripts
if (document.querySelector('.academics-hero')) {
    // Smooth scrolling for anchor links within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is an internal anchor
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    if (history.pushState) {
                        history.pushState(null, null, this.getAttribute('href'));
                    } else {
                        window.location.hash = this.getAttribute('href');
                    }
                }
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Initialize tooltips for program cards
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Accordion functionality for curriculum sections
    const curriculumAccordions = document.querySelectorAll('.curriculum-accordion');
    curriculumAccordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
    
    // Program card hover effects
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.program-icon');
            icon.style.transform = 'translateY(-35px) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.program-icon');
            icon.style.transform = 'translateY(-35px) scale(1)';
        });
    });
    
    // Stream card hover effects
    const streamCards = document.querySelectorAll('.stream-card');
    streamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const header = this.querySelector('.stream-header');
            header.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            const header = this.querySelector('.stream-header');
            header.style.transform = 'translateY(0)';
        });
    });
}



// Sector dropdown auto-hide functionality
const sectorDropdown = document.getElementById('sectorDropdown');
const sectorMenu = sectorDropdown.querySelector('.dropdown-menu');

// Show dropdown on hover
sectorDropdown.addEventListener('mouseenter', () => {
    const bsDropdown = bootstrap.Dropdown.getInstance(sectorDropdown);
    if (!bsDropdown) {
        new bootstrap.Dropdown(sectorDropdown).show();
    } else {
        bsDropdown.show();
    }
});

// Hide dropdown when mouse leaves
sectorDropdown.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!sectorDropdown.matches(':hover') && !sectorMenu.matches(':hover')) {
            const bsDropdown = bootstrap.Dropdown.getInstance(sectorDropdown);
            if (bsDropdown) {
                bsDropdown.hide();
            }
        }
    }, 200);
});

// Additional check for menu hover
sectorMenu.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!sectorDropdown.matches(':hover') && !sectorMenu.matches(':hover')) {
            const bsDropdown = bootstrap.Dropdown.getInstance(sectorDropdown);
            if (bsDropdown) {
                bsDropdown.hide();
            }
        }
    }, 200);
});


// Enhanced News Ticker with pause control
function initializeNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    const items = ticker.querySelectorAll('.ticker-item');
    const pauseBtn = document.querySelector('.btn-ticker-pause');
    let isPaused = false;
    
    // Calculate total width needed
    let totalWidth = 0;
    items.forEach(item => {
        totalWidth += item.offsetWidth + 30; // 30px for padding
    });
    
    // Duplicate items for seamless looping
    items.forEach(item => {
        const clone = item.cloneNode(true);
        ticker.appendChild(clone);
    });
    
    // Set animation
    ticker.style.width = `${totalWidth * 2}px`;
    ticker.style.animationDuration = `${items.length * 5}s`;
    
    // Pause control
    pauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
            ticker.style.animationPlayState = 'paused';
            this.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            ticker.style.animationPlayState = 'running';
            this.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });
    
    // Pause on hover
    ticker.parentElement.addEventListener('mouseenter', () => {
        if (!isPaused) {
            ticker.style.animationPlayState = 'paused';
        }
    });
    
    ticker.parentElement.addEventListener('mouseleave', () => {
        if (!isPaused) {
            ticker.style.animationPlayState = 'running';
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeNewsTicker);