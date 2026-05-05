/**
 * ============================================
 * SORA HOME - Main Application Logic
 * Developer: Hiba Saeed | ID: 210513539
 * Altınbaş University - Software Engineering
 *
 * This script handles:
 * 1. Product database & rendering engine
 * 2. Real-time color swap algorithm
 * 3. Dynamic pricing engine (wood + dimensions)
 * 4. AI Warning system (structural validation)
 * 5. Eco-Tracker (CO2 savings calculator)
 * 6. AI Longevity Predictor (life-cycle analysis)
 * 7. Artisan matching pipeline (order simulation)
 * 8. SPA smooth scroll navigation
 * ============================================
 */


// ============================================
// 1. ARTISAN WORKSHOP DATABASE
// Each product is matched to a specialized workshop
// based on the craftsmanship requirements.
// ============================================
const artisanDatabase = {
    101: {
        name: "Hamit Usta Woodworking",
        master: "Master Hamit",
        location: "Modoko, Istanbul",
        reason: "Expert in heavy structural frames with modern aesthetic finishing."
    },
    102: {
        name: "Artisan Loft Istanbul",
        master: "Master Kerem",
        location: "Kağıthane, Istanbul",
        reason: "Specialized in minimalist oak dining tables with natural finishes."
    },
    103: {
        name: "Zanaat Design Studio",
        master: "Master Zanaat",
        location: "Beşiktaş, Istanbul",
        reason: "Expert in luxury velvet upholstery with precision metal leg joinery."
    },
    104: {
        name: "Bosphorus Wood Masters",
        master: "Master Yusuf",
        location: "Üsküdar, Istanbul",
        reason: "Generational expertise in classical carving and high-end finishing."
    }
};


// ============================================
// 2. WOOD MATERIAL DATABASE
// Each wood type has a price multiplier,
// a stress factor (for longevity calc), and CO2 data.
// ============================================
const woodData = {
    oak:    { label: "Oak",    multiplier: 1.0, stressFactor: 0.85, co2Saved: 12, maxDim: 280 },
    walnut: { label: "Walnut", multiplier: 1.4, stressFactor: 0.92, co2Saved: 18, maxDim: 240 },
    pine:   { label: "Pine",   multiplier: 0.7, stressFactor: 0.60, co2Saved: 6,  maxDim: 200 }
};


// ============================================
// 3. PRODUCT DATABASE (Mock Backend)
// Simulates a real database with all product data.
// In production this would come from a REST API.
// ============================================
const soraDatabase = [
    {
        id: 101,
        name: "SORA Cloud Bed",
        basePrice: 45000,
        description: "AI-optimized bubble frame engineered for maximum spinal support and modern luxury aesthetics.",
        variants: {
            beige: { img: "images/bedbeige.jpg", color: "#D2B48C", label: "Beige Boucle" },
            teal:  { img: "images/bedteal.jpg",  color: "#008080", label: "Teal Boucle" }
        }
    },
    {
        id: 102,
        name: "SORA Dining Set",
        basePrice: 38000,
        description: "Handcrafted oval table with fluted pedestal base and matching boucle dining chairs.",
        variants: {
            beige: { img: "images/diningbeige.jpg", color: "#C8A97E", label: "Natural Oak" },
            grey:  { img: "images/dininggrey.jpg",  color: "#757575", label: "Smoked Grey" }
        }
    },
    {
        id: 103,
        name: "SORA Velvet Chair",
        basePrice: 12500,
        description: "Shell-shaped accent chair in premium velvet with gold-tipped metal legs.",
        variants: {
            beige:    { img: "images/chairbeige.jpg",    color: "#E8DDD0", label: "Ivory Velvet" },
            blue:     { img: "images/chairblue.jpg",     color: "#1E3A5F", label: "Navy Velvet" },
            burgundy: { img: "images/chairburgundy.jpg", color: "#800020", label: "Burgundy Velvet" }
        }
    },
    {
        id: 104,
        name: "SORA Classic Chair",
        basePrice: 18900,
        description: "Traditional Turkish tufted wingback chair with ornate carved walnut frame.",
        variants: {
            beige:    { img: "images/classicbeige.jpg",    color: "#F5F0E8", label: "Cream Velvet" },
            burgundy: { img: "images/classicburgundy.jpg", color: "#800020", label: "Burgundy Velvet" },
            green:    { img: "images/classicgreen.jpg",    color: "#2E6B4F", label: "Forest Green" }
        }
    }
];


// ============================================
// 4. PRICING ENGINE
// Formula: Final Price = Base Price × Wood Multiplier
//          + (Width × Height × 0.8)
// This simulates a real engineering cost model.
// ============================================
function calculatePrice(productId, wood, width, height) {
    const product = soraDatabase.find(p => p.id === productId);
    if (!product) return 0;

    const w = woodData[wood];
    const dimensionCost = (parseFloat(width) || 0) * (parseFloat(height) || 0) * 0.8;
    const total = (product.basePrice * w.multiplier) + dimensionCost;

    return Math.round(total);
}


