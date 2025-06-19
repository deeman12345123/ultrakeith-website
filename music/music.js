'use strict';

class MusicDiscographyApp {
    constructor() {
        this.albumsGrid = document.getElementById('albumsGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sortSelect');
        this.searchInput = document.getElementById('searchInput');
        this.resultsCount = document.getElementById('resultsCount');
        this.noResults = document.getElementById('noResults');
        this.totalAlbumsSpan = document.getElementById('totalAlbums');
        this.paginationSection = document.getElementById('paginationSection');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.pageNumbers = document.getElementById('pageNumbers');
        
        this.currentFilter = 'all';
        this.currentSort = 'year-desc';
        this.currentSearch = '';
        this.currentPage = 1;
        this.albumsPerPage = 12;
        
        this.allAlbums = this.loadAlbumsData();
        this.filteredAlbums = [...this.allAlbums];
        
        this.init();
    }
    
    loadAlbumsData() {
        // Compact album data with essential info only
        const albumData = [
            ["Karpenters", "Kool Keith", 2025, "solo"],
            ["DAW", "Kool Keith", 2025, "solo"],
            ["Dear Derrick", "Kool Keith", 2025, "solo"],
            ["Private Selection", "Kool Keith & MC Homeless", 2024, "collab"],
            ["STRIKE!", "Kool Keith, Audio Assault & Ceschi", 2024, "collab"],
            ["Best of All Possible Worlds", "AJJ, Kool Keith & Kimya Dawson", 2024, "collab"],
            ["We Can Do It", "Kool Keith & Kiew Nikon", 2024, "collab"],
            ["Everybody Eats!", "Stress Eater (CZARFACE & Kool Keith)", 2024, "collab"],
            ["Bandoleros", "Lynx 196.9, Arturo Banbini, Kool Keith", 2024, "collab"],
            ["Aponia", "Awol One & Kool Keith", 2024, "collab"],
            ["Vengeance Unmasked: The Rise of the Last", "Wheeler del Torro, Craig G & Kool Keith", 2024, "collab"],
            ["Divinity 2 Infinity: The Odyssey", "DJ Muggs & Kool Keith", 2023, "collab"],
            ["World Area", "Kool Keith", 2023, "solo"],
            ["Black Elvis 2", "Kool Keith", 2023, "solo"],
            ["Mr. Controller", "Kool Keith", 2023, "solo"],
            ["Serpent", "Kool Keith & Real Bad Man", 2023, "collab"],
            ["Monsters", "MC Homeless, Kool Keith & Rove", 2023, "collab"],
            ["Keith's Salon", "Kool Keith", 2022, "solo"],
            ["Fusion Beats", "Kool Keith", 2022, "solo"],
            ["Computer Technology", "Kool Keith", 2022, "solo"],
            ["Subatomic", "Del the Funky Homosapien & Kool Keith", 2022, "collab"],
            ["Alvin Kelly", "Kool Keith", 2022, "solo"],
            ["Aliens", "MC Homeless & Kool Keith", 2022, "collab"],
            ["Space Goretex", "Kool Keith & L'Orange", 2021, "collab"],
            ["Super Hero", "Kool Keith", 2021, "solo"],
            ["Ride Out", "Kool Keith", 2021, "solo"],
            ["Donovan the Don", "Grant Shapiro & Kool Keith", 2021, "collab"],
            ["Keith", "Kool Keith", 2020, "solo"],
            ["Booty Clap", "Kool Keith", 2020, "solo"],
            ["Feature Magnetic", "Kool Keith", 2020, "solo"],
            ["Czarface Meets Ghostface", "CZARFACE & Ghostface Killah (feat. Kool Keith)", 2019, "collab"],
            ["Saks 5th Ave", "Kool Keith", 2019, "solo"],
            ["Complicated Trip", "Kool Keith & KutMasta Kurt", 2018, "collab"],
            ["The Preacher", "Kool Keith", 2018, "solo"],
            ["Moosebumps: An Exploration Into...", "Dr. Octagon (Kool Keith)", 2018, "solo"],
            ["Controller of Trap", "Kool Keith", 2018, "solo"],
            ["Colossal", "DJ Derezon, Kool Keith & Motion Man", 2017, "collab"],
            ["Project Radiation", "Kool Keith Presents Dane Uno", 2016, "collab"],
            ["Time? Astonishing... Instrumentals!", "L'Orange & Kool Keith", 2015, "collab"],
            ["Time? Astonishing!", "L'Orange & Kool Keith", 2015, "collab"],
            ["A Couple of Slices", "Kool Keith & Ray West", 2015, "collab"],
            ["El Dorado Driven", "Teddy Bass Presents Kool Keith", 2014, "collab"],
            ["Demolition Crash", "Kool Keith", 2014, "solo"],
            ["Magnetic Pimp Force Field", "Kool Keith & Big Sche Eastwood", 2013, "collab"],
            ["Love and Danger", "Kool Keith", 2012, "solo"],
            ["The Legend of Tashan Dorrsett", "Kool Keith", 2011, "solo"],
            ["The Doctor is In", "Kool Keith", 2011, "solo"],
            ["Dr. Octagon Pt. 2 / Bosses in the Booth", "Kool Keith & Dr. Octagon", 2011, "solo"],
            ["Tashan Dorrsett (Instrumental Edition)", "Kool Keith", 2009, "solo"],
            ["Lost Masters Volume 3", "Kool Keith", 2009, "solo"],
            ["Lost Masters Collection", "Kool Keith", 2009, "solo"],
            ["Idea of a Master Piece", "Kool Keith & 54-71", 2009, "collab"],
            ["Iconic", "Tim Dog & Kool Keith present Project X", 2009, "collab"],
            ["Bikinis N Thongs", "Kool Keith & Denis Deft", 2009, "collab"],
            ["Thee Undertakerz", "Kool Keith", 2008, "solo"],
            ["Tashan Dorrsett", "Tashan Dorrsett (Kool Keith)", 2008, "solo"],
            ["Dr. Dooom 2", "Dr. Dooom (Kool Keith)", 2008, "solo"],
            ["Sex Style: The Un-Released Archives", "Kool Keith", 2007, "solo"],
            ["The Commi$$ioner 2", "Kool Keith", 2007, "solo"],
            ["The Return of Dr. Octagon", "Dr. Octagon (Kool Keith)", 2006, "solo"],
            ["Project Polaroid", "Kool Keith & TomC3", 2006, "collab"],
            ["Nogatco Rd.", "Mr. Nogatco (Kool Keith)", 2006, "solo"],
            ["Down On Land", "Randolf Liftoff featuring Kool Keith", 2006, "collab"],
            ["The Commi$$ioner", "Kool Keith", 2006, "solo"],
            ["Collabs Tape", "Kool Keith", 2006, "solo"],
            ["Varoom", "Kool Keith", 2005, "solo"],
            ["The Lost Masters, Volume 2", "Kool Keith", 2005, "solo"],
            ["White Label Mix Series, Volume 1", "Kool Keith & Nancy Des Rose", 2004, "collab"],
            ["Thee Undatakerz", "Thee Undertakerz (Kool Keith)", 2004, "solo"],
            ["The Personal Album", "Kool Keith", 2004, "solo"],
            ["Official Space Tape", "Kool Keith", 2004, "solo"],
            ["Lovely Lady", "Kool Keith", 2004, "solo"],
            ["Dr. Octagon Part 2", "Dr. Octagon (Kool Keith)", 2004, "solo"],
            ["Diesel Truckers", "Kool Keith & KutMasta Kurt", 2004, "collab"],
            ["Clayborne Family", "KHM (Kool Keith, Jacky Jasper, H-Bomb)", 2004, "collab"],
            ["The Lost Masters", "Kool Keith", 2003, "solo"],
            ["Game", "KHM (Kool Keith, H-Bomb, Marc Live)", 2002, "collab"],
            ["Spankmaster", "Kool Keith", 2001, "solo"],
            ["Pimp to Eat", "Analog Brothers", 2000, "collab"],
            ["Matthew", "Kool Keith", 2000, "solo"],
            ["Masters of Illusion", "Masters of Illusion", 2000, "collab"],
            ["First Come, First Served", "Dr. Dooom (Kool Keith)", 1999, "solo"],
            ["Black Elvis / Lost in Space", "Kool Keith (as Black Elvis)", 1999, "solo"],
            ["The Cenobites LP", "Cenobites (Kool Keith & Godfather Don)", 1997, "collab"],
            ["Sex Style", "Kool Keith", 1996, "solo"],
            ["Dr. Octagonecologyst", "Dr. Octagon (Kool Keith)", 1996, "solo"],
            ["Big Time", "Ultra (Kool Keith & Tim Dog)", 1996, "collab"],
            ["Big Willie Smith EP", "Da Beat Terrorists & Big Willie Smith", 1995, "collab"],
            ["I'm F**kin' Flippin'", "Ultramagnetic MC's featuring Kool Keith", 1994, "collab"],
            ["The Four Horsemen", "Ultramagnetic MCs", 1993, "collab"],
            ["Funk Your Head Up", "Ultramagnetic MCs", 1992, "collab"],
            ["Critical Beatdown", "Ultramagnetic MCs", 1988, "collab"]
        ];
        
        return albumData.map((data, index) => ({
            title: data[0],
            artist: data[1],
            year: data[2],
            category: data[3],
            search: `${data[0]} ${data[1]} ${data[2]}`.toLowerCase(),
            coverSrc: `album-covers/${data[0].toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}.jpg`,
            slug: data[0].toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
        }));
    }
    
