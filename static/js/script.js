// ---- PRODUCT DATA ----

const NEW_ARRIVALS = PRODUCTS.filter(p => p.badge === 'new');


// ---- STATE ----
let cart = JSON.parse(localStorage.getItem('vasudha_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('vasudha_wishlist') || '[]');
let currentFilter = 'all';
let visibleCount = 8;
let currentQV = null;
let qvQty = 1;
let currentSlide = 0;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initSlider();
  initDrawers();
  initFilters();
  renderProducts();
  renderNewArrivals();
  updateCartUI();
  updateWishlistUI();
  initScrollAnimations();
  initBackTop();
  initSearch();
  
});

// ---- LOADER ----
function initLoader() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
}
function filterByCategory(cat) {
  currentFilter = cat;
  visibleCount = 8;

  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });

  renderProducts();
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// ---- NAVBAR ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    navbar.classList.toggle('scrolled', s > 10);
    navbar.classList.toggle('at-top', s < 10);
    if (s < 10) navbar.classList.add('at-top');
    else navbar.classList.remove('at-top');
    lastScroll = s;
  });
  navbar.classList.add('at-top');

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open');
    document.getElementById('mobileOverlay').classList.add('active');
  });
  document.getElementById('closeMenu').addEventListener('click', closeMobileMenu);
  document.getElementById('mobileOverlay').addEventListener('click', closeMobileMenu);
  
  // Close mobile menu only for regular links, not dropdown toggles
  document.querySelectorAll('.mobile-link').forEach(l => {
    // Skip dropdown toggle links - they handle their own behavior
    if (!l.closest('.has-dropdown') || l.closest('.has-dropdown').querySelector('.dropdown').contains(l)) {
      l.addEventListener('click', closeMobileMenu);
    }
  });

  // Mobile dropdown click functionality
  initMobileDropdown();
}

function initMobileDropdown() {
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  if (dropdownItems.length === 0) return;

  dropdownItems.forEach(dropdownItem => {
    const dropdownTrigger = dropdownItem.querySelector('a');
    const dropdownContent = dropdownItem.querySelector('.dropdown');
    
    if (!dropdownTrigger || !dropdownContent) return;

    dropdownTrigger.addEventListener('click', function(e) {
      if (window.innerWidth > 768) {
        // Desktop: do absolutely nothing. CSS hover handles everything.
        return; 
      }
      
      // Mobile: prevent navigation and handle the manual accordion toggle
      e.preventDefault();
      
      // Close other dropdowns to keep only one open
      dropdownItems.forEach(other => {
        if (other !== dropdownItem) {
          other.classList.remove('active');
        }
      });
      
      // Toggle current
      dropdownItem.classList.toggle('active');
    });

    // Close when a sub-item category link is clicked
    dropdownContent.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdownItem.classList.remove('active');
        if (dropdownItem.closest('#mobileMenu')) {
          closeMobileMenu();
        }
      });
    });
  });

  // Clicking anywhere outside closes the active dropdown on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) return;
    
    dropdownItems.forEach(dropdownItem => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('active');
      }
    });
  });
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('active');
}

// ---- HERO SLIDER ----
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');

  function goTo(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  document.querySelector('.slide-next').addEventListener('click', () => goTo(currentSlide + 1));
  document.querySelector('.slide-prev').addEventListener('click', () => goTo(currentSlide - 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.slide)));
  setInterval(() => goTo(currentSlide + 1), 5000);
}

