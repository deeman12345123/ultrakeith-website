'use strict';

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Starting music app...');
    
    // Album data: 80 releases, checked against Wikipedia, Discogs, MusicBrainz and Bandcamp (Oct 2026).
    // Singles and guest features are left out. 'type' marks EPs, compilations, mixtapes and group albums.
    const albums = [
        {title: "Middi Magazine", artist: "Emperor Middi & Kool Keith", year: 2026, category: "collab"},
        {title: "Sonic Psychosis", artist: "Kool Keith & Mike Redman", year: 2026, category: "collab"},
        {title: "Karpenters", artist: "Kool Keith", year: 2025, category: "solo"},
        {title: "The Yoohoo Bros.", artist: "Dane Uno & Kool Keith", year: 2025, category: "collab"},
        {title: "Aponia", artist: "Awol One & Kool Keith", year: 2024, category: "collab"},
        {title: "Bandoleros", artist: "Lynx 196.9, Arturo Banbini & Kool Keith", year: 2024, category: "collab"},
        {title: "Everybody Eats!", artist: "Stress Eater (CZARFACE & Kool Keith)", year: 2024, category: "collab"},
        {title: "Mushrooms and Acid", artist: "Kool Keith & MC Homeless", year: 2024, category: "collab", type: "EP"},
        {title: "Black Elvis 2", artist: "Kool Keith", year: 2023, category: "solo", cover: "blackelvis2"},
        {title: "Monsters", artist: "MC Homeless, Kool Keith & Rove", year: 2023, category: "collab", type: "EP"},
        {title: "Mr. Controller", artist: "Kool Keith", year: 2023, category: "solo"},
        {title: "Serpent", artist: "Kool Keith & Real Bad Man", year: 2023, category: "collab"},
        {title: "World Area", artist: "Kool Keith", year: 2023, category: "solo"},
        {title: "Subatomic", artist: "FNKPMPN (Del the Funky Homosapien & Kool Keith)", year: 2022, category: "collab"},
        {title: "Donovan the Don", artist: "Grant Shapiro featuring Kool Keith", year: 2021, category: "collab", type: "EP", cover: "donovan-don"},
        {title: "Keith's Salon", artist: "Kool Keith", year: 2021, category: "solo", cover: "keiths-salon"},
        {title: "Still Doing It", artist: "Kool Keith x Karpenters", year: 2021, category: "collab", type: "EP"},
        {title: "Total Orgasm 6", artist: "Kool Keith", year: 2021, category: "solo", type: "Mixtape"},
        {title: "Space Goretex", artist: "Kool Keith x Thetan", year: 2020, category: "collab"},
        {title: "Computer Technology", artist: "Kool Keith", year: 2019, category: "solo"},
        {title: "Keith", artist: "Kool Keith", year: 2019, category: "solo"},
        {title: "Saks 5th Ave", artist: "Kool Keith", year: 2019, category: "solo", cover: "saks-5th"},
        {title: "Controller of Trap", artist: "Kool Keith", year: 2018, category: "solo", cover: "controller-trap"},
        {title: "Moosebumps: An Exploration Into Modern Day Horripilation", artist: "Dr. Octagon", year: 2018, category: "solo", cover: "moosebumps"},
        {title: "Total Orgasm 5", artist: "Kool Keith", year: 2018, category: "solo", type: "Mixtape"},
        {title: "Feature Magnetic", artist: "Kool Keith", year: 2016, category: "solo"},
        {title: "The Preacher", artist: "Kool Keith Presents Tashan Dorrsett", year: 2016, category: "solo", type: "Compilation", cover: "preacher"},
        {title: "Total Orgasm 4", artist: "Kool Keith", year: 2016, category: "solo", type: "Mixtape"},
        {title: "A Couple of Slices", artist: "Ray West & Kool Keith", year: 2015, category: "collab", cover: "couple-slices"},
        {title: "Time? Astonishing!", artist: "L'Orange & Kool Keith", year: 2015, category: "collab", cover: "time-astonishing"},
        {title: "Demolition Crash", artist: "Kool Keith", year: 2014, category: "solo"},
        {title: "El Dorado Driven", artist: "Teddy Bass Presents Kool Keith", year: 2014, category: "solo", cover: "el-dorado"},
        {title: "Magnetic Pimp Force Field", artist: "Kool Keith & Big Sche Eastwood", year: 2013, category: "collab", cover: "magnetic-pimp"},
        {title: "Total Orgasm", artist: "Kool Keith", year: 2013, category: "solo", type: "Mixtape"},
        {title: "Total Orgasm 2", artist: "Kool Keith", year: 2013, category: "solo", type: "Mixtape"},
        {title: "Total Orgasm 3", artist: "Kool Keith", year: 2013, category: "solo", type: "Mixtape"},
        {title: "Love and Danger", artist: "Kool Keith", year: 2012, category: "solo", cover: "love-danger"},
        {title: "The Doctor Is In", artist: "Paul Sea & Kool Keith", year: 2011, category: "collab", type: "EP"},
        {title: "The Legend of Tashan Dorrsett", artist: "Kool Keith Presents Tashan Dorrsett", year: 2011, category: "solo", type: "Compilation"},
        {title: "Bikinis N Thongs", artist: "Kool Keith, Denis Deft & Yeti Beats", year: 2009, category: "collab"},
        {title: "Iconic", artist: "Project X (Kool Keith, Marc Live & Tim Dog)", year: 2009, category: "collab"},
        {title: "Idea of a Master Piece", artist: "Kool Keith & 54-71", year: 2009, category: "collab"},
        {title: "Lost Masters Collection", artist: "Kool Keith", year: 2009, category: "solo", type: "Compilation"},
        {title: "Stoned", artist: "7th Veil (Kool Keith & H-Bomb)", year: 2009, category: "collab"},
        {title: "Tashan Dorrsett", artist: "Kool Keith Presents Tashan Dorrsett", year: 2009, category: "solo"},
        {title: "The Lost Masters, Vol. 3", artist: "Kool Keith", year: 2009, category: "solo", type: "Compilation"},
        {title: "Dr. Dooom 2", artist: "Dr. Dooom", year: 2008, category: "solo"},
        {title: "Sex Style: The Un-Released Archives", artist: "KutMasta Kurt Presents Kool Keith", year: 2007, category: "solo", type: "Compilation"},
        {title: "The Best Kept Secret", artist: "Ultramagnetic MCs", year: 2007, category: "collab", type: "Group"},
        {title: "Collabs Tape", artist: "Kool Keith", year: 2006, category: "solo", type: "Compilation"},
        {title: "Down On Land", artist: "Randolf Liftoff featuring Kool Keith", year: 2006, category: "collab"},
        {title: "Nogatco Rd.", artist: "Mr. Nogatco (Kool Keith)", year: 2006, category: "solo"},
        {title: "The Commi$$ioner", artist: "Kool Keith", year: 2006, category: "solo"},
        {title: "The Commi$$ioner 2", artist: "Kool Keith", year: 2006, category: "solo"},
        {title: "The Original SoundTrack Album of Project Polaroid", artist: "Kool Keith & TomC3 (Project Polaroid)", year: 2006, category: "collab"},
        {title: "The Return of Dr. Octagon", artist: "Dr. Octagon", year: 2006, category: "solo"},
        {title: "The Lost Masters, Vol. 2", artist: "Kool Keith", year: 2005, category: "solo", type: "Compilation"},
        {title: "Clayborne Family", artist: "Clayborne Family (Kool Keith, Jacky Jasper & Marc Live)", year: 2004, category: "collab", type: "Group"},
        {title: "Diesel Truckers", artist: "The Diesel Truckers (Kool Keith & KutMasta Kurt)", year: 2004, category: "collab"},
        {title: "Dr. Octagon Part II", artist: "Dr. Octagon", year: 2004, category: "solo"},
        {title: "Kool Keith Official Space Tape", artist: "Kool Keith", year: 2004, category: "solo", type: "Compilation"},
        {title: "Kool Keith Presents Thee Undatakerz", artist: "Thee Undatakerz (Kool Keith as Reverend Tom)", year: 2004, category: "collab"},
        {title: "The Personal Album", artist: "Kool Keith", year: 2004, category: "solo"},
        {title: "White Label Mix Series, Vol. 1", artist: "Kool Keith & Nancy Des Rose", year: 2004, category: "collab", type: "Compilation"},
        {title: "The Lost Masters", artist: "Kool Keith", year: 2003, category: "solo", type: "Compilation"},
        {title: "Game", artist: "KHM (Kool Keith, H-Bomb & Marc Live)", year: 2002, category: "collab", type: "Group"},
        {title: "Spankmaster", artist: "Kool Keith", year: 2001, category: "solo"},
        {title: "Masters of Illusion", artist: "Masters of Illusion (Kool Keith, Motion Man & KutMasta Kurt)", year: 2000, category: "collab", type: "Group"},
        {title: "Matthew", artist: "Kool Keith", year: 2000, category: "solo"},
        {title: "Pimp to Eat", artist: "Analog Brothers (Kool Keith as Keith Korg)", year: 2000, category: "collab", type: "Group", cover: "pimp-to-eat-reissue"},
        {title: "Black Elvis/Lost in Space", artist: "Kool Keith", year: 1999, category: "solo"},
        {title: "First Come, First Served", artist: "Dr. Dooom", year: 1999, category: "solo"},
        {title: "Sex Style", artist: "Kool Keith", year: 1997, category: "solo"},
        {title: "The Cenobites LP", artist: "The Cenobites (Kool Keith & Godfather Don)", year: 1997, category: "collab", type: "Group"},
        {title: "Big Time", artist: "Ultra (Kool Keith & Tim Dog)", year: 1996, category: "collab", type: "Group"},
        {title: "Dr. Octagonecologyst", artist: "Dr. Octagon", year: 1996, category: "solo"},
        {title: "Big Willie Smith EP", artist: "Da Beat Terrorists & Big Willie Smith (Kool Keith)", year: 1995, category: "collab", type: "EP"},
        {title: "The Four Horsemen", artist: "Ultramagnetic MCs", year: 1993, category: "collab", type: "Group"},
        {title: "Funk Your Head Up", artist: "Ultramagnetic MCs", year: 1992, category: "collab", type: "Group"},
        {title: "Critical Beatdown", artist: "Ultramagnetic MCs", year: 1988, category: "collab", type: "Group"},
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
        const slug = album.cover || getSlug(album.title);
        const badgeClass = album.category === 'solo' ? 'badge-solo' : 'badge-collab';
        const badgeText = (album.category === 'solo' ? 'Solo' : 'Collab') + (album.type ? ' · ' + album.type : '');
        
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
