// BULLETPROOF CAROUSEL - Enhanced with error handling and performance optimization
class CarouselManager {
    constructor() {
        // Configuration from CSS variables
        this.config = {
            startPosition: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-start-position')) || 2,
            realSlides: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-real-slides')) || 5,
            totalSlides: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-total-slides')) || 9,
            autoInterval: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-auto-interval')) || 3600,
            manualDelay: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-manual-delay')) || 3000,
            slideDuration: 600
        };
        
        // State
        this.currentSlide = this.config.startPosition;
        this.autoTimer = null;
        this.isManualControl = false;
        this.isDesktop = false;
        
        // DOM elements - with error handling
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.getElementById('indicators');
        
        // Media query for responsive handling
        this.mediaQuery = window.matchMedia('(min-width: 769px)');
        
        this.init();
    }
    
    init() {
        if (!this.track) {
            console.warn('Carousel track not found');
            return;
        }
        
        this.updateResponsiveState();
        this.setupEventListeners();
        this.setupMediaQueryListener();
        
        // Set initial position with error handling
        requestAnimationFrame(() => {
            this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
            this.goToSlide(this.currentSlide);
            
            // Start auto-play after initialization
            setTimeout(() => {
                this.startAutoPlay();
            }, 1000);
        });
    }
    
    updateResponsiveState() {
        this.isDesktop = this.mediaQuery.matches;
    }
    
    setupMediaQueryListener() {
        this.mediaQuery.addListener((e) => {
            this.isDesktop = e.matches;
            // Recalculate position on screen change
            if (this.track) {
                this.track.style.transition = 'none';
                this.goToSlide(this.currentSlide);
                setTimeout(() => {
                    this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
                }, 50);
            }
        });
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Indicators
        if (this.indicators) {
            this.indicators.addEventListener('click', (e) => {
                if (e.target.classList.contains('carousel-indicator')) {
                    const albumIndex = parseInt(e.target.dataset.slide);
                    if (!isNaN(albumIndex)) {
                        this.goToAlbum(albumIndex);
                    }
                }
            });
        }
        
        // Hover pause/resume
        if (this.track) {
            this.track.addEventListener('mouseenter', () => this.clearAutoTimer());
            this.track.addEventListener('mouseleave', () => {
                if (!this.isManualControl) {
                    this.startAutoPlay();
                }
            });
        }
        
        // Resize handling with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });
    }
    
    handleResize() {
        if (!this.track) return;
        
        this.updateResponsiveState();
        this.track.style.transition = 'none';
        this.goToSlide(this.currentSlide);
        setTimeout(() => {
            this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
        }, 50);
    }
    
    goToSlide(slideIndex) {
        if (!this.track) return;
        
        // Desktop gets spacing compensation, mobile stays original
        const slideWidth = this.isDesktop ? 50 : 100;
        const spacing = this.isDesktop ? 0.6 : 0; // Only desktop has spacing
        const translateX = -(slideIndex * (slideWidth + spacing));
        
        this.track.style.transform = `translateX(${translateX}%)`;
        this.currentSlide = slideIndex;
        this.updateIndicators();
    }
    
    updateIndicators() {
        if (!this.indicators) return;
        
        const dots = this.indicators.querySelectorAll('.carousel-indicator');
        if (dots.length === 0) return;
        
        const logicalIndex = (this.currentSlide - this.config.startPosition + this.config.realSlides) % this.config.realSlides;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === logicalIndex);
        });
    }
    
    nextSlide() {
        this.clearAutoTimer();
        this.isManualControl = true;
        
        this.currentSlide++;
        this.goToSlide(this.currentSlide);
        
        // Handle infinite loop
        if (this.currentSlide >= this.config.startPosition + this.config.realSlides) {
            setTimeout(() => {
                if (this.track) {
                    this.track.style.transition = 'none';
                    this.currentSlide = this.config.startPosition;
                    this.goToSlide(this.currentSlide);
                    setTimeout(() => {
                        if (this.track) {
                            this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
                        }
                    }, 50);
                }
            }, this.config.slideDuration);
        }
        
        this.resumeAfterManual();
    }
    
    prevSlide() {
        this.clearAutoTimer();
        this.isManualControl = true;
        
        this.currentSlide--;
        this.goToSlide(this.currentSlide);
        
        // Handle infinite loop
        if (this.currentSlide < this.config.startPosition) {
            setTimeout(() => {
                if (this.track) {
                    this.track.style.transition = 'none';
                    this.currentSlide = this.config.startPosition + this.config.realSlides - 1;
                    this.goToSlide(this.currentSlide);
                    setTimeout(() => {
                        if (this.track) {
                            this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
                        }
                    }, 50);
                }
            }, this.config.slideDuration);
        }
        
        this.resumeAfterManual();
    }
    
    goToAlbum(albumIndex) {
        if (albumIndex < 0 || albumIndex >= this.config.realSlides) return;
        
        this.clearAutoTimer();
        this.isManualControl = true;
        
        this.currentSlide = this.config.startPosition + albumIndex;
        this.goToSlide(this.currentSlide);
        
        this.resumeAfterManual();
    }
    
    resumeAfterManual() {
        setTimeout(() => {
            this.isManualControl = false;
            this.startAutoPlay();
        }, this.config.manualDelay);
    }
    
    startAutoPlay() {
        if (this.autoTimer) return;
        
        this.autoTimer = setInterval(() => {
            if (!this.isManualControl) {
                this.currentSlide++;
                this.goToSlide(this.currentSlide);
                
                // Handle infinite loop for auto-play
                if (this.currentSlide >= this.config.startPosition + this.config.realSlides) {
                    setTimeout(() => {
                        if (this.track) {
                            this.track.style.transition = 'none';
                            this.currentSlide = this.config.startPosition;
                            this.goToSlide(this.currentSlide);
                            setTimeout(() => {
                                if (this.track) {
                                    this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
                                }
                            }, 50);
                        }
                    }, this.config.slideDuration);
                }
            }
        }, this.config.autoInterval);
    }
    
    clearAutoTimer() {
        if (this.autoTimer) {
            clearInterval(this.autoTimer);
            this.autoTimer = null;
        }
    }
    
    destroy() {
        this.clearAutoTimer();
        this.mediaQuery.removeListener(this.handleResize);
    }
}

// Initialize carousel when DOM is ready
let carousel;
document.addEventListener('DOMContentLoaded', () => {
    try {
        carousel = new CarouselManager();
        console.log('Carousel initialized successfully');
    } catch (error) {
        console.error('Carousel initialization error:', error);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (carousel) {
        carousel.destroy();
    }
});