// ---- DRAWERS ----
function initDrawers() {
  // Cart
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);

  // Wishlist
  document.getElementById('wishlistToggle').addEventListener('click', openWishlist);
  document.getElementById('closeWishlist').addEventListener('click', closeWishlist);
  document.getElementById('wishlistOverlay').addEventListener('click', closeWishlist);

  // Quick View
  document.getElementById('closeQuickView').addEventListener('click', closeQuickView);
  document.getElementById('quickViewOverlay').addEventListener('click', e => {
    if(e.target === document.getElementById('quickViewOverlay')) closeQuickView();
  });
}
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
}
function openWishlist() {
  document.getElementById('wishlistDrawer').classList.add('open');
  document.getElementById('wishlistOverlay').classList.add('active');
}
function closeWishlist() {
  document.getElementById('wishlistDrawer').classList.remove('open');
  document.getElementById('wishlistOverlay').classList.remove('active');
}
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  currentQV = p; 
  qvQty = 1;

  document.getElementById('qvImg').src = p.img;
  document.getElementById('qvImg').alt = p.name;
  document.getElementById('qvCategory').textContent = p.cat.charAt(0).toUpperCase() + p.cat.slice(1);
  document.getElementById('qvName').textContent = p.name;
  document.getElementById('qvReviews').textContent = p.reviews;

  // ✅ PRICE SAFE CHECK
  const priceBox = document.getElementById('qvPrice');
  const oldBox = document.getElementById('qvOld');
  const discBox = document.getElementById('qvDisc');

  if (p.price) {
    priceBox.textContent = `₹${p.price.toLocaleString()}`;
    priceBox.style.display = 'inline';
  } else {
    priceBox.style.display = 'none';
  }

  // ✅ OLD PRICE + DISCOUNT SAFE
  if (p.old && p.price) {
    oldBox.textContent = `₹${p.old.toLocaleString()}`;
    oldBox.style.display = 'inline';

    const disc = Math.round((1 - p.price / p.old) * 100);
    discBox.textContent = `-${disc}%`;
    discBox.style.display = 'inline';
  } else {
    oldBox.style.display = 'none';
    discBox.style.display = 'none';
  }

  document.getElementById('qvDesc').textContent = p.desc;
  document.getElementById('qvQty').textContent = qvQty;

  const badge = document.getElementById('qvBadge');
  if (p.badge) {
    badge.textContent = p.badgeLabel;
    badge.className = `product-badge badge-${p.badge}`;
  } else {
    badge.className = 'product-badge';
    badge.textContent = '';
  }

  const inWish = wishlist.some(w => w.id === p.id);
  document.getElementById('qvWish').textContent = inWish ? '♥ Wishlisted' : '♡ Wishlist';

  document.getElementById('qvAddCart').onclick = () => { addToCart(p, qvQty); closeQuickView(); };
  document.getElementById('qvWish').onclick = () => { toggleWishlist(p); closeQuickView(); };

  document.getElementById('quickViewOverlay').style.display = 'flex';
}
function closeQuickView() {
  document.getElementById('quickViewOverlay').style.display = 'none';
}
function changeQty(delta) {
  qvQty = Math.max(1, qvQty + delta);
  document.getElementById('qvQty').textContent = qvQty;
}

// ---- FILTERS ----
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.cat;
      visibleCount = 8;
      renderProducts();
    });
  });
}
function filterByCategory(cat) {
  currentFilter = cat;
  visibleCount = 8;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  renderProducts();
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// ---- RENDER PRODUCTS ----
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = currentFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentFilter);
  const shown = filtered.slice(0, visibleCount);
  grid.innerHTML = shown.map(productCard).join('');
  document.getElementById('loadMoreBtn').style.display = shown.length < filtered.length ? 'inline-flex' : 'none';
}
function renderNewArrivals() {
  document.getElementById('newArrivalsGrid').innerHTML = NEW_ARRIVALS.map(productCard).join('');
}
function loadMore() {
  visibleCount += 4;
  renderProducts();
}