    init() {
        console.log('🎵 Initializing music app...');
        this.bindEvents();
        this.updateStats();
        this.applyFiltersAndSort();
        this.updatePagination();
        console.log('✅ Music app ready with', this.allAlbums.length, 'albums');
    }
    
    bindEvents() {
        console.log('🔗 Binding events...');
        
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilter(btn.dataset.filter);
            });
        });
        
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.handleSort(e.target.value);
            });
        }
        
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
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
        
        this.albumsGrid.addEventListener('click', (e) => {
            const albumCard = e.target.closest('.album-card');
            if (albumCard) {
                console.log('🎵 Album clicked:', albumCard.querySelector('.album-title').textContent);
            }
        });
        
        console.log('✅ All events bound successfully');
    }
    
    handleFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.applyFiltersAndSort();
        this.updatePagination();
    }
    
    handleSort(sortType) {
        this.currentSort = sortType;
        this.currentPage = 1;
        this.applyFiltersAndSort();
        this.updatePagination();
    }
    
    handleSearch(query) {
        this.currentSearch = query.toLowerCase().trim();
        this.currentPage = 1;
        this.applyFiltersAndSort();
        this.updatePagination();
    }
    
    applyFiltersAndSort() {
        let filtered = [...this.allAlbums];
        
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(album => album.category === this.currentFilter);
        }
        
        if (this.currentSearch) {
            filtered = filtered.filter(album => {
                const searchableText = `${album.title} ${album.artist} ${album.search}`.toLowerCase();
                return searchableText.includes(this.currentSearch);
            });
        }
        
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
    
    renderCurrentPage() {
        const startIndex = (this.currentPage - 1) * this.albumsPerPage;
        const endIndex = startIndex + this.albumsPerPage;
        const pageAlbums = this.filteredAlbums.slice(startIndex, endIndex);
        
        this.albumsGrid.innerHTML = '';
        
        pageAlbums.forEach(album => {
            const card = this.createAlbumCard(album);
            this.albumsGrid.appendChild(card);
        });
        
        console.log(`📄 Rendered page ${this.currentPage} with ${pageAlbums.length} albums`);
    }
    
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
            <img src="${album.coverSrc}" alt="${album.title}" class="album-cover" loading="lazy" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="album-cover-placeholder" style="display: none;">
                <div class="cover-icon">🎵</div>
            </div>
            <h3 class="album-title">${album.title}</h3>
            <p class="album-artist">${album.artist}</p>
            <p class="album-year">${album.year}</p>
        `;
        
        return card;
    }
    
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
    
    goToPage(pageNumber) {
        const totalPages = Math.ceil(this.filteredAlbums.length / this.albumsPerPage);
        if (pageNumber < 1 || pageNumber > totalPages) return;
        
        this.currentPage = pageNumber;
        this.renderCurrentPage();
        this.updatePagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
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
    
    updateStats() {
        if (this.totalAlbumsSpan) {
            this.totalAlbumsSpan.textContent = this.allAlbums.length;
        }
    }
    
    toggleNoResults() {
        if (!this.noResults) return;
        
        const showNoResults = this.filteredAlbums.length === 0;
        this.noResults.style.display = showNoResults ? 'block' : 'none';
        this.albumsGrid.style.display = showNoResults ? 'none' : 'grid';
    }
}

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
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
        
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

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 DOM loaded, starting initialization...');
    
    try {
        window.musicApp = new MusicDiscographyApp();
        window.mobileMenu = new MobileMenu();
        console.log('🎵 Ultra Keith Music App fully initialized!');
    } catch (error) {
        console.error('❌ Error initializing music app:', error);
    }
});

window.addEventListener('error', (e) => {
    console.error('🚨 Global error:', e.error);
});
