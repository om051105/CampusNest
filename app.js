


window.PROPERTIES = [
    { id: 1, title: 'Luxury 1BHK - Lawgate North', price: 8500, type: '1BHK / 2BHK', gender: 'Mixed', match: 98, rating: 4.8, reviews: 43, locality: 'Lawgate - North', lat: 31.2570, lng: 75.7060, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', verified: true, amenities: ['WiFi', 'AC', 'Power Backup', 'Furnished'] },
    { id: 2, title: 'Cozy PG for Girls - Greenvalley', price: 6500, type: 'PG', gender: 'Girls', match: 92, rating: 4.6, reviews: 28, locality: 'Greenvalley', lat: 31.2520, lng: 75.7010, img: 'https://images.unsplash.com/photo-1502672260266-1c1e52409802?auto=format&fit=crop&w=600&q=80', verified: true, amenities: ['WiFi', 'Food', 'CCTV', 'Laundry'] },
    { id: 3, title: 'Spacious Shared Room - Lawgate Backgate', price: 5500, type: 'Apartment', gender: 'Boys', match: 85, rating: 4.3, reviews: 15, locality: 'Lawgate - Backgate', lat: 31.2580, lng: 75.7040, img: 'https://images.unsplash.com/photo-1502005097973-ef569427e1ea?auto=format&fit=crop&w=600&q=80', verified: false, amenities: ['WiFi', 'Parking'] },
    { id: 4, title: 'Premium Apartment - Lawgate South', price: 12000, type: 'Apartment', gender: 'Mixed', match: 88, rating: 4.7, reviews: 61, locality: 'Lawgate - South', lat: 31.2540, lng: 75.7060, img: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=600&q=80', verified: true, amenities: ['WiFi', 'Gym', 'AC', 'Furnished'] },
    { id: 5, title: 'Budget PG Boys - Lawgate West', price: 4500, type: 'PG', gender: 'Boys', match: 80, rating: 4.0, reviews: 9, locality: 'Lawgate - West', lat: 31.2550, lng: 75.7020, img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80', verified: false, amenities: ['WiFi', 'Food'] }
];

let wishlist = new Set();


function renderProperties(props, container) {
    if (!container) return;
    if (!props || props.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:4rem;color:var(--text-muted)"><i class="fa-solid fa-search" style="font-size:3rem;margin-bottom:1rem;display:block;opacity:0.3"></i>No properties match your filters</div>';
        return;
    }
    container.innerHTML = props.map(p => `
        <div class="property-card fade-in-up" onclick="window.location.href='property.html'">
            <div class="property-card-img">
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <button class="wishlist-btn ${wishlist.has(p.id) ? 'active' : ''}" onclick="event.stopPropagation();toggleWish(${p.id},this)">
                    <i class="fa-${wishlist.has(p.id) ? 'solid' : 'regular'} fa-heart ${wishlist.has(p.id) ? '' : ''}"></i>
                </button>
                ${p.verified ? `<div style="position:absolute;bottom:10px;left:10px"><span class="badge badge-secondary" style="font-size:0.7rem"><i class="fa-solid fa-circle-check"></i> Verified</span></div>` : ''}
            </div>
            <div class="property-card-body">
                <h3 style="font-size:0.975rem;margin-bottom:0.4rem;line-height:1.4">${p.title}</h3>
                <p class="text-muted text-sm mb-3"><i class="fa-solid fa-location-dot"></i> Near LPU Campus</p>
                <div class="flex gap-2 flex-wrap mb-3">
                    <span class="badge badge-primary" style="font-size:0.7rem">${p.type}</span>
                    <span class="badge badge-muted" style="font-size:0.7rem">${p.gender}</span>
                </div>
                <div class="flex justify-between items-center" style="border-top:1px solid var(--border-color);padding-top:0.85rem;margin-top:auto">
                    <div>
                        <div class="property-price">₹${p.price.toLocaleString()}<span style="font-size:0.75rem;color:var(--text-muted);font-weight:400">/mo</span></div>
                        <div class="stars" style="font-size:0.7rem">★★★★${p.rating >= 5 ? '★' : '☆'} <span class="text-muted" style="font-size:0.7rem">(${p.reviews})</span></div>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();window.location.href='property.html'">View</button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleWish(id, btn) {
    if (wishlist.has(id)) { wishlist.delete(id); btn.classList.remove('active'); btn.innerHTML = '<i class="fa-regular fa-heart"></i>'; showToast('info', 'Removed from saved'); }
    else { wishlist.add(id); btn.classList.add('active'); btn.innerHTML = '<i class="fa-solid fa-heart" style="color:var(--danger)"></i>'; showToast('success', 'Saved to Wishlist!'); }
}


function filterAndRender() {
    const search = (document.getElementById('searchInput')?.value || '');
    const budgetSel = document.getElementById('budgetSel')?.value || '';
    const typeSel = document.getElementById('typeSel')?.value || '';
    const sortSel = document.getElementById('sortSel')?.value || 'match';
    const output = document.getElementById('propertyOutput');
    if (!output) return;

    let results = [...window.PROPERTIES];
    if (search) results = results.filter(p => p.locality === search || p.title.toLowerCase().includes(search.toLowerCase()));
    if (typeSel) results = results.filter(p => p.type === typeSel || (typeSel === 'Shared' && p.type === 'Apartment'));

    if (budgetSel) {
        const [min, max] = budgetSel.split('-').map(Number);
        if (max) {
            results = results.filter(p => p.price >= min && p.price <= max);
        } else {
            results = results.filter(p => p.price >= min);
        }
    }

    if (sortSel === 'price_asc') results.sort((a, b) => a.price - b.price);
    else if (sortSel === 'price_desc') results.sort((a, b) => b.price - a.price);
    else if (sortSel === 'rating') results.sort((a, b) => b.rating - a.rating);
    else results.sort((a, b) => b.match - a.match);

    const cnt = document.getElementById('resultCount');
    if (cnt) cnt.textContent = results.length;
    renderProperties(results, output);
}


function showToast(type, msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
    const colors = { success: 'var(--secondary)', error: 'var(--danger)', info: 'var(--primary)' };
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" style="color:${colors[type]};font-size:1.2rem;flex-shrink:0"></i><span style="font-size:0.875rem">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}


function initDarkMode() {
    const btn = document.getElementById('darkToggle');
    if (!btn) return;
    const saved = localStorage.getItem('cn-dark');
    if (saved === 'true') document.body.classList.add('dark');
    btn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('cn-dark', isDark);
    });
}


function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
}


function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = Math.min(100, scrolled) + '%';
    });
}


function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = +el.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = Math.round(current).toLocaleString();
                    if (current >= target) clearInterval(timer);
                }, 16);
                io.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
}


function initAnimations() {
    const els = document.querySelectorAll('.fade-in-up');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.animationPlayState = 'running'; io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => { el.style.animationPlayState = 'paused'; io.observe(el); });
}


function initCategoryChips() {
    const chips = document.querySelectorAll('#categoryChips .chip');
    chips.forEach(c => c.addEventListener('click', () => {
        chips.forEach(x => x.classList.remove('active')); c.classList.add('active');
        const cat = c.dataset.cat;
        let filtered = cat === 'all' ? window.PROPERTIES : window.PROPERTIES.filter(p => p.type.toLowerCase() === cat || p.type.replace(' ', '').toLowerCase().includes(cat));
        const grid = document.getElementById('propertiesGrid');
        if (grid) renderProperties(filtered.slice(0, 6), grid);
    }));
}


document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initNavbar();
    initScrollProgress();
    initCounters();
    initAnimations();
    initCategoryChips();


    const grid = document.getElementById('propertiesGrid');
    if (grid) renderProperties(window.PROPERTIES.slice(0, 6), grid);


    const output = document.getElementById('propertyOutput');
    if (output) filterAndRender();


    const dashGrid = document.getElementById('property-grid');
    if (dashGrid) renderProperties(window.PROPERTIES.slice(0, 4), dashGrid);
});