function productCard(p) {
  const inWish = wishlist.some(w => w.id === p.id);

  return `
    <div class="product-card fade-in">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeLabel}</span>` : ''}
        
        <div class="product-actions">
          <button class="add-cart-btn" onclick="addToCart(${JSON.stringify(p).replace(/"/g,'&quot;')}, 1)">Add to Cart</button>
          <button class="quick-view-btn" onclick="openQuickView(${p.id})">👁</button>
          <button class="wish-btn ${inWish ? 'active' : ''}" onclick="toggleWishlist(${JSON.stringify(p).replace(/"/g,'&quot;')})">♡</button>
        </div>
      </div>

      <div class="product-info">
        <p class="product-cat">${p.cat}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-stars">★★★★★ <span>${p.reviews}</span></div>

        ${
          (p.price !== undefined && p.price !== null)
          ? `
          <div class="product-pricing">
            <span class="price-now">₹${p.price.toLocaleString()}</span>
            ${
              (p.old && p.old > p.price)
              ? `<span class="price-old">₹${p.old.toLocaleString()}</span>
                 <span class="price-disc">-${Math.round((1 - p.price / p.old) * 100)}%</span>`
              : ''
            }
          </div>
          `
          : ''
        }

      </div>
    </div>
  `;
}


// ---- CART ----
function addToCart(p, qty) {
  const existing = cart.find(i => i.id === p.id);
  if (existing) { existing.qty += qty; }
  else { cart.push({ ...p, qty }); }
  saveCart();
  updateCartUI();
  renderCartItems();
  openCart();
  showToast(`"${p.name}" added to cart!`);
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}
function changeCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
}
function saveCart() {
  localStorage.setItem('vasudha_cart', JSON.stringify(cart));
}
function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = total;
  document.getElementById('cartCount').textContent = `(${total})`;
  renderCartItems();
}
function renderCartItems() {
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    el.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg><p>Your cart is empty</p><a href="#shop" class="btn-gold btn-sm" onclick="closeCart()">Start Shopping</a></div>`;
    footer.style.display = 'none';
    return;
  }
  const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
  el.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}" loading="lazy"/>
      <div class="cart-item-info">
        <h4>${i.name}</h4>
        <p class="product-cat">${i.cat}</p>
        <p class="cart-item-price">₹${(i.price * i.qty).toLocaleString()}</p>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="changeCartQty(${i.id},-1)">−</button>
          <span class="qty-display">${i.qty}</span>
          <button class="qty-btn" onclick="changeCartQty(${i.id},1)">+</button>
          <button class="remove-item" onclick="removeFromCart(${i.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  footer.style.display = 'block';
  document.getElementById('cartTotal').textContent = `₹${subtotal.toLocaleString()}`;
}

// ---- WISHLIST ----
function toggleWishlist(p) {
  const idx = wishlist.findIndex(w => w.id === p.id);
  if (idx >= 0) {
    wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`);
  } else {
    wishlist.push(p);
    showToast(`"${p.name}" added to wishlist!`);
  }
  localStorage.setItem('vasudha_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
  renderNewArrivals();
}
function updateWishlistUI() {
  document.getElementById('wishlistBadge').textContent = wishlist.length;
  const el = document.getElementById('wishlistItems');
  if (!wishlist.length) {
    el.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><p>No items in wishlist</p></div>`;
    return;
  }
  el.innerHTML = wishlist.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}" loading="lazy"/>
      <div class="cart-item-info">
        <h4>${i.name}</h4>
        <p class="cart-item-price">₹${i.price.toLocaleString()}</p>
        <div class="cart-item-actions">
          <button class="qty-btn" style="width:auto;padding:4px 12px;border-radius:2px;" onclick="addToCart(${JSON.stringify(i).replace(/"/g,'&quot;')},1);closeWishlist()">Add to Cart</button>
          <button class="remove-item" onclick="toggleWishlist(${JSON.stringify(i).replace(/"/g,'&quot;')})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ---- CHECKOUT ----
