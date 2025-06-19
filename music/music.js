'use strict';

/**
 * Ultra Keith Music Discography Application - FLICKERING FIXED
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
        
        // Albums data
        this.allAlbums = this.loadAlbumsData();
        this.filteredAlbums = [...this.allAlbums];
        
        this.init();
    }
    
    /**
     * Load Keith's complete discography - SYNTAX FIXED
     */
    loadAlbumsData() {
        const albums = [
            // 2025
            {
                title: "Dear Derrick",
                artist: "Kool Keith",
                year: 2025,
                category: "solo",
                search: "dear derrick kool keith 2025",
                coverSrc: "album-covers/placeholder.png", // Use PNG instead
                slug: "dear-derrick"
            },
            {
                title: "Karpenters",
                artist: "Kool Keith",
                year: 2025,
                category: "solo",
                search: "karpenters kool keith 2025",
                coverSrc: "album-covers/placeholder.png",
                slug: "karpenters"
            },
            {
                title: "DAW",
                artist: "Kool Keith",
                year: 2025,
                category: "solo",
                search: "daw kool keith 2025",
                coverSrc: "album-covers/placeholder.png",
                slug: "daw"
            },
            // 2024
            {
                title: "Private Selection",
                artist: "Kool Keith & MC Homeless",
                year: 2024,
                category: "collab",
                search: "private selection kool keith mc homeless 2024",
                coverSrc: "album-covers/placeholder.png",
                slug: "private-selection"
            },
            {
                title: "STRIKE!",
                artist: "Kool Keith, Audio Assault & Ceschi",
                year: 2024,
                category: "collab",
                search: "strike kool keith audio assault ceschi 2024",
                coverSrc: "album-covers/placeholder.png",
                slug: "strike"
            },
            {
                title: "Best of All Possible Worlds",
                artist: "AJJ, Kool Keith & Kimya Dawson",
                year: 2024,
                category: "collab",
                search: "best all possible worlds ajj kool keith kimya dawson 2024",
                coverSrc: "album-covers/placeholder.png",
                slug: "best-of-all-possible-worlds"
            },
            {
                title: "We Can Do It",
                artist: "Kool Keith & Kiew Nikon",
                year: 2024,
                category: "collab",
                search: "we can do it kool keith kiew nikon 2024",
                coverSrc: "album-covers/placeholder.png",
                slug: "we-can-do-it"
            },
            {
                title: "Everybody Eats!",
                artist: "Stress Eater (CZARFACE & Kool Keith)",
                year: 2024,
                category: "collab",
                search: "everybody eats stress eater czarface kool keith 2024",
                coverSrc: "album-covers/placeholder.png",
                slug: "everybody-eats"
            },
            {
                title: "Bandoleros",
                artist: "Lynx 196.9, Arturo Banbini, Kool Keith",
                year: 2024,
                category: "collab",
                search: "bandoleros lynx arturo banbini kool keith 2024",
                coverSrc: "album-covers/placeholder.png",
                slug: "bandoleros"
            },
            {
                title: "Aponia",
                artist: "Awol One & Kool Keith",
                year: 2024,
                category: "collab",
                search: "aponia awol one kool keith 2024",
                coverSrc: "album-covers/placeholder.png",
                slug: "aponia"
            },
            // 2023
            {
                title: "Divinity 2 Infinity: The Odyssey",
                artist: "DJ Muggs & Kool Keith",
                year: 2023,
                category: "collab",
                search: "divinity infinity odyssey dj muggs kool keith 2023",
                coverSrc: "album-covers/placeholder.png",
                slug: "divinity-2-infinity-the-odyssey"
            },
            {
                title: "World Area",
                artist: "Kool Keith",
                year: 2023,
                category: "solo",
                search: "world area kool keith 2023",
                coverSrc: "album-covers/placeholder.png",
                slug: "world-area"
            },
            {
                title: "Black Elvis 2",
                artist: "Kool Keith",
                year: 2023,
                category: "solo",
                search: "black elvis 2 kool keith 2023",
                coverSrc: "album-covers/placeholder.png",
                slug: "black-elvis-2"
            },
            {
                title: "Mr. Controller",
                artist: "Kool Keith",
                year: 2023,
                category: "solo",
                search: "mr controller kool keith 2023",
                coverSrc: "album-covers/placeholder.png",
                slug: "mr-controller"
            },
            {
                title: "Serpent",
                artist: "Kool Keith & Real Bad Man",
                year: 2023,
                category: "collab",
                search: "serpent kool keith real bad man 2023",
                coverSrc: "album-covers/placeholder.png",
                slug: "serpent"
            },
            // 2022
            {
                title: "Keith's Salon",
                artist: "Kool Keith",
                year: 2022,
                category: "solo",
                search: "keiths salon kool keith 2022",
                coverSrc: "album-covers/placeholder.png",
                slug: "keiths-salon"
            },
            {
                title: "Fusion Beats",
                artist: "Kool Keith",
                year: 2022,
                category: "solo",
                search: "fusion beats kool keith 2022",
                coverSrc: "album-covers/placeholder.png",
                slug: "fusion-beats"
            },
            {
                title: "Computer Technology",
                artist: "Kool Keith",
                year: 2022,
                category: "solo",
                search: "computer technology kool keith 2022",
                coverSrc: "album-covers/placeholder.png",
                slug: "computer-technology"
            },
            // 2021
            {
                title: "Space Goretex",
                artist: "Kool Keith & L'Orange",
                year: 2021,
                category: "collab",
                search: "space goretex kool keith lorange 2021",
                coverSrc: "album-covers/placeholder.png",
                slug: "space-goretex"
            },
            {
                title: "Super Hero",
                artist: "Kool Keith",
                year: 2021,
                category: "solo",
                search: "super hero kool keith 2021",
                coverSrc: "album-covers/placeholder.png",
                slug: "super-hero"
            },
            // 2020
            {
                title: "Keith",
                artist: "Kool Keith",
                year: 2020,
                category: "solo",
                search: "keith kool keith 2020",
                coverSrc: "album-covers/placeholder.png",
                slug: "keith"
            },
            {
                title: "Booty Clap",
                artist: "Kool Keith",
                year: 2020,
                category: "solo",
                search: "booty clap kool keith 2020",
                coverSrc: "album-covers/placeholder.png",
                slug: "booty-clap"
            },
            {
                title: "Feature Magnetic",
                artist: "Kool Keith",
                year: 2020,
                category: "solo",
                search: "feature magnetic kool keith 2020",
                coverSrc: "album-covers/placeholder.png",
                slug: "feature-magnetic"
            },
            // 2019
            {
                title: "Czarface Meets Ghostface",
                artist: "CZARFACE & Ghostface Killah (feat. Kool Keith)",
                year: 2019,
                category: "collab",
                search: "czarface meets ghostface kool keith 2019",
                coverSrc: "album-covers/placeholder.png",
                slug: "czarface-meets-ghostface"
            },
            // 2018
            {
                title: "Complicated Trip",
                artist: "Kool Keith & KutMasta Kurt",
                year: 2018,
                category: "collab",
                search: "complicated trip kool keith kutmasta kurt 2018",
                coverSrc: "album-covers/placeholder.png",
                slug: "complicated-trip"
            },
            {
                title: "The Preacher",
                artist: "Kool Keith",
                year: 2018,
                category: "solo",
                search: "the preacher kool keith 2018",
                coverSrc: "album-covers/placeholder.png",
                slug: "the-preacher"
            },
            // Earlier releases
            {
                title: "Critical Beatdown",
                artist: "Ultramagnetic MCs",
                year: 1988,
                category: "collab",
                search: "critical beatdown ultramagnetic mcs 1988",
                coverSrc: "album-covers/placeholder.png",
                slug: "critical-beatdown"
            },
            {
                title: "Dr. Octagonecologyst",
                artist: "Dr. Octagon",
                year: 1996,
                category: "solo",
                search: "dr octagonecologyst octagon kool keith 1996",
                coverSrc: "album-covers/placeholder.png",
                slug: "dr-octagonecologyst"
            },
            {
                title: "Sex Style",
                artist: "Kool Keith",
                year: 1997,
                category: "solo",
                search: "sex style kool keith 1997",
                coverSrc: "album-covers/placeholder.png",
                slug: "sex-style"
            },
            {
                title: "First Come, First Served",
                artist: "Dr. Dooom",
                year: 1999,
                category: "solo",
                search: "first come first served dr dooom kool keith 1999",
                coverSrc: "album-covers/placeholder.png",
                slug: "first-come-first-served"
            },
            {
                title: "Black Elvis/Lost in Space",
                artist: "Kool Keith",
                year: 1999,
                category: "solo",
                search: "black elvis lost in space kool keith 1999",
                coverSrc: "album-covers/placeholder.png",
                slug: "black-elvis-lost-in-space"
            }
        ];
        
        return albums;
    }
    
    /**
     * Initialize the application
     */
    init() {
        console.log('🎵 Initializing music app...');
        this.bindEvents();
        this.updateStats();
        this.applyFiltersAndSort();
        this.updatePagination();
        console.log('✅ Music app ready with', this.allAlbums.length, 'albums');
    }
    
    /**
     * Bind all event listeners
     */
    bindEvents() {
        console.log('🔗 Binding events...');
        
        // Filter buttons
        this.filterButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔘 Filter clicked:', btn.dataset.filter);
                this.handleFilter(btn.dataset.filter);
            });
            console.log(`✅ Filter button ${index + 1} bound`);
        });
        
        // Sort select
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                console.log('🔄 Sort changed:', e.target.value);
                this.handleSort(e.target.value);
            });
            console.log('✅ Sort select bound');
        }
        
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                console.log('🔍 Search:', e.target.value);
                this.handleSearch(e.target.value);
            });
            console.log('✅ Search input bound');
        }
        
        // Pagination
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.goToPage(this.currentPage - 1);
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.goToPage(this.currentPage + 1);
            });
        }
        
        // Album clicks
        this.albumsGrid.addEventListener('click', (e) => {
            const albumCard = e.target.closest('.album-card');
            if (albumCard) {
                this.handleAlbumClick(albumCard);
            }
        });
        
        console.log('✅ All events bound successfully');
    }
    
    /**
     * Handle filter selection
     */
    handleFilter(filter) {
        console.log('📂 Applying filter:', filter);
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
        let filtered = [...this.allAlbums];
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(album => album.category === this.currentFilter);
        }
        
        // Apply search filter
        if (this.currentSearch) {
            filtered = filtered.filter(album => {
                const searchableText = `${album.title} ${album.artist} ${album.search}`.toLowerCase();
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
        
        console.log(`📄 Rendered page ${this.currentPage} with ${pageAlbums.length} albums`);
    }
    
    /**
     * Create album card element - NO MORE FLICKERING
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
        
        // Create CSS placeholder instead of broken image
        card.innerHTML = `
            <div class="album-badge ${badgeClass}">${badgeText}</div>
            <div class="album-cover-placeholder">
                <div class="cover-icon">🎵</div>
            </div>
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
        
        if (this.prevBtn) this.prevBtn.disabled = this.currentPage === 1;
        if (this.nextBtn) this.nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        
        if (!this.pageNumbers) return;
        
        this.pageNumbers.innerHTML = '';
        
        if (totalPages <= 1) {
            this.paginationSection.style.display = 'none';
            return;
        }
        
        this.paginationSection.style.display = 'flex';
        
        // Create page buttons
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn page-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.type = 'button';
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    /**
     * Update results count display
     */
    updateResultsCount() {
        if (!this.resultsCount) return;
        
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
        if (!this.noResults) return;
        
        const showNoResults = this.filteredAlbums.length === 0;
        this.noResults.style.display = showNoResults ? 'block' : 'none';
        this.albumsGrid.style.display = showNoResults ? 'none' : 'grid';
    }
    
    /**
     * Handle album card click
     */
    handleAlbumClick(albumCard) {
        const title = albumCard.querySelector('.album-title').textContent;
        console.log('🎵 Album clicked:', title);
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
            console.log('✅ Mobile menu initialized');
        }
    }
    
    bindEvents() {
        this.menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
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
    }
    
    toggle() {
        const isOpen = this.navMenu.classList.toggle('show');
        this.menuBtn.setAttribute('aria-expanded', isOpen);
        console.log('📱 Mobile menu toggled:', isOpen ? 'open' : 'closed');
    }
    
    close() {
        this.navMenu.classList.remove('show');
        this.menuBtn.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 DOM loaded, starting initialization...');
    
    try {
        // Initialize main application
        window.musicApp = new MusicDiscographyApp();
        
        // Initialize mobile menu
        window.mobileMenu = new MobileMenu();
        
        console.log('🎵 Ultra Keith Music App fully initialized!');
        
    } catch (error) {
        console.error('❌ Error initializing music app:', error);
        
        // Fallback event listeners
        setTimeout(() => {
            console.log('🔧 Setting up fallback event listeners...');
            
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
                mobileBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    navMenu.classList.toggle('show');
                    console.log('📱 Fallback mobile menu toggled');
                });
            }
            
            console.log('✅ Fallback event listeners ready');
        }, 100);
    }
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('🚨 Global error:', e.error);
});
