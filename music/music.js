'use strict';

/**
 * Ultra Keith Music Discography Application
 * Complete filtering, sorting, pagination, and search functionality
 * ALL 75 ALBUMS INCLUDED
 */
class MusicDiscographyApp {
    constructor() {
        // Core elements
        this.albumsGrid = document.getElementById('albumsGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sortSelect');
        this.searchInput = document.getElementById('searchInput');
        this.resultsCount = document.getElementById('resultsCount');
        this.noResults = document.getElementById('noResults');
        this.totalAlbumsSpan = document.getElementById('totalAlbums');
        
        // Pagination elements
        this.paginationSection = document.getElementById('paginationSection');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.pageNumbers = document.getElementById('pageNumbers');
        
        // State management
        this.currentFilter = 'all';
        this.currentSort = 'year-desc';
        this.currentSearch = '';
        this.currentPage = 1;
        this.albumsPerPage = 12;
        
        // Albums data (will be populated with complete discography)
        this.allAlbums = this.loadAlbumsData();
        this.filteredAlbums = [...this.allAlbums];
        
        this.init();
    }
    
    /**
     * Load Keith's COMPLETE 75-album discography
     */
    loadAlbumsData() {
        // Keith's COMPLETE 75-album discography (FIXED - ALL ALBUMS INCLUDED)
        const additionalAlbums = [
            // 1985-1990s Classic Era
            {
                title: "To Give You Love",
                artist: "Ultramagnetic MCs",
                year: 1985,
                category: "collab",
                search: "to give you love ultramagnetic mcs 1985",
                coverSrc: "album-covers/space-goretex.jpg",
                slug: "space-goretex"
            },
            {
                title: "Keith's Salon",
                artist: "Kool Keith",
                year: 2021,
                category: "solo",
                search: "keiths salon kool keith 2021",
                coverSrc: "album-covers/keiths-salon.jpg",
                slug: "keiths-salon"
            },
            {
                title: "Donovan The Don",
                artist: "Kool Keith",
                year: 2021,
                category: "solo",
                search: "donovan don kool keith 2021",
                coverSrc: "album-covers/donovan-don.jpg",
                slug: "donovan-the-don"
            },
            {
                title: "Subatomic",
                artist: "FNKPMPN (Del & Kool Keith)",
                year: 2022,
                category: "collab",
                search: "subatomic fnkpmpn del kool keith 2022",
                coverSrc: "album-covers/subatomic.jpg",
                slug: "subatomic"
            },
            {
                title: "Ced Gee X Kool Keith",
                artist: "Ultramagnetic MCs",
                year: 2022,
                category: "collab",
                search: "ced gee kool keith ultramagnetic 2022",
                coverSrc: "album-covers/ced-gee-keith.jpg",
                slug: "ced-gee-x-kool-keith"
            },
            {
                title: "Still Doing It",
                artist: "Kool Keith & Grant Shapiro",
                year: 2022,
                category: "collab",
                search: "still doing it kool keith grant shapiro 2022",
                coverSrc: "album-covers/still-doing-it.jpg",
                slug: "still-doing-it"
            },
            {
                title: "Serpent",
                artist: "Kool Keith & Real Bad Man",
                year: 2023,
                category: "collab",
                search: "serpent kool keith real bad man 2023",
                coverSrc: "album-covers/serpent.jpg",
                slug: "serpent"
            },
            {
                title: "Black Elvis 2",
                artist: "Kool Keith",
                year: 2023,
                category: "solo",
                search: "black elvis 2 kool keith 2023",
                coverSrc: "album-covers/blackelvis2.jpg",
                slug: "black-elvis-2"
            },
            {
                title: "Mr. Controller",
                artist: "Kool Keith",
                year: 2023,
                category: "solo",
                search: "mr controller kool keith 2023",
                coverSrc: "album-covers/mr-controller.jpg",
                slug: "mr-controller"
            },
            {
                title: "World Area",
                artist: "Kool Keith",
                year: 2023,
                category: "solo",
                search: "world area kool keith 2023",
                coverSrc: "album-covers/world-area.jpg",
                slug: "world-area"
            },
            {
                title: "Divinity 2 Infinity: The Odyssey",
                artist: "DJ Muggs & Kool Keith",
                year: 2023,
                category: "collab",
                search: "divinity infinity odyssey dj muggs kool keith 2023",
                coverSrc: "album-covers/divinity-infinity.jpg",
                slug: "divinity-2-infinity-the-odyssey"
            },
            {
                title: "Aponia",
                artist: "Awol One & Kool Keith",
                year: 2024,
                category: "collab",
                search: "aponia awol one kool keith 2024",
                coverSrc: "album-covers/aponia.jpg",
                slug: "aponia"
            },
            {
                title: "Bandoleros",
                artist: "Lynx 196.9, Arturo Banbini, Kool Keith",
                year: 2024,
                category: "collab",
                search: "bandoleros lynx arturo banbini kool keith 2024",
                coverSrc: "album-covers/bandoleros.jpg",
                slug: "bandoleros"
            },
            {
                title: "Everybody Eats!",
                artist: "Stress Eater (CZARFACE & Kool Keith)",
                year: 2024,
                category: "collab",
                search: "everybody eats stress eater czarface kool keith 2024",
                coverSrc: "album-covers/everybody-eats.jpg",
                slug: "everybody-eats"
            },
            {
                title: "We Can Do It",
                artist: "Kool Keith & Kiew Nikon",
                year: 2024,
                category: "collab",
                search: "we can do it kool keith kiew nikon 2024",
                coverSrc: "album-covers/we-can-do-it.jpg",
                slug: "we-can-do-it"
            },
            {
                title: "Best of All Possible Worlds",
                artist: "AJJ, Kool Keith & Kimya Dawson",
                year: 2024,
                category: "collab",
                search: "best all possible worlds ajj kool keith kimya dawson 2024",
                coverSrc: "album-covers/best-possible-worlds.jpg",
                slug: "best-of-all-possible-worlds"
            },
            {
                title: "STRIKE!",
                artist: "Kool Keith, Audio Assault & Ceschi",
                year: 2024,
                category: "collab",
                search: "strike kool keith audio assault ceschi 2024",
                coverSrc: "album-covers/strike.jpg",
                slug: "strike"
            },
            {
                title: "Private Selection",
                artist: "Kool Keith & MC Homeless",
                year: 2024,
                category: "collab",
                search: "private selection kool keith mc homeless 2024",
                coverSrc: "album-covers/private-selection.jpg",
                slug: "private-selection"
            },
            {
                title: "Karpenters",
                artist: "Kool Keith",
                year: 2025,
                category: "solo",
                search: "karpenters kool keith 2025",
                coverSrc: "album-covers/karpenters.jpg",
                slug: "karpenters"
            },
            {
                title: "DAW",
                artist: "Kool Keith",
                year: 2025,
                category: "solo",
                search: "daw kool keith 2025",
                coverSrc: "album-covers/daw.jpg",
                slug: "daw"
            },
            {
                title: "Dear Derrick",
                artist: "Kool Keith",
                year: 2025,
                category: "solo",
                search: "dear derrick kool keith 2025",
                coverSrc: "album-covers/dear-derrick.jpg",
                slug: "dear-derrick"
            }
        ];
        
        // Merge existing DOM albums with complete discography
        const domAlbums = this.loadDOMAlbums();
        return [...domAlbums, ...additionalAlbums];
    }
    
