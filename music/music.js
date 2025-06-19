'use strict';

/**
 * Ultra Keith Music Discography Application
 * Complete filtering, sorting, pagination, and search functionality
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
        
        // Albums data (will be populated with your complete discography)
        this.allAlbums = this.loadAlbumsData();
        this.filteredAlbums = [...this.allAlbums];
        
        this.init();
    }
    
    /**
     * Load albums data from DOM and additional data
     */
    loadAlbumsData() {
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
        
        // Add more albums from your paste data
        const additionalAlbums = [
            {
                title: "Personal Album",
                artist: "Kool Keith",
                year: 2002,
                category: "solo",
                search: "personal album kool keith 2002",
                coverSrc: "album-covers/personal-album.jpg",
                slug: "personal-album"
            },
            {
                title: "World Wide Lambs",
                artist: "Kool Keith", 
                year: 2001,
                category: "solo",
                search: "world wide lambs kool keith 2001",
                coverSrc: "album-covers/world-wide-lambs.jpg",
                slug: "world-wide-lambs"
            },
            {
                title: "Spankmaster",
                artist: "Spankmaster",
                year: 2001,
                category: "persona",
                search: "spankmaster spankmaster 2001",
                coverSrc: "album-covers/spankmaster.jpg",
                slug: "spankmaster"
            },
            {
                title: "Masters of Illusion",
                artist: "KutMasta Kurt & Motion Man",
                year: 2000,
                category: "collab",
                search: "masters of illusion kutmasta kurt motion man 2000",
                coverSrc: "album-covers/masters-illusion.jpg",
                slug: "masters-of-illusion"
            },
            {
                title: "Pimp to Eat",
                artist: "Analog Brothers",
                year: 2000,
                category: "group",
                search: "pimp to eat analog brothers 2000",
                coverSrc: "album-covers/pimp-to-eat.jpg",
                slug: "pimp-to-eat"
            },
            {
                title: "First Come, First Served",
                artist: "Dr. Dooom",
                year: 1999,
                category: "persona",
                search: "first come first served dr dooom 1999",
                coverSrc: "album-covers/first-come-first-served.jpg",
                slug: "first-come-first-served"
            },
            {
                title: "Black Elvis/Lost in Space",
                artist: "Black Elvis",
                year: 1999,
                category: "persona",
                search: "black elvis lost in space black elvis 1999",
                coverSrc: "album-covers/black-elvis.jpg",
                slug: "black-elvis-lost-in-space"
            },
            {
                title: "0304",
                artist: "Kool Keith & Godfather Don",
                year: 1999,
                category: "collab",
                search: "0304 kool keith godfather don 1999",
                coverSrc: "album-covers/0304.jpg",
                slug: "0304"
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
                title: "Dr. Octagonecologyst",
                artist: "Dr. Octagon",
                year: 1996,
                category: "persona",
                search: "dr octagonecologyst dr octagon 1996",
                coverSrc: "album-covers/dr-octagonecologyst.jpg",
                slug: "dr-octagonecologyst"
            },
            {
                title: "Big Time",
                artist: "Ultra (Keith & Tim Dog)",
                year: 1996,
                category: "collab",
                search: "big time ultra tim dog 1996",
                coverSrc: "album-covers/big-time.jpg",
                slug: "big-time"
            },
            {
                title: "The Four Horsemen",
                artist: "Ultramagnetic MCs",
                year: 1993,
                category: "group",
                search: "four horsemen ultramagnetic mcs 1993",
                coverSrc: "album-covers/four-horsemen.jpg",
                slug: "the-four-horsemen"
            },
            {
                title: "Funk Your Head Up",
                artist: "Ultramagnetic MCs",
                year: 1992,
                category: "group",
                search: "funk your head up ultramagnetic mcs 1992",
                coverSrc: "album-covers/funk-your-head-up.jpg",
                slug: "funk-your-head-up"
            },
            {
                title: "Critical Beatdown",
                artist: "Ultramagnetic MCs",
                year: 1988,
                category: "group",
                search: "critical beatdown ultramagnetic mcs 1988",
                coverSrc: "album-covers/critical-beatdown.jpg",
                slug: "critical-beatdown"
            }
        ];
        
        // Merge existing and additional albums
        return [...albums, ...additionalAlbums];
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.updateStats();
        this.applyFiltersAndSort();
        this.updatePagination();
        
        console.log('Ultra Keith Music App initialized with', this.allAlbums.length, 'albums');
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
        
        // Search input
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
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
        const maxVisible = 5;
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
        // For now, we'll create a URL structure like: /music/albums/album-slug.html
        const albumUrl = `albums/${slug}.html`;
        
        // You can uncomment this when album pages are ready:
        // window.location.href = albumUrl;
        
        // For development, just log the intended navigation
        console.log('Would navigate to:', albumUrl);
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
            collab: 0,
            persona: 0,
            group: 0
        };
        
        this.allAlbums.forEach(album => {
            if (stats.hasOwnProperty(album.category)) {
                stats[album.category]++;
            }
        });
        
        return stats;
    }
    
    /**
     * Add new albums (for when you provide 100 albums)
     */
    addAlbums(newAlbums) {
        newAlbums.forEach(album => {
            // Ensure album has required properties
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
        
        // Add mobile menu styles if not already present
        if (isOpen && !this.navMenu.style.display) {
            this.navMenu.style.display = 'flex';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.position = 'absolute';
            this.navMenu.style.top = '100%';
            this.navMenu.style.left = '0';
            this.navMenu.style.right = '0';
            this.navMenu.style.background = 'rgba(10, 10, 10, 0.98)';
            this.navMenu.style.backdropFilter = 'blur(25px)';
            this.navMenu.style.padding = 'var(--space-lg)';
            this.navMenu.style.borderTop = '1px solid rgba(218, 181, 71, 0.2)';
        }
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
        // Placeholder for analytics tracking
        console.log('Analytics: Album clicked', {
            title: albumTitle,
            artist: albumArtist,
            year: albumYear,
            timestamp: new Date().toISOString()
        });
        
        // Future implementation could include:
        // - Google Analytics events
        // - Custom analytics API calls
        // - User behavior tracking
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
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize main application
        window.musicApp = new MusicDiscographyApp();
        
        // Initialize mobile menu
        window.mobileMenu = new MobileMenu();
        
        // Initialize utilities
        AppUtils.initLazyLoading();
        
        // Add debounced search if needed
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            const debouncedSearch = AppUtils.debounce((value) => {
                window.musicApp.handleSearch(value);
                Analytics.trackSearchQuery(value, window.musicApp.filteredAlbums.length);
            }, 300);
            
            // Replace original search handler with debounced version
            searchInput.removeEventListener('input', window.musicApp.handleSearch);
            searchInput.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
            });
        }
        
        console.log('🎵 Ultra Keith Music App fully initialized!');
        
    } catch (error) {
        console.error('Error initializing music app:', error);
        
        // Fallback: ensure basic functionality works
        document.querySelectorAll('.album-card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.album-title').textContent;
                console.log('Fallback: Album clicked -', title);
            });
        });
    }
});

/**
 * Handle window resize events
 */
window.addEventListener('resize', AppUtils.debounce(() => {
    if (window.musicApp) {
        // Recalculate layout if needed
        window.musicApp.renderCurrentPage();
    }
}, 250));

/**
 * Handle page visibility changes (for pause/resume functionality)
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
    
    // Could implement error reporting here
    // ErrorReporting.report(e.error);
});

/**
 * Global function to add albums (for when you provide 100 albums)
 * Usage: addNewAlbums([{title: "...", artist: "...", year: 2025, category: "solo", etc.}])
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
}
