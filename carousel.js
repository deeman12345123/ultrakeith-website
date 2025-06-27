/**
 * BULLETPROOF CAROUSEL SYSTEM
 * Enhanced with comprehensive error handling and performance optimization
 */

class CarouselManager {
    constructor() {
        try {
            // Configuration from CSS variables with fallbacks
            this.config = {
                startPosition: this.getCSSVariable('--carousel-start-position', 2),
                realSlides: this.getCSSVariable('--carousel-real-slides', 5),
                totalSlides: this.getCSSVariable('--carousel-total-slides', 9),
                autoInterval: this.getCSSVariable('--carousel-auto-interval', 3600),
                manualDelay: this.getCSSVariable('--carousel-manual-delay', 3000),
                slideDuration: 600
            };
            
            // State management
            this.currentSlide = this.config.startPosition;
            this.autoTimer = null;
            this.isManualControl = false;
            this.isDesktop = false;
            this.isInitialized = false;
            
            // DOM elements with error handling
            this.track = this.safeGetElement('carouselTrack');
            this.prevBtn = this.safeGetElement('prevBtn');
            this.nextBtn = this.safeGetElement('nextBtn');
            this.indicators = this.safeGetElement('indicators');
            
            // Media query for responsive handling
            this.mediaQuery = window.matchMedia('(min-width: 769px)');
            
            // Initialize with error boundary
            this.init();
            
            console.log('🎠 Carousel: Initialization complete', this.config);
            
        } catch (error) {
            console.error('🚨 Carousel: Initialization failed:', error);
            this.handleError('INIT_ERROR', error);
        }
    }
    
    /**
     * Safely get CSS variable with fallback
     */
    getCSSVariable(variable, fallback) {
        try {
            const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
            const parsed = parseInt(value);
            return isNaN(parsed) ? fallback : parsed;
        } catch (error) {
            console.warn(`🎠 Carousel: CSS variable ${variable} not found, using fallback:`, fallback);
            return fallback;
        }
    }
    