function showCheckout() {
  closeCart();
  const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('checkoutItems').innerHTML = cart.map(i =>
    `<div class="summary-row"><span>${i.name} ×${i.qty}</span><span>₹${(i.price*i.qty).toLocaleString()}</span></div>`
  ).join('');
  document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('checkoutTotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('checkoutOverlay').style.display = 'flex';
}

// // // 👇 Function ke brackets me 'e' likhna zaroori hai
// function closeOrder(e) {
//     // 1. 🔥 REFRESH/RELOAD KO ROKO (Sabse pehle yeh line aayegi)
//     if (e && e.preventDefault) {
//         e.preventDefault(); 
//     }

//     console.log("Stopping reload... starting full cleanup.");

//     // 2. Cart ko poori tarah saaf karo
//     localStorage.removeItem("cart");
//     localStorage.clear(); 
    
//     // 3. Form ke saare dabbe (inputs) khaali karo
//     document.querySelectorAll('form input').forEach(input => input.value = "");
    
//     // 4. Success popup ko band karo
//     let popup = document.getElementById("orderSuccess");
//     if (popup) { 
//         popup.style.display = "none"; 
//     }

//     console.log("Cleanup done! Now safely redirecting...");

//     // 5. 🔥 SAB KAAM HONE KE BAAD AB HOMEPAGE PAR BEHJO (Naye products ke liye)
//     window.location.href = "/"; 
// }
// ---- SEARCH ----
function initSearch() {
  document.getElementById('searchToggle').addEventListener('click', () => {
    document.getElementById('searchOverlay').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 300);
  });
  document.getElementById('closeSearch').addEventListener('click', () => {
    document.getElementById('searchOverlay').classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('searchOverlay').classList.remove('active');
      document.getElementById('quickViewOverlay').style.display = 'none';
    }
  });
  document.querySelectorAll('.search-suggestions span').forEach(s => {
    s.addEventListener('click', () => {
      document.getElementById('searchInput').value = s.textContent;
      document.getElementById('searchOverlay').classList.remove('active');
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ---- CONTACT FORM ----
async function submitContact(e) {
  e.preventDefault();
   const form = document.getElementById('contactForm')
  const newform = new FormData(form)
    const response = await fetch("/", {
        method: "POST",
        body: newform
    });
      if (response.ok) {
        document.getElementById("formSuccess").style.display = "block";
        form.reset();
    }

  setTimeout(() => {
    document.getElementById('contactForm').reset();
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
  }, 4000);
}

// ---- NEWSLETTER ----
function subscribeNL() {
  const email = document.getElementById('nlEmail').value;
  if (!email || !email.includes('@')) { showToast('Please enter a valid email!'); return; }
  showToast('🎉 You\'re subscribed! Welcome to the Vasudha Circle.');
  document.getElementById('nlEmail').value = '';
}

// ---- TOAST ----
let toastTimeout;
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);
      background:#1A1714;color:#fff;padding:12px 24px;border-radius:4px;
      font-size:0.85rem;z-index:9000;opacity:0;transition:all 0.3s ease;
      white-space:nowrap;max-width:90vw;text-align:center;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2800);
}

// ---- SCROLL ANIMATIONS ----
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observeAll() {
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }
  observeAll();
  const mutObs = new MutationObserver(observeAll);
  mutObs.observe(document.getElementById('productsGrid'), { childList: true });
  mutObs.observe(document.getElementById('newArrivalsGrid'), { childList: true });
}

// ---- BACK TO TOP ----
function initBackTop() {
  const btn = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- STATIC PAGES ----
const PAGES = {
  privacy: `
    <h2>Privacy Policy</h2>
    <p>Last updated: January 2025</p>
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide when making purchases, creating accounts, or contacting us. This includes name, email, address, and payment details.</p>
    <h3>2. How We Use Your Information</h3>
    <p>Your information is used to process orders, send updates, personalise your experience, and improve our services. We never sell your data to third parties.</p>
    <h3>3. Data Security</h3>
    <p>All transactions are SSL encrypted. We use industry-standard security measures to protect your personal information.</p>
    <h3>4. Cookies</h3>
    <p>We use cookies to enhance your browsing experience. You may disable cookies in your browser settings.</p>
    <h3>5. Contact</h3>
    <p>For privacy-related queries, email us at privacy@vasudha.store</p>
  `,
  terms: `
    <h2>Terms & Conditions</h2>
    <p>Last updated: January 2025</p>
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing or using Vasudha's website, you agree to be bound by these Terms and Conditions.</p>
    <h3>2. Products & Pricing</h3>
    <p>All prices are in Indian Rupees (₹) and inclusive of GST. We reserve the right to change prices without notice.</p>
    <h3>3. Orders & Payments</h3>
    <p>Orders are confirmed upon payment. We accept UPI, credit/debit cards, and Cash on Delivery (COD).</p>
    <h3>4. Shipping Policy</h3>
    <p>Free shipping on orders above ₹999. Standard delivery takes 5–7 business days. Express delivery is available at extra cost.</p>
    <h3>5. Returns & Refunds</h3>
    <p>We accept returns within 7 days of delivery for damaged or incorrect items. Customised items are non-returnable.</p>
    <h3>6. Intellectual Property</h3>
    <p>All content on this website is the property of Vasudha and may not be reproduced without permission.</p>
  `
};
function showPage(key) {
  document.getElementById('pageModalContent').innerHTML = PAGES[key] || '';
  document.getElementById('pageModal').style.display = 'flex';
}