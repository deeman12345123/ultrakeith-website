'use strict';

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Starting music app...');
    
    // Album data - All 92 albums
    const albums = [
        {title: "Karpenters", artist: "Kool Keith", year: 2025, category: "solo"},
        {title: "DAW", artist: "Kool Keith", year: 2025, category: "solo"},
        {title: "Dear Derrick", artist: "Kool Keith", year: 2025, category: "solo"},
        {title: "Private Selection", artist: "Kool Keith & MC Homeless", year: 2024, category: "collab"},
        {title: "STRIKE!", artist: "Kool Keith, Audio Assault & Ceschi", year: 2024, category: "collab"},
        {title: "Best of All Possible Worlds", artist: "AJJ, Kool Keith & Kimya Dawson", year: 2024, category: "collab"},
        {title: "We Can Do It", artist: "Kool Keith & Kiew Nikon", year: 2024, category: "collab"},
        {title: "Everybody Eats!", artist: "Stress Eater (CZARFACE & Kool Keith)", year: 2024, category: "collab"},
        {title: "Bandoleros", artist: "Lynx 196.9, Arturo Banbini, Kool Keith", year: 2024, category: "collab"},
        {title: "Aponia", artist: "Awol One & Kool Keith", year: 2024, category: "collab"},
        {title: "Vengeance Unmasked", artist: "Wheeler del Torro, Craig G & Kool Keith", year: 2024, category: "collab"},
        {title: "Divinity 2 Infinity", artist: "DJ Muggs & Kool Keith", year: 2023, category: "collab"},
        {title: "World Area", artist: "Kool Keith", year: 2023, category: "solo"},
        {title: "Black Elvis 2", artist: "Kool Keith", year: 2023, category: "solo"},
        {title: "Mr. Controller", artist: "Kool Keith", year: 2023, category: "solo"},
        {title: "Serpent", artist: "Kool Keith & Real Bad Man", year: 2023, category: "collab"},
        {title: "Monsters", artist: "MC Homeless, Kool Keith & Rove", year: 2023, category: "collab"},
        {title: "Keith's Salon", artist: "Kool Keith", year: 2022, category: "solo"},
        {title: "Fusion Beats", artist: "Kool Keith", year: 2022, category: "solo"},
        {title: "Computer Technology", artist: "Kool Keith", year: 2022, category: "solo"},
        {title: "Subatomic", artist: "Del the Funky Homosapien & Kool Keith", year: 2022, category: "collab"},
        {title: "Alvin Kelly", artist: "Kool Keith", year: 2022, category: "solo"},
        {title: "Aliens", artist: "MC Homeless & Kool Keith", year: 2022, category: "collab"},
        {title: "Space Goretex", artist: "Kool Keith & L'Orange", year: 2021, category: "collab"},
        {title: "Super Hero", artist: "Kool Keith", year: 2021, category: "solo"},
        {title: "Ride Out", artist: "Kool Keith", year: 2021, category: "solo"},
        {title: "Donovan the Don", artist: "Grant Shapiro & Kool Keith", year: 2021, category: "collab"},
        {title: "Keith", artist: "Kool Keith", year: 2020, category: "solo"},
        {title: "Booty Clap", artist: "Kool Keith", year: 2020, category: "solo"},
        {title: "Feature Magnetic", artist: "Kool Keith", year: 2020, category: "solo"},
        {title: "Czarface Meets Ghostface", artist: "CZARFACE & Ghostface Killah", year: 2019, category: "collab"},
        {title: "Saks 5th Ave", artist: "Kool Keith", year: 2019, category: "solo"},
        {title: "Computer Technology", artist: "Kool Keith", year: 2019, category: "solo"},
        {title: "Complicated Trip", artist: "Kool Keith & KutMasta Kurt", year: 2018, category: "collab"},
        {title: "The Preacher", artist: "Kool Keith", year: 2018, category: "solo"},
        {title: "Moosebumps", artist: "Dr. Octagon", year: 2018, category: "solo"},
        {title: "Controller of Trap", artist: "Kool Keith", year: 2018, category: "solo"},
        {title: "Colossal", artist: "DJ Derezon, Kool Keith & Motion Man", year: 2017, category: "collab"},
        {title: "Project Radiation", artist: "Kool Keith Presents Dane Uno", year: 2016, category: "collab"},
        {title: "Feature Magnetic", artist: "Kool Keith", year: 2016, category: "solo"},
        {title: "The Preacher", artist: "Kool Keith", year: 2016, category: "solo"},
        {title: "Time Astonishing Instrumentals", artist: "L'Orange & Kool Keith", year: 2015, category: "collab"},
        {title: "Time Astonishing", artist: "L'Orange & Kool Keith", year: 2015, category: "collab"},
        {title: "A Couple of Slices", artist: "Kool Keith & Ray West", year: 2015, category: "collab"},
        {title: "El Dorado Driven", artist: "Teddy Bass Presents Kool Keith", year: 2014, category: "collab"},
        {title: "Demolition Crash", artist: "Kool Keith", year: 2014, category: "solo"},
        {title: "Magnetic Pimp Force Field", artist: "Kool Keith & Big Sche Eastwood", year: 2013, category: "collab"},
        {title: "Love and Danger", artist: "Kool Keith", year: 2012, category: "solo"},
        {title: "The Legend of Tashan Dorrsett", artist: "Kool Keith", year: 2011, category: "solo"},
        {title: "The Doctor is In", artist: "Kool Keith", year: 2011, category: "solo"},
        {title: "Dr. Octagon Pt. 2", artist: "Kool Keith & Dr. Octagon", year: 2011, category: "solo"},
        {title: "Tashan Dorrsett Instrumental", artist: "Kool Keith", year: 2009, category: "solo"},
        {title: "Lost Masters Volume 3", artist: "Kool Keith", year: 2009, category: "solo"},
        {title: "Lost Masters Collection", artist: "Kool Keith", year: 2009, category: "solo"},
        {title: "Idea of a Master Piece", artist: "Kool Keith & 54-71", year: 2009, category: "collab"},
        {title: "Iconic", artist: "Tim Dog & Kool Keith", year: 2009, category: "collab"},
        {title: "Bikinis N Thongs", artist: "Kool Keith & Denis Deft", year: 2009, category: "collab"},
        {title: "Thee Undertakerz", artist: "Kool Keith", year: 2008, category: "solo"},
        {title: "Tashan Dorrsett", artist: "Tashan Dorrsett", year: 2008, category: "solo"},
        {title: "Dr. Dooom 2", artist: "Dr. Dooom", year: 2008, category: "solo"},
        {title: "Booty Clap", artist: "Kool Keith", year: 2008, category: "solo"},
        {title: "Sex Style Unreleased Archives", artist: "Kool Keith", year: 2007, category: "solo"},
        {title: "The Commissioner 2", artist: "Kool Keith", year: 2007, category: "solo"},
        {title: "The Return of Dr. Octagon", artist: "Dr. Octagon", year: 2006, category: "solo"},
        {title: "Project Polaroid", artist: "Kool Keith & TomC3", year: 2006, category: "collab"},
        {title: "Nogatco Rd", artist: "Mr. Nogatco", year: 2006, category: "solo"},
        {title: "Down On Land", artist: "Randolf Liftoff featuring Kool Keith", year: 2006, category: "collab"},
        {title: "The Commissioner", artist: "Kool Keith", year: 2006, category: "solo"},
        {title: "Collabs Tape", artist: "Kool Keith", year: 2006, category: "solo"},
        {title: "Varoom", artist: "Kool Keith", year: 2005, category: "solo"},
        {title: "The Lost Masters Volume 2", artist: "Kool Keith", year: 2005, category: "solo"},
        {title: "White Label Mix Series Volume 1", artist: "Kool Keith & Nancy Des Rose", year: 2004, category: "collab"},
        {title: "Thee Undatakerz", artist: "Thee Undertakerz", year: 2004, category: "solo"},
        {title: "The Personal Album", artist: "Kool Keith", year: 2004, category: "solo"},
        {title: "Official Space Tape", artist: "Kool Keith", year: 2004, category: "solo"},
        {title: "Lovely Lady", artist: "Kool Keith", year: 2004, category: "solo"},
        {title: "Dr. Octagon Part 2", artist: "Dr. Octagon", year: 2004, category: "solo"},
        {title: "Diesel Truckers", artist: "Kool Keith & KutMasta Kurt", year: 2004, category: "collab"},
        {title: "Clayborne Family", artist: "KHM", year: 2004, category: "collab"},
        {title: "The Lost Masters", artist: "Kool Keith", year: 2003, category: "solo"},
        {title: "Game", artist: "KHM", year: 2002, category: "collab"},
        {title: "Spankmaster", artist: "Kool Keith", year: 2001, category: "solo"},
        {title: "Pimp to Eat", artist: "Analog Brothers", year: 2000, category: "collab"},
        {title: "Matthew", artist: "Kool Keith", year: 2000, category: "solo"},
        {title: "Masters of Illusion", artist: "Masters of Illusion", year: 2000, category: "collab"},
        {title: "First Come First Served", artist: "Dr. Dooom", year: 1999, category: "solo"},
        {title: "Black Elvis Lost in Space", artist: "Kool Keith", year: 1999, category: "solo"},
        {title: "The Cenobites LP", artist: "Cenobites", year: 1997, category: "collab"},
        {title: "Sex Style", artist: "Kool Keith", year: 1996, category: "solo"},
        {title: "Dr. Octagonecologyst", artist: "Dr. Octagon", year: 1996, category: "solo"},
        {title: "Big Time", artist: "Ultra", year: 1996, category: "collab"},
        {title: "Big Willie Smith EP", artist: "Da Beat Terrorists", year: 1995, category: "collab"},
        {title: "I'm Fucking Flippin", artist: "Ultramagnetic MCs", year: 1994, category: "collab"},
        {title: "The Four Horsemen", artist: "Ultramagnetic MCs", year: 1993, category: "collab"},
        {title: "Funk Your Head Up", artist: "Ultramagnetic MCs", year: 1992, category: "collab"},
        {title: "Critical Beatdown", artist: "Ultramagnetic MCs", year: 1988, category: "collab"}
    ];
    
    let currentFilter = 'all';
    let currentSort = 'year-desc';
    let currentSearch = '';
    let currentPage = 1;
    const albumsPerPage = 12;
    let filteredAlbums = albums;
    
    // Update stats
    const totalAlbumsSpan = document.getElementById('totalAlbums');
    if (totalAlbumsSpan) {
        totalAlbumsSpan.textContent = albums.length;
    }
    
    function getSlug(title) {
        return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    
    function createAlbumCard(album) {
        const slug = getSlug(album.title);
        const badgeClass = album.category === 'solo' ? 'badge-solo' : 'badge-collab';
        const badgeText = album.category === 'solo' ? 'Solo' : 'Collab';
        
        return `
            <div class="album-card" data-category="${album.category}" data-year="${album.year}" data-title="${album.title.toLowerCase()}">
                <div class="album-badge ${badgeClass}">${badgeText}</div>
                <img src="album-covers/${slug}.jpg" alt="${album.title}" class="album-cover" loading="lazy" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="album-cover-placeholder" style="display: none;">
                    <div class="cover-icon">🎵</div>
                </div>
                <h3 class="album-title">${album.title}</h3>
                <p class="album-artist">${album.artist}</p>
                <p class="album-year">${album.year}</p>
            </div>
        `;
    }
    
    function filterAndSort() {
        let filtered = albums;
        
        // Apply filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(album => album.category === currentFilter);
        }
        
        // Apply search
        if (currentSearch) {
            filtered = filtered.filter(album => {
                const searchText = (album.title + ' ' + album.artist + ' ' + album.year).toLowerCase();
                return searchText.includes(currentSearch);
            });
        }
        
        // Apply sort
        filtered.sort((a, b) => {
            switch (currentSort) {
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
        
        filteredAlbums = filtered;
        renderPage();
        updatePagination();
        updateResultsCount();
    }
    
    function renderPage() {
        const albumsGrid = document.getElementById('albumsGrid');
        if (!albumsGrid) return;
        
        const startIndex = (currentPage - 1) * albumsPerPage;
        const endIndex = startIndex + albumsPerPage;
        const pageAlbums = filteredAlbums.slice(startIndex, endIndex);
        
        albumsGrid.innerHTML = pageAlbums.map(album => createAlbumCard(album)).join('');
        
        console.log('📄 Rendered page', currentPage, 'with', pageAlbums.length, 'albums');
    }
    
    function updatePagination() {
        const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);
        const pageNumbers = document.getElementById('pageNumbers');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const paginationSection = document.getElementById('paginationSection');
        
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        if (!pageNumbers) return;
        
        pageNumbers.innerHTML = '';
        
        if (totalPages <= 1) {
            if (paginationSection) paginationSection.style.display = 'none';
            return;
        }
        
        if (paginationSection) paginationSection.style.display = 'flex';
        
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-btn page-btn' + (i === currentPage ? ' active' : '');
            pageBtn.textContent = i;
            pageBtn.type = 'button';
            pageBtn.onclick = () => goToPage(i);
            pageNumbers.appendChild(pageBtn);
        }
    }
    
    function goToPage(pageNumber) {
        const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);
        if (pageNumber < 1 || pageNumber > totalPages) return;
        
        currentPage = pageNumber;
        renderPage();
        updatePagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (!resultsCount) return;
        
        const startIndex = (currentPage - 1) * albumsPerPage + 1;
        const endIndex = Math.min(startIndex + albumsPerPage - 1, filteredAlbums.length);
        const total = filteredAlbums.length;
        
        if (total === 0) {
            resultsCount.textContent = 'No albums found';
        } else if (total <= albumsPerPage) {
            resultsCount.textContent = `Showing ${total} of ${albums.length} albums`;
        } else {
            resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${total} albums`;
        }
    }
    
    // Event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentFilter = btn.dataset.filter;
            currentPage = 1;
            
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filterAndSort();
        });
    });
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            filterAndSort();
        });
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            currentPage = 1;
            filterAndSort();
        });
    }
    
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    }
    
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    }
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('show');
        });
    }
    
    // Initialize
    filterAndSort();
    
    console.log('✅ Music app initialized with', albums.length, 'albums');
});