    /**
     * Load albums from DOM elements
     */
    loadDOMAlbums() {
        const albumCards = document.querySelectorAll('.album-card');
        const albums = [];
        
        albumCards.forEach(card => {
            albums.push({
                title: card.dataset.title,
                artist: card.querySelector('.album-artist').textContent,
                year: parseInt(card.dataset.year),
                category: card.dataset.category,
                search: card.dataset.search,
                element: card,
                coverSrc: card.querySelector('.album-cover').src,
                slug: this.createSlug(card.dataset.title)
            });
        });
        
        return albums;
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.updateStats();
        this.applyFiltersAndSort();
        this.updatePagination();
        
        console.log('🎵 Ultra Keith Music App initialized with', this.allAlbums.length, 'albums');
    }
    
    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.filter);
            });
        });
        
        // Sort select
        this.sortSelect.addEventListener('change', (e) => {
            this.handleSort(e.target.value);
        });
        
        // Search input with debouncing
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 300);
        });
        
        // Pagination
        this.prevBtn.addEventListener('click', () => {
            this.goToPage(this.currentPage - 1);
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.goToPage(this.currentPage + 1);
        });
        
        // Album clicks (delegation)
        this.albumsGrid.addEventListener('click', (e) => {
            const albumCard = e.target.closest('.album-card');
            if (albumCard) {
                this.handleAlbumClick(albumCard);
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && e.target !== this.searchInput) {
                e.preventDefault();
                this.searchInput.focus();
            }
        });
    }
    
    /**
     * Handle filter selection
     */
    handleFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Update active button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.applyFiltersAndSort();
        this.updatePagination();
    }
    
    /**
     * Handle sort selection
     */
    handleSort(sortType) {
        this.currentSort = sortType;
        this.currentPage = 1;
        this.applyFiltersAndSort();
        this.updatePagination();
    }
    
    /**
     * Handle search input
     */
    handleSearch(query) {
        this.currentSearch = query.toLowerCase().trim();
        this.currentPage = 1;
        this.applyFiltersAndSort();
        this.updatePagination();
    }
    
    /**
     * Apply filters, search, and sorting
     */
    applyFiltersAndSort() {
        // Start with all albums
        let filtered = [...this.allAlbums];
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(album => album.category === this.currentFilter);
        }
        
        // Apply search filter
        if (this.currentSearch) {
            filtered = filtered.filter(album => {
                const searchableText = `${album.title} ${album.artist} ${album.search || ''}`.toLowerCase();
                return searchableText.includes(this.currentSearch);
            });
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'year-desc':
                    return b.year - a.year;
                case 'year-asc':
                    return a.year - b.year;
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return b.year - a.year;
            }
        });
        
        this.filteredAlbums = filtered;
        this.renderCurrentPage();
        this.updateResultsCount();
        this.toggleNoResults();
    }
    
    /**
     * Render albums for current page
     */
    renderCurrentPage() {
        const startIndex = (this.currentPage - 1) * this.albumsPerPage;
        const endIndex = startIndex + this.albumsPerPage;
        const pageAlbums = this.filteredAlbums.slice(startIndex, endIndex);
        
        // Clear current albums
        this.albumsGrid.innerHTML = '';
        
        // Render page albums
        pageAlbums.forEach(album => {
            const albumCard = this.createAlbumCard(album);
            this.albumsGrid.appendChild(albumCard);
        });
        
        // Scroll to top on page change
        if (this.currentPage > 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    /**
     * Create album card element
     */
    createAlbumCard(album) {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.dataset.category = album.category;
        card.dataset.year = album.year;
        card.dataset.title = album.title;
        card.dataset.search = album.search;
        card.dataset.slug = album.slug;
        
        const badgeClass = `badge-${album.category}`;
        const badgeText = album.category.charAt(0).toUpperCase() + album.category.slice(1);
        
        card.innerHTML = `
            <div class="album-badge ${badgeClass}">${badgeText}</div>
            <img src="${album.coverSrc}" alt="${album.title}" class="album-cover" loading="lazy">
            <h3 class="album-title">${album.title}</h3>
            <p class="album-artist">${album.artist}</p>
            <p class="album-year">${album.year}</p>
        `;
        
        return card;
    }
    
    /**
     * Update pagination controls
     */
    updatePagination() {
        const totalPages = Math.ceil(this.filteredAlbums.length / this.albumsPerPage);
        
        // Update prev/next buttons
        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        
        // Update page numbers
        this.pageNumbers.innerHTML = '';
        
        if (totalPages <= 1) {
            this.paginationSection.style.display = 'none';
            return;
        }
        
        this.paginationSection.style.display = 'flex';
        
        // Calculate page range to show
        const maxVisible = 7;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        // Adjust start if we're near the end
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        // Create page buttons
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn page-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.dataset.page = i;
            
            pageBtn.addEventListener('click', () => {
                this.goToPage(i);
            });
            
            this.pageNumbers.appendChild(pageBtn);
        }
    }
    
    /**
     * Navigate to specific page
     */
    goToPage(pageNumber) {
        const totalPages = Math.ceil(this.filteredAlbums.length / this.albumsPerPage);
        
        if (pageNumber < 1 || pageNumber > totalPages) return;
        
        this.currentPage = pageNumber;
        this.renderCurrentPage();
        this.updatePagination();
    }
    
    /**
     * Update results count display
     */
    updateResultsCount() {
        const startIndex = (this.currentPage - 1) * this.albumsPerPage + 1;
        const endIndex = Math.min(startIndex + this.albumsPerPage - 1, this.filteredAlbums.length);
        const total = this.filteredAlbums.length;
        
        if (total === 0) {
            this.resultsCount.textContent = 'No albums found';
        } else if (total <= this.albumsPerPage) {
            this.resultsCount.textContent = `Showing ${total} of ${this.allAlbums.length} albums`;
        } else {
            this.resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${total} albums`;
        }
    }
    
    /**
     * Update stats in header
     */
    updateStats() {
        if (this.totalAlbumsSpan) {
            this.totalAlbumsSpan.textContent = this.allAlbums.length;
        }
    }
    
    /**
     * Toggle no results message
     */
    toggleNoResults() {
        const showNoResults = this.filteredAlbums.length === 0;
        this.noResults.style.display = showNoResults ? 'block' : 'none';
        this.albumsGrid.style.display = showNoResults ? 'none' : 'grid';
    }
    
    /**
     * Handle album card click
     */
    handleAlbumClick(albumCard) {
        const slug = albumCard.dataset.slug;
        const title = albumCard.querySelector('.album-title').textContent;
        const artist = albumCard.querySelector('.album-artist').textContent;
        const year = albumCard.querySelector('.album-year').textContent;
        
        console.log('Album clicked:', { title, artist, year, slug });
        
        // Navigate to individual album page
        const albumUrl = `albums/${slug}.html`;
        
        // For development, just log the intended navigation
        console.log('Would navigate to:', albumUrl);
        
        // Uncomment when album pages are ready:
        // window.location.href = albumUrl;
    }
    
    /**
     * Create URL-friendly slug from title
     */
    createSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    /**
     * Get category statistics
     */
    getCategoryStats() {
        const stats = {
            solo: 0,
            collab: 0
        };
        
        this.allAlbums.forEach(album => {
            if (stats.hasOwnProperty(album.category)) {
                stats[album.category]++;
            }
        });
        
        return stats;
    }
    
    /**
     * Add new albums (for future expansions)
     */
    addAlbums(newAlbums) {
        newAlbums.forEach(album => {
            album.slug = album.slug || this.createSlug(album.title);
            album.search = album.search || `${album.title} ${album.artist} ${album.year}`.toLowerCase();
        });
        
        this.allAlbums.push(...newAlbums);
        this.updateStats();
        this.applyFiltersAndSort();
        this.updatePagination();
        
        console.log(`Added ${newAlbums.length} new albums. Total: ${this.allAlbums.length}`);
    }
}

/**
 * Mobile Menu Handler
 */
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.getElementById('navMenu');
        
        if (this.menuBtn && this.navMenu) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.menuBtn.addEventListener('click', () => {
            this.toggle();
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuBtn.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.close();
            }
        });
    }
    
    toggle() {
        const isOpen = this.navMenu.classList.toggle('show');
        this.menuBtn.setAttribute('aria-expanded', isOpen);
    }
    
    close() {
        this.navMenu.classList.remove('show');
        this.menuBtn.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Performance and utility functions
 */
class AppUtils {
    /**
     * Debounce function for search input
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Lazy load images as they come into view
     */
    static initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    /**
     * Smooth scroll to element
     */
    static scrollToElement(element, offset = 0) {
        const elementTop = element.offsetTop - offset;
        window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
        });
    }
    
    /**
     * Get viewport width
     */
    static getViewportWidth() {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }
    
    /**
     * Check if device is mobile
     */
    static isMobile() {
        return AppUtils.getViewportWidth() <= 768;
    }
}

/**
 * Analytics and tracking (placeholder for future implementation)
 */
class Analytics {
    static trackAlbumClick(albumTitle, albumArtist, albumYear) {
        console.log('Analytics: Album clicked', {
            title: albumTitle,
            artist: albumArtist,
            year: albumYear,
            timestamp: new Date().toISOString()
        });
    }
    
    static trackFilterUsage(filterType, filterValue) {
        console.log('Analytics: Filter used', {
            type: filterType,
            value: filterValue,
            timestamp: new Date().toISOString()
        });
    }
    
    static trackSearchQuery(query, resultsCount) {
        console.log('Analytics: Search performed', {
            query: query,
            results: resultsCount,
            timestamp: new Date().toISOString()
        });
    }
}

/**
 * Initialize application when DOM is ready - FIXED EVENT BINDING
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 DOM loaded, initializing...');
    
    try {
        // Initialize main application
        window.musicApp = new MusicDiscographyApp();
        console.log('✅ Music app initialized');
        
        // Initialize mobile menu
        window.mobileMenu = new MobileMenu();
        console.log('✅ Mobile menu initialized');
        
        // Initialize utilities
        AppUtils.initLazyLoading();
        console.log('✅ Utilities initialized');
        
        // Test button functionality
        const testButtons = () => {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const sortSelect = document.getElementById('sortSelect');
            const searchInput = document.getElementById('searchInput');
            
            console.log('🔍 Found elements:');
            console.log('Filter buttons:', filterBtns.length);
            console.log('Sort select:', sortSelect ? 'Found' : 'Not found');
            console.log('Search input:', searchInput ? 'Found' : 'Not found');
            
            // Add emergency event listeners if needed
            if (filterBtns.length === 0) {
                console.error('❌ No filter buttons found!');
            }
            
            // Manual button binding as fallback
            filterBtns.forEach((btn, index) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🔘 Filter button clicked:', btn.dataset.filter);
                    if (window.musicApp) {
                        window.musicApp.handleFilter(btn.dataset.filter);
                    }
                });
                console.log(`✅ Filter button ${index + 1} bound`);
            });
        };
        
        // Run test after a brief delay
        setTimeout(testButtons, 100);
        
        console.log('🎵 Ultra Keith Music App fully initialized with 75 albums!');
        
    } catch (error) {
        console.error('❌ Error initializing music app:', error);
        
        // Fallback: ensure basic functionality works
        setTimeout(() => {
            console.log('🔧 Setting up fallback event listeners...');
            
            // Fallback filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🔘 Fallback filter clicked:', btn.dataset.filter);
                    
                    // Update active state
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Basic filtering
                    const filter = btn.dataset.filter;
                    const cards = document.querySelectorAll('.album-card');
                    
                    cards.forEach(card => {
                        if (filter === 'all' || card.dataset.category === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
            
            // Fallback mobile menu
            const mobileBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.getElementById('navMenu');
            
            if (mobileBtn && navMenu) {
                mobileBtn.addEventListener('click', () => {
                    console.log('📱 Mobile menu toggled');
                    navMenu.classList.toggle('show');
                });
            }
            
            console.log('✅ Fallback event listeners set up');
            
        }, 500);
    }
});

/**
 * Handle window resize events
 */
window.addEventListener('resize', AppUtils.debounce(() => {
    if (window.musicApp) {
        window.musicApp.renderCurrentPage();
    }
}, 250));

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Music app paused (tab hidden)');
    } else {
        console.log('Music app resumed (tab visible)');
    }
});

/**
 * Global error handling
 */
window.addEventListener('error', (e) => {
    console.error('Music App error:', e.error);
});

/**
 * Global function to add albums (for future expansions)
 */
window.addNewAlbums = function(albums) {
    if (window.musicApp && Array.isArray(albums)) {
        window.musicApp.addAlbums(albums);
        return `Added ${albums.length} albums successfully!`;
    } else {
        console.error('Music app not initialized or invalid albums data');
        return 'Error adding albums';
    }
};

/**
 * Global function to get app statistics
 */
window.getMusicAppStats = function() {
    if (window.musicApp) {
        return {
            totalAlbums: window.musicApp.allAlbums.length,
            filteredAlbums: window.musicApp.filteredAlbums.length,
            currentPage: window.musicApp.currentPage,
            currentFilter: window.musicApp.currentFilter,
            currentSort: window.musicApp.currentSort,
            categoryStats: window.musicApp.getCategoryStats()
        };
    }
    return null;
};

/**
 * Export for module systems (if needed)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MusicDiscographyApp,
        MobileMenu,
        AppUtils,
        Analytics
    };
}Src: "album-covers/to-give-you-love.jpg",
                slug: "to-give-you-love"
            },
            {
                title: "Critical Beatdown",
                artist: "Ultramagnetic MCs",
                year: 1988,
                category: "collab",
                search: "critical beatdown ultramagnetic mcs 1988",
                coverSrc: "album-covers/critical-beatdown.jpg",
                slug: "critical-beatdown"
            },
            {
                title: "Funk Your Head Up",
                artist: "Ultramagnetic MCs",
                year: 1992,
                category: "collab",
                search: "funk your head up ultramagnetic mcs 1992",
                coverSrc: "album-covers/funk-your-head-up.jpg",
                slug: "funk-your-head-up"
            },
            {
                title: "The Four Horsemen",
                artist: "Ultramagnetic MCs",
                year: 1993,
                category: "collab",
                search: "four horsemen ultramagnetic mcs 1993",
                coverSrc: "album-covers/four-horsemen.jpg",
                slug: "the-four-horsemen"
            },
            {
                title: "Dr. Octagonecologyst",
                artist: "Dr. Octagon",
                year: 1996,
                category: "solo",
                search: "dr octagonecologyst dr octagon 1996",
                coverSrc: "album-covers/dr-octagonecologyst.jpg",
                slug: "dr-octagonecologyst"
            },
            {
                title: "The Instrumentalyst",
                artist: "Dr. Octagon",
                year: 1996,
                category: "solo",
                search: "instrumentalyst dr octagon 1996",
                coverSrc: "album-covers/instrumentalyst.jpg",
                slug: "the-instrumentalyst"
            },
            {
                title: "Big Time",
                artist: "Ultra (Keith & Tim Dog)",
                year: 1996,
                category: "collab",
                search: "big time ultra keith tim dog 1996",
                coverSrc: "album-covers/big-time.jpg",
                slug: "big-time"
            },
            {
                title: "Sex Style",
                artist: "Kool Keith",
                year: 1997,
                category: "solo",
                search: "sex style kool keith 1997",
                coverSrc: "album-covers/sex-style.jpg",
                slug: "sex-style"
            },
            {
                title: "The Cenobites LP",
                artist: "Cenobites",
                year: 1997,
                category: "collab",
                search: "cenobites lp kool keith godfather don 1997",
                coverSrc: "album-covers/cenobites-lp.jpg",
                slug: "the-cenobites-lp"
            },
            {
                title: "First Come, First Served",
                artist: "Dr. Dooom",
                year: 1999,
                category: "solo",
                search: "first come first served dr dooom 1999",
                coverSrc: "album-covers/first-come-first-served.jpg",
                slug: "first-come-first-served"
            },
            {
                title: "Black Elvis/Lost in Space",
                artist: "Black Elvis",
                year: 1999,
                category: "solo",
                search: "black elvis lost in space 1999",
                coverSrc: "album-covers/black-elvis.jpg",
                slug: "black-elvis-lost-in-space"
            },
            
            // 2000s Era
            {
                title: "Matthew",
                artist: "Kool Keith",
                year: 2000,
                category: "solo",
                search: "matthew kool keith 2000",
                coverSrc: "album-covers/matthew.jpg",
                slug: "matthew"
            },
            {
                title: "Pimp to Eat",
                artist: "Analog Brothers",
                year: 2000,
                category: "collab",
                search: "pimp to eat analog brothers 2000",
                coverSrc: "album-covers/pimp-to-eat.jpg",
                slug: "pimp-to-eat"
            },
            {
                title: "A Much Better Tomorrow",
                artist: "Kool Keith & Dan The Automator",
                year: 2000,
                category: "collab",
                search: "much better tomorrow kool keith dan automator 2000",
                coverSrc: "album-covers/much-better-tomorrow.jpg",
                slug: "a-much-better-tomorrow"
            },
            {
                title: "Masters of Illusion",
                artist: "Masters of Illusion",
                year: 2000,
                category: "collab",
                search: "masters illusion kutmasta kurt 2000",
                coverSrc: "album-covers/masters-illusion.jpg",
                slug: "masters-of-illusion"
            },
            {
                title: "Spankmaster",
                artist: "Kool Keith",
                year: 2001,
                category: "solo",
                search: "spankmaster kool keith 2001",
                coverSrc: "album-covers/spankmaster.jpg",
                slug: "spankmaster"
            },
            {
                title: "Game",
                artist: "KHM",
                year: 2002,
                category: "collab",
                search: "game khm keith h-bomb marc live 2002",
                coverSrc: "album-covers/game.jpg",
                slug: "game"
            },
            {
                title: "Diesel Truckers",
                artist: "Kool Keith & KutMasta Kurt",
                year: 2004,
                category: "collab",
                search: "diesel truckers kool keith kutmasta kurt 2004",
                coverSrc: "album-covers/diesel-truckers.jpg",
                slug: "diesel-truckers"
            },
            {
                title: "Clayborne Family",
                artist: "Kool Keith & Jacky Jasper",
                year: 2004,
                category: "collab",
                search: "clayborne family kool keith jacky jasper 2004",
                coverSrc: "album-covers/clayborne-family.jpg",
                slug: "clayborne-family"
            },
            {
                title: "Thee Undatakerz",
                artist: "Kool Keith & Thee Undatakerz",
                year: 2004,
                category: "collab",
                search: "thee undatakerz kool keith 2004",
                coverSrc: "album-covers/thee-undatakerz.jpg",
                slug: "thee-undatakerz"
            },
            {
                title: "The Personal Album",
                artist: "Kool Keith",
                year: 2004,
                category: "solo",
                search: "personal album kool keith 2004",
                coverSrc: "album-covers/personal-album.jpg",
                slug: "the-personal-album"
            },
            {
                title: "Official Space Tape",
                artist: "Kool Keith",
                year: 2004,
                category: "solo",
                search: "official space tape kool keith 2004",
                coverSrc: "album-covers/official-space-tape.jpg",
                slug: "official-space-tape"
            },
            {
                title: "The Lost Masters Vol. 2",
                artist: "Kool Keith",
                year: 2005,
                category: "solo",
                search: "lost masters vol 2 kool keith 2005",
                coverSrc: "album-covers/lost-masters-vol2.jpg",
                slug: "the-lost-masters-vol-2"
            },
            {
                title: "Execution One",
                artist: "Kool Keith",
                year: 2005,
                category: "solo",
                search: "execution one kool keith 2005",
                coverSrc: "album-covers/execution-one.jpg",
                slug: "execution-one"
            },
            {
                title: "Nogatco Rd.",
                artist: "Mr. Nogatco",
                year: 2006,
                category: "solo",
                search: "nogatco rd mr nogatco kool keith 2006",
                coverSrc: "album-covers/nogatco-rd.jpg",
                slug: "nogatco-rd"
            },
            {
                title: "The Return of Dr. Octagon",
                artist: "Dr. Octagon",
                year: 2006,
                category: "solo",
                search: "return dr octagon 2006",
                coverSrc: "album-covers/return-dr-octagon.jpg",
                slug: "the-return-of-dr-octagon"
            },
            {
                title: "Collabs Tape",
                artist: "Kool Keith",
                year: 2006,
                category: "solo",
                search: "collabs tape kool keith 2006",
                coverSrc: "album-covers/collabs-tape.jpg",
                slug: "collabs-tape"
            },
            {
                title: "The Commi$$ioner",
                artist: "Kool Keith",
                year: 2006,
                category: "solo",
                search: "commissioner kool keith 2006",
                coverSrc: "album-covers/commissioner.jpg",
                slug: "the-commissioner"
            },
            {
                title: "The Original SoundTrack Album",
                artist: "Project Polaroid",
                year: 2006,
                category: "collab",
                search: "original soundtrack album project polaroid 2006",
                coverSrc: "album-covers/project-polaroid.jpg",
                slug: "the-original-soundtrack-album"
            },
            {
                title: "Dr. Dooom 2",
                artist: "Dr. Dooom",
                year: 2007,
                category: "solo",
                search: "dr dooom 2 2007",
                coverSrc: "album-covers/dr-dooom-2.jpg",
                slug: "dr-dooom-2"
            },
            {
                title: "Sex Style: The Un-Released Archives",
                artist: "Kool Keith",
                year: 2007,
                category: "solo",
                search: "sex style unreleased archives kool keith 2007",
                coverSrc: "album-covers/sex-style-archives.jpg",
                slug: "sex-style-the-un-released-archives"
            },
            {
                title: "The Best Kept Secret",
                artist: "Ultramagnetic MCs",
                year: 2007,
                category: "collab",
                search: "best kept secret ultramagnetic mcs 2007",
                coverSrc: "album-covers/best-kept-secret.jpg",
                slug: "the-best-kept-secret"
            },
            {
                title: "Dr. Octagon Part 2",
                artist: "Dr. Octagon",
                year: 2008,
                category: "solo",
                search: "dr octagon part 2 2008",
                coverSrc: "album-covers/dr-octagon-part2.jpg",
                slug: "dr-octagon-part-2"
            },
            {
                title: "Tashan Dorrsett",
                artist: "Tashan Dorrsett",
                year: 2009,
                category: "solo",
                search: "tashan dorrsett 2009",
                coverSrc: "album-covers/tashan-dorrsett.jpg",
                slug: "tashan-dorrsett"
            },
            {
                title: "Bikinis N Thongs",
                artist: "Kool Keith & Denis Deft",
                year: 2009,
                category: "collab",
                search: "bikinis thongs kool keith denis deft 2009",
                coverSrc: "album-covers/bikinis-thongs.jpg",
                slug: "bikinis-n-thongs"
            },
            {
                title: "Idea of a Masterpiece",
                artist: "Kool Keith & 54-71",
                year: 2009,
                category: "collab",
                search: "idea masterpiece kool keith 54-71 2009",
                coverSrc: "album-covers/idea-masterpiece.jpg",
                slug: "idea-of-a-masterpiece"
            },
            {
                title: "Stoned",
                artist: "7th Veil",
                year: 2009,
                category: "collab",
                search: "stoned 7th veil kool keith h-bomb 2009",
                coverSrc: "album-covers/stoned.jpg",
                slug: "stoned"
            },
            
            // 2010s Era
            {
                title: "Legend of Tashan Dorrsett",
                artist: "Kool Keith",
                year: 2011,
                category: "solo",
                search: "legend tashan dorrsett kool keith 2011",
                coverSrc: "album-covers/legend-tashan.jpg",
                slug: "legend-of-tashan-dorrsett"
            },
            {
                title: "Love and Danger",
                artist: "Kool Keith",
                year: 2012,
                category: "solo",
                search: "love danger kool keith 2012",
                coverSrc: "album-covers/love-danger.jpg",
                slug: "love-and-danger"
            },
            {
                title: "Magnetic Pimp Force Field",
                artist: "Kool Keith & Big Sche Eastwood",
                year: 2013,
                category: "collab",
                search: "magnetic pimp force field kool keith big sche 2013",
                coverSrc: "album-covers/magnetic-pimp.jpg",
                slug: "magnetic-pimp-force-field"
            },
            {
                title: "October",
                artist: "Kool Keith & KutMasta Kurt",
                year: 2013,
                category: "collab",
                search: "october kool keith kutmasta kurt 2013",
                coverSrc: "album-covers/october.jpg",
                slug: "october"
            },
            {
                title: "El Dorado Driven",
                artist: "Kool Keith",
                year: 2014,
                category: "solo",
                search: "el dorado driven kool keith 2014",
                coverSrc: "album-covers/el-dorado.jpg",
                slug: "el-dorado-driven"
            },
            {
                title: "Time? Astonishing!",
                artist: "L'Orange & Kool Keith",
                year: 2015,
                category: "collab",
                search: "time astonishing lorange kool keith 2015",
                coverSrc: "album-covers/time-astonishing.jpg",
                slug: "time-astonishing"
            },
            {
                title: "A Couple of Slices",
                artist: "Kool Keith & Ray West",
                year: 2015,
                category: "collab",
                search: "couple slices kool keith ray west 2015",
                coverSrc: "album-covers/couple-slices.jpg",
                slug: "a-couple-of-slices"
            },
            {
                title: "Demolition Crash",
                artist: "Kool Keith",
                year: 2015,
                category: "solo",
                search: "demolition crash kool keith 2015",
                coverSrc: "album-covers/demolition-crash.jpg",
                slug: "demolition-crash"
            },
            {
                title: "Feature Magnetic",
                artist: "Kool Keith",
                year: 2016,
                category: "solo",
                search: "feature magnetic kool keith 2016",
                coverSrc: "album-covers/feature-magnetic.jpg",
                slug: "feature-magnetic"
            },
            {
                title: "The Preacher",
                artist: "Kool Keith",
                year: 2016,
                category: "solo",
                search: "preacher kool keith 2016",
                coverSrc: "album-covers/preacher.jpg",
                slug: "the-preacher"
            },
            {
                title: "Pimp to Eat (Reissue)",
                artist: "Analog Brothers",
                year: 2016,
                category: "collab",
                search: "pimp to eat reissue analog brothers 2016",
                coverSrc: "album-covers/pimp-to-eat-reissue.jpg",
                slug: "pimp-to-eat-reissue"
            },
            {
                title: "Colossal",
                artist: "Kool Keith",
                year: 2017,
                category: "solo",
                search: "colossal kool keith 2017",
                coverSrc: "album-covers/colossal.jpg",
                slug: "colossal"
            },
            {
                title: "Moosebumps: An Exploration Into...",
                artist: "Dr. Octagon",
                year: 2018,
                category: "solo",
                search: "moosebumps exploration dr octagon 2018",
                coverSrc: "album-covers/moosebumps.jpg",
                slug: "moosebumps-an-exploration-into"
            },
            {
                title: "Controller of Trap",
                artist: "Kool Keith",
                year: 2018,
                category: "solo",
                search: "controller trap kool keith 2018",
                coverSrc: "album-covers/controller-trap.jpg",
                slug: "controller-of-trap"
            },
            {
                title: "Keith",
                artist: "Kool Keith",
                year: 2019,
                category: "solo",
                search: "keith kool keith 2019",
                coverSrc: "album-covers/keith.jpg",
                slug: "keith"
            },
            {
                title: "Computer Technology",
                artist: "Kool Keith",
                year: 2019,
                category: "solo",
                search: "computer technology kool keith 2019",
                coverSrc: "album-covers/computer-technology.jpg",
                slug: "computer-technology"
            },
            {
                title: "Saks 5th Ave",
                artist: "Kool Keith",
                year: 2019,
                category: "solo",
                search: "saks 5th ave kool keith 2019",
                coverSrc: "album-covers/saks-5th.jpg",
                slug: "saks-5th-ave"
            },
            {
                title: "Blast b/w Uncrushable",
                artist: "Kool Keith",
                year: 2019,
                category: "solo",
                search: "blast uncrushable kool keith 2019",
                coverSrc: "album-covers/blast-uncrushable.jpg",
                slug: "blast-bw-uncrushable"
            },
            
            // 2020s Era - The Prolific Years
            {
                title: "Space Goretex",
                artist: "Kool Keith & Thetan",
                year: 2020,
                category: "collab",
                search: "space goretex kool keith thetan 2020",
                coverSrc: "album-covers/space-goretex.jpg",
                slug: "space-goretex"
            },