// ============================================
// 5. AI STRUCTURAL WARNING SYSTEM
// If user enters dimensions that exceed the
// structural capacity of the chosen wood type,
// the system triggers an engineering warning.
// ============================================
function checkStructuralWarning(wood, width, height) {
    const w = woodData[wood];
    const maxAllowed = w.maxDim;
    const inputDim = Math.max(parseFloat(width) || 0, parseFloat(height) || 0);

    if (inputDim > maxAllowed) {
        return `⚠️ AI Warning: ${w.label} wood has a maximum structural span of ${maxAllowed}cm. 
                Dimensions may cause material stress. Consider upgrading to Walnut for larger builds.`;
    }
    return null;
}


// ============================================
// 6. AI LONGEVITY PREDICTOR
// Calculates estimated lifespan based on:
// - Wood stress factor (material durability)
// - Dimension load factor (size vs. strength ratio)
// - Base lifespan constant: 25 years for premium wood
// ============================================
function predictLongevity(wood, width, height) {
    const w = woodData[wood];
    const baseLongevity = 25; // years (engineering constant)
    const loadFactor = Math.min(((parseFloat(width)||100) * (parseFloat(height)||100)) / 10000, 1.5);
    const years = Math.round(baseLongevity * w.stressFactor / loadFactor);

    return Math.max(8, Math.min(years, 30)); // Clamp between 8-30 years
}


// ============================================
// 7. ECO-TRACKER
// Calculates CO2 saved vs. mass-produced equivalent.
// Sustainable local sourcing reduces emissions significantly.
// ============================================
function calculateEco(wood, width, height) {
    const w = woodData[wood];
    const sizeFactor = ((parseFloat(width)||100) * (parseFloat(height)||100)) / 10000;
    return (w.co2Saved * sizeFactor).toFixed(1);
}


// ============================================
// 8. RENDER ENGINE
// Dynamically builds all product cards from
// the soraDatabase array and injects into the DOM.
// ============================================
const grid = document.getElementById('product-grid');