    /**
     * Safely get DOM element with error handling
     */
    safeGetElement(id) {
        try {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`🎠 Carousel: Element #${id} not found`);
            }
            return element;
        } catch (error) {
            console.error(`🎠 Carousel: Failed to get element #${id}:`, error);
            return null;
        }
    }
    
    /**
     * Initialize carousel with error boundaries
     */
    init() {
        try {
            if (!this.track) {
                console.warn('🎠 Carousel: Track element not found - carousel disabled');
                return;
            }
            
            this.updateResponsiveState();
            this.setupEventListeners();
            this.setupMediaQueryListener();
            
            // Set initial position with error handling
            requestAnimationFrame(() => {
                try {
                    this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
                    this.goToSlide(this.currentSlide);
                    
                    // Start auto-play after initialization delay
                    setTimeout(() => {
                        this.startAutoPlay();
                    }, 1000);
                    
                    this.isInitialized = true;
                    console.log('🎠 Carousel: Ready and running');
                    
                } catch (error) {
                    console.error('🚨 Carousel: Failed to set initial position:', error);
                    this.handleError('POSITION_ERROR', error);
                }
            });
            
        } catch (error) {
            console.error('🚨 Carousel: Initialization error:', error);
            this.handleError('SETUP_ERROR', error);
        }
    }
    
    /**
     * Update responsive state safely
     */
    updateResponsiveState() {
        try {
            this.isDesktop = this.mediaQuery ? this.mediaQuery.matches : window.innerWidth >= 769;
        } catch (error) {
            console.error('🚨 Carousel: Failed to update responsive state:', error);
            this.isDesktop = window.innerWidth >= 769; // Fallback
        }
    }
    
    /**
     * Setup media query listener with error handling
     */
    setupMediaQueryListener() {
        try {
            if (this.mediaQuery && this.mediaQuery.addListener) {
                this.mediaQuery.addListener((e) => {
                    try {
                        this.isDesktop = e.matches;
                        // Recalculate position on screen change
                        if (this.track) {
                            this.track.style.transition = 'none';
                            this.goToSlide(this.currentSlide);
                            setTimeout(() => {
                                if (this.track) {
                                    this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
                                }
                            }, 50);
                        }
                    } catch (error) {
                        console.error('🚨 Carousel: Media query handler error:', error);
                    }
                });
            }
        } catch (error) {
            console.error('🚨 Carousel: Failed to setup media query listener:', error);
        }
    }
    
    /**
     * Setup event listeners with comprehensive error handling
     */
    setupEventListeners() {
        try {
            // Navigation buttons
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    try {
                        this.prevSlide();
                    } catch (error) {
                        console.error('🚨 Carousel: Previous button error:', error);
                        this.handleError('NAV_ERROR', error);
                    }
                });
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    try {
                        this.nextSlide();
                    } catch (error) {
                        console.error('🚨 Carousel: Next button error:', error);
                        this.handleError('NAV_ERROR', error);
                    }
                });
            }
            
            // Indicators
            if (this.indicators) {
                this.indicators.addEventListener('click', (e) => {
                    try {
                        if (e.target && e.target.classList.contains('carousel-indicator')) {
                            const albumIndex = parseInt(e.target.dataset.slide);
                            if (!isNaN(albumIndex)) {
                                this.goToAlbum(albumIndex);
                            }
                        }
                    } catch (error) {
                        console.error('🚨 Carousel: Indicator click error:', error);
                        this.handleError('INDICATOR_ERROR', error);
                    }
                });
            }
            
            // Hover pause/resume
            if (this.track) {
                this.track.addEventListener('mouseenter', () => {
                    try {
                        this.clearAutoTimer();
                    } catch (error) {
                        console.error('🚨 Carousel: Mouse enter error:', error);
                    }
                });
                
                this.track.addEventListener('mouseleave', () => {
                    try {
                        if (!this.isManualControl) {
                            this.startAutoPlay();
                        }
                    } catch (error) {
                        console.error('🚨 Carousel: Mouse leave error:', error);
                    }
                });
            }
            
            // Resize handling with debounce
            let resizeTimeout;
            window.addEventListener('resize', () => {
                try {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        this.handleResize();
                    }, 150);
                } catch (error) {
                    console.error('🚨 Carousel: Resize handler error:', error);
                }
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                try {
                    if (e.key === 'ArrowLeft') {
                        this.prevSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.nextSlide();
                    }
                } catch (error) {
                    console.error('🚨 Carousel: Keyboard handler error:', error);
                }
            });
            
        } catch (error) {
            console.error('🚨 Carousel: Failed to setup event listeners:', error);
            this.handleError('EVENT_ERROR', error);
        }
    }
    
    /**
     * Handle resize events safely
     */
    handleResize() {
        try {
            if (!this.track) return;
            
            this.updateResponsiveState();
            this.track.style.transition = 'none';
            this.goToSlide(this.currentSlide);
            setTimeout(() => {
                if (this.track) {
                    this.track.style.transition = `transform var(--carousel-slide-duration) ease-in-out`;
                }
            }, 50);
        } catch (error) {
            console.error('🚨 Carousel: Resize handling error:', error);
            this.handleError('RESIZE_ERROR', error);
        }
    }
    
    /**
     * Navigate to specific slide with error handling
     */
    goToSlide(slideIndex) {
        try {
            if (!this.track) return;
            
            // Validate slide index
            if (typeof slideIndex !== 'number' || isNaN(slideIndex)) {
                console.warn('🎠 Carousel: Invalid slide index:', slideIndex);
                return;
            }
            
            // Desktop gets spacing compensation, mobile stays original
            const slideWidth = this.isDesktop ? 50 : 100;
            const spacing = this.isDesktop ? 0.6 : 0;
            const translateX = -(slideIndex * (slideWidth + spacing));
            
            this.track.style.transform = `translateX(${translateX}%)`;
            this.currentSlide = slideIndex;
            this.updateIndicators();
            
        } catch (error) {
            console.error('🚨 Carousel: Go to slide error:', error);
            this.handleError('SLIDE_ERROR', error);
        }
    }
    
    /**
     * Update indicators with error handling
     */
    updateIndicators() {
        try {
            if (!this.indicators) return;
            
            const dots = this.indicators.querySelectorAll('.carousel-indicator');
            if (dots.length === 0) return;
            
            const logicalIndex = (this.currentSlide - this.config.startPosition + this.config.realSlides) % this.config.realSlides;
            
            dots.forEach((dot, index) => {
                try {
                    dot.classList.toggle('active', index === logicalIndex);
                } catch (error) {
                    console.error('🚨 Carousel: Indicator update error:', error);
                }
            });
            
        } catch (error) {
            console.error('🚨 Carousel: Update indicators error:', error);
        }
    }
    
    /**
     * Navigate to next slide
     */
    nextSlide() {
        try {
            this.clearAutoTimer();
            this.isManualControl = true;
            
            this.currentSlide++;
            this.goToSlide(this.currentSlide);
            
            // Handle infinite loop
            if (this.currentSlide >= this.config.startPosition + this.config.realSlides) {
                setTimeout(() => {
                    try {
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
                    } catch (error) {
                        console.error('🚨 Carousel: Next slide loop error:', error);
                    }
                }, this.config.slideDuration);
            }
            
            this.resumeAfterManual();
            
        } catch (error) {
            console.error('🚨 Carousel: Next slide error:', error);
            this.handleError('NEXT_ERROR', error);
        }
    }
    
    /**
     * Navigate to previous slide
     */
    prevSlide() {
        try {
            this.clearAutoTimer();
            this.isManualControl = true;
            
            this.currentSlide--;
            this.goToSlide(this.currentSlide);
            
            // Handle infinite loop
            if (this.currentSlide < this.config.startPosition) {
                setTimeout(() => {
                    try {
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
                    } catch (error) {
                        console.error('🚨 Carousel: Previous slide loop error:', error);
                    }
                }, this.config.slideDuration);
            }
            
            this.resumeAfterManual();
            
        } catch (error) {
            console.error('🚨 Carousel: Previous slide error:', error);
            this.handleError('PREV_ERROR', error);
        }
    }
    
    /**
     * Navigate to specific album
     */
    goToAlbum(albumIndex) {
        try {
            if (albumIndex < 0 || albumIndex >= this.config.realSlides) {
                console.warn('🎠 Carousel: Album index out of range:', albumIndex);
                return;
            }
            
            this.clearAutoTimer();
            this.isManualControl = true;
            
            this.currentSlide = this.config.startPosition + albumIndex;
            this.goToSlide(this.currentSlide);
            
            this.resumeAfterManual();
            
        } catch (error) {
            console.error('🚨 Carousel: Go to album error:', error);
            this.handleError('ALBUM_ERROR', error);
        }
    }
    
    /**
     * Resume auto-play after manual control
     */
    resumeAfterManual() {
        try {
            setTimeout(() => {
                this.isManualControl = false;
                this.startAutoPlay();
            }, this.config.manualDelay);
        } catch (error) {
            console.error('🚨 Carousel: Resume after manual error:', error);
        }
    }
    
    /**
     * Start auto-play with error handling
     */
    startAutoPlay() {
        try {
            if (this.autoTimer) return;
            
            this.autoTimer = setInterval(() => {
                try {
                    if (!this.isManualControl && this.isInitialized) {
                        this.currentSlide++;
                        this.goToSlide(this.currentSlide);
                        
                        // Handle infinite loop for auto-play
                        if (this.currentSlide >= this.config.startPosition + this.config.realSlides) {
                            setTimeout(() => {
                                try {
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
                                } catch (error) {
                                    console.error('🚨 Carousel: Auto-play loop error:', error);
                                }
                            }, this.config.slideDuration);
                        }
                    }
                } catch (error) {
                    console.error('🚨 Carousel: Auto-play tick error:', error);
                    this.clearAutoTimer(); // Stop auto-play on error
                }
            }, this.config.autoInterval);
            
        } catch (error) {
            console.error('🚨 Carousel: Start auto-play error:', error);
            this.handleError('AUTOPLAY_ERROR', error);
        }
    }
    
    /**
     * Clear auto-play timer safely
     */
    clearAutoTimer() {
        try {
            if (this.autoTimer) {
                clearInterval(this.autoTimer);
                this.autoTimer = null;
            }
        } catch (error) {
            console.error('🚨 Carousel: Clear auto timer error:', error);
        }
    }
    
    /**
     * Handle errors gracefully
     */
    handleError(type, error) {
        console.error(`🚨 Carousel Error [${type}]:`, error);
        
        // Attempt recovery based on error type
        switch (type) {
            case 'AUTOPLAY_ERROR':
                this.clearAutoTimer();
                break;
            case 'POSITION_ERROR':
            case 'SLIDE_ERROR':
                // Reset to start position
                try {
                    this.currentSlide = this.config.startPosition;
                    if (this.track) {
                        this.track.style.transform = `translateX(-${this.config.startPosition * 100}%)`;
                    }
                } catch (recoveryError) {
                    console.error('🚨 Carousel: Recovery failed:', recoveryError);
                }
                break;
        }
    }
    
    /**
     * Cleanup and destroy carousel
     */
    destroy() {
        try {
            this.clearAutoTimer();
            
            if (this.mediaQuery && this.mediaQuery.removeListener) {
                this.mediaQuery.removeListener(this.handleResize);
            }
            
            // Remove event listeners
            if (this.prevBtn) {
                this.prevBtn.removeEventListener('click', this.prevSlide);
            }
            if (this.nextBtn) {
                this.nextBtn.removeEventListener('click', this.nextSlide);
            }
            
            console.log('🎠 Carousel: Destroyed successfully');
            
        } catch (error) {
            console.error('🚨 Carousel: Destroy error:', error);
        }
    }
    
    /**
     * Get carousel status for debugging
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            currentSlide: this.currentSlide,
            isDesktop: this.isDesktop,
            autoPlayActive: !!this.autoTimer,
            manualControl: this.isManualControl,
            config: this.config
        };
    }
}

// Initialize carousel when DOM is ready
let carousel;

document.addEventListener('DOMContentLoaded', () => {
    try {
        carousel = new CarouselManager();
        console.log('🎠 Carousel: Initialization triggered');
        
        // Global access for debugging
        window.carousel = carousel;
        
    } catch (error) {
        console.error('🚨 Carousel: Failed to create instance:', error);
        
        // Fallback: basic carousel without features
        const track = document.getElementById('carouselTrack');
        if (track) {
            console.log('🎠 Carousel: Using fallback mode');
            track.style.transform = 'translateX(-200%)'; // Show first real slide
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    try {
        if (carousel && typeof carousel.destroy === 'function') {
            carousel.destroy();
        }
    } catch (error) {
        console.error('🚨 Carousel: Cleanup error:', error);
    }
});

// Global error handler for carousel
window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('carousel.js')) {
        console.error('🚨 Global Carousel Error:', event.error);
    }
});