soraDatabase.forEach(product => {

    // --- Build color swatch HTML ---
    let swatches = '';
    let isFirst = true;
    for (let colorKey in product.variants) {
        const v = product.variants[colorKey];
        swatches += `
            <div class="swatch ${isFirst ? 'active' : ''}"
                style="background:${v.color}"
                title="${v.label}"
                onclick="handleColorSwap(${product.id}, '${v.img}', this)">
            </div>`;
        isFirst = false;
    }

    // --- Get first variant as default image ---
    const firstVariant = Object.values(product.variants)[0];
    const defaultWood = 'oak';

    // --- Build card HTML ---
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="img-container">
            <img id="main-img-${product.id}"
                src="${firstVariant.img}"
                alt="${product.name}"
                onerror="this.style.opacity='0.3'">
        </div>
        <div class="details">
            <h3>${product.name}</h3>
            <p class="product-desc">${product.description}</p>

            <!-- Color Selection -->
            <p class="swatch-label">Select Fabric / Finish</p>
            <div class="swatch-group">${swatches}</div>

            <!-- ==========================================
                 PRICING ENGINE UI
                 User inputs wood type and dimensions.
                 Price recalculates on every change.
            ========================================== -->
            <div class="pricing-engine">
                <h4>⚙️ Configure Your Piece</h4>
                <div class="input-row">
                    <div class="input-group">
                        <label>Wood Type</label>
                        <select id="wood-${product.id}" onchange="updateCalculations(${product.id})">
                            <option value="oak">Oak (Standard)</option>
                            <option value="walnut">Walnut (Premium)</option>
                            <option value="pine">Pine (Eco)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Width (cm)</label>
                        <input type="number" id="width-${product.id}"
                            placeholder="e.g. 180" min="50" max="300"
                            oninput="updateCalculations(${product.id})">
                    </div>
                    <div class="input-group">
                        <label>Height (cm)</label>
                        <input type="number" id="height-${product.id}"
                            placeholder="e.g. 200" min="50" max="300"
                            oninput="updateCalculations(${product.id})">
                    </div>
                </div>

                <!-- AI Structural Warning -->
                <div class="ai-warning" id="warning-${product.id}"></div>

                <!-- Eco Tracker -->
                <div class="eco-tracker" id="eco-${product.id}">
                    🌿 CO₂ Saved vs. Mass Production: calculating...
                </div>

                <!-- AI Longevity Badge -->
                <div class="longevity-badge" id="longevity-${product.id}">
                    🧠 AI Life-Cycle Prediction: calculating...
                </div>

                <!-- Final Price Display -->
                <div class="final-price-display">
                    <p style="font-size:0.72rem; letter-spacing:1.5px; text-transform:uppercase; opacity:0.7; margin-bottom:0.3rem;">Estimated Price</p>
                    <span id="price-display-${product.id}">${product.basePrice.toLocaleString()} TL</span>
                </div>
            </div>

            <!-- Order Button -->
            <button class="order-btn" onclick="processOrder(${product.id})">
                Order Handcrafted
            </button>
        </div>
    `;

    grid.appendChild(card);

    // Run initial calculation with defaults
    updateCalculations(product.id);
});


// ============================================
// 9. COLOR SWAP ALGORITHM
// Smooth image transition when user selects a color.
// Uses opacity fade for a luxury feel.
// ============================================
function handleColorSwap(prodId, newImgPath, clickedSwatch) {
    const img = document.getElementById(`main-img-${prodId}`);

    // Update active swatch styling
    clickedSwatch.closest('.swatch-group')
        .querySelectorAll('.swatch')
        .forEach(s => s.classList.remove('active'));
    clickedSwatch.classList.add('active');

    // Fade out → swap → fade in
    img.style.opacity = '0.2';
    setTimeout(() => {
        img.src = newImgPath;
        img.style.opacity = '1';
    }, 280);
}


// ============================================
// 10. LIVE CALCULATION UPDATER
// Triggered on every user input change.
// Updates: price, warning, eco, longevity.
// ============================================
function updateCalculations(productId) {
    const wood   = document.getElementById(`wood-${productId}`).value;
    const width  = document.getElementById(`width-${productId}`).value;
    const height = document.getElementById(`height-${productId}`).value;

    // --- Update Price ---
    const price = calculatePrice(productId, wood, width, height);
    document.getElementById(`price-display-${productId}`).innerText =
        price.toLocaleString() + ' TL';

    // --- Update AI Warning ---
    const warningEl = document.getElementById(`warning-${productId}`);
    const warning = checkStructuralWarning(wood, width, height);
    if (warning) {
        warningEl.innerText = warning;
        warningEl.style.display = 'block';
    } else {
        warningEl.style.display = 'none';
    }

    // --- Update Eco Tracker ---
    const co2 = calculateEco(wood, width, height);
    document.getElementById(`eco-${productId}`).innerHTML =
        `🌿 CO₂ Saved vs. Mass Production: <strong>${co2} kg</strong>`;

    // --- Update AI Longevity ---
    const years = predictLongevity(wood, width, height);
    const quality = years >= 20 ? '🏆 Heirloom Grade' : years >= 15 ? '⭐ Premium Grade' : '✅ Standard Grade';
    document.getElementById(`longevity-${productId}`).innerHTML =
        `🧠 AI Life-Cycle Prediction: <strong>${years} Years</strong> · ${quality}`;
}


// ============================================
// 11. ORDER PIPELINE SIMULATION
// Simulates the AI-to-Workshop routing process.
// Matches each product to its designated artisan.
// ============================================
function processOrder(productId) {
    const modal    = document.getElementById('order-modal');
    const msg      = document.getElementById('status-msg');
    const progress = document.getElementById('progress-fill');

    // Reset modal to loading state
    document.getElementById('loading-state').style.display = 'block';
    document.getElementById('success-state').style.display = 'none';
    progress.style.width = '0%';
    modal.classList.add('active');

    // Step 1: Accessing database
    msg.innerText = "Accessing Sora Database...";
    setTimeout(() => { progress.style.width = '30%'; }, 100);

    // Step 2: AI matching
    setTimeout(() => {
        msg.innerText = "Running AI Artisan Matching Algorithm...";
        progress.style.width = '60%';
    }, 1000);

    // Step 3: Routing to workshop
    setTimeout(() => {
        msg.innerText = "Routing to specialist workshop in Istanbul...";
        progress.style.width = '90%';
    }, 2200);

    // Step 4: Show result
    setTimeout(() => {
        progress.style.width = '100%';
        const artisan = artisanDatabase[productId];

        // Set artisan avatar (first letter of master's name)
        document.getElementById('artisan-avatar').innerText =
            artisan.master.split(' ').pop()[0]; // e.g. "H" for Hamit

        document.getElementById('artisan-name').innerText  = artisan.master + ' · ' + artisan.name;
        document.getElementById('artisan-loc').innerText   = artisan.location;
        document.getElementById('artisan-reason').innerText = '"' + artisan.reason + '"';
        document.getElementById('track-num').innerText     = 'SH-' + Math.floor(Math.random() * 9000 + 1000);

        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('success-state').style.display  = 'block';
    }, 3500);
}


// ============================================
// 12. MODAL CLOSE
// ============================================
function closeModal() {
    document.getElementById('order-modal').classList.remove('active');
}

// Close modal on backdrop click
document.getElementById('order-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});


// ============================================
// 13. SPA SMOOTH SCROLL NAVIGATION
// Navigates to sections without page reload.
// Offsets for sticky nav height.
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const top = section.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}


// ============================================
// 14. MOBILE MENU TOGGLE
// ============================================
function toggleMenu() {
    document.querySelector('.menu').classList.toggle('open');
}