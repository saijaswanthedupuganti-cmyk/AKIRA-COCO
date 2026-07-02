/**
 * AKIRA Luxury Cacao - Master Data File
 * Edit this file to safely change website content without touching HTML or CSS.
 */

const siteData = {
    // ============================================
    // 1. THE FOUNDER SECTION
    // ============================================
    founder: {
        eyebrow: "Chagallu, West Godavari",
        headlineHtml: "Cacao Isn't a Commodity Here.<br><em>It's Earned, Bean by Bean.</em>",
        byline: "Nandigam Surendra — Farmer & Founder, Akira Cacao Farms",
        imagePath: "images/surendra_founder.png",
        imageAlt: "Nandigam Surendra, founder of Akira Cacao Farms",
        paragraphs: [
            "Surendra didn't have to become a farmer. He's a graduate who could have chosen any other path — but the soil of the Godavari Delta called him back. Today he spends his mornings walking rows of cacao in Chagallu, checking pods by hand, because for him this was never a fallback. It was the work he wanted.",
            "What he sells isn't just cacao — it's a promise that nothing was rushed. Every pod is picked at peak ripeness, broken the same day, and fermented the old way, in wooden boxes, under banana leaves. No shortcuts, no filler beans, no story dressed up to look better than it is. Just what the Godavari Delta actually grew, and a farmer who stands behind every batch himself."
        ],
        quote: "Cacao isn't a commodity to me. It's soil, monsoon, and patience — carried by hand until the flavour is finally earned."
    },

    // ============================================
    // 2. THE RITUAL (PROCESS) SECTION
    // ============================================
    ritualIntro: {
        eyebrow: "The Craft",
        headlineHtml: "Crafted slowly with<br><em>Patience & Tradition.</em>",
        description: "We reject industrial shortcuts. The secret to our world-class flavor lies in a deeply meticulous ritual, handed down by generations to preserve the true soul of the cacao."
    },
    ritualSteps: [
        {
            id: 1,
            number: "01",
            title: "The Harvest",
            description: "Hand-harvested only at peak ripeness under the dense Godavari canopy. We wait for nature, never rushing the process, ensuring maximum natural sweetness.",
            imagePath: "images/authentic_farm.png",
            imageAlt: "Harvest",
            ambientClass: "ambient-harvest"
        },
        {
            id: 2,
            number: "02",
            title: "Natural Fermentation",
            description: "Sweated in traditional wooden boxes covered with banana leaves. No artificial additives. This slow, natural breakdown unlocks the complex terroir flavors.",
            imagePath: "images/farm_modern.png",
            imageAlt: "Fermentation",
            ambientClass: "ambient-fermentation"
        },
        {
            id: 3,
            number: "03",
            title: "Sun Cured",
            description: "Spread out to dry slowly under the intense, natural Andhra sun. We let time and light gently lock in the rich flavor profile, preserving the soul of the bean.",
            imagePath: "images/farmer_modern.png",
            imageAlt: "Curing",
            ambientClass: "ambient-sun"
        },
        {
            id: 4,
            number: "04",
            title: "Flawless Flow",
            description: "Meticulously stone-ground in small batches until the raw bean transforms into a thick, running river of flawless liquid dark chocolate.",
            imagePath: "images/authentic_process.png",
            imageAlt: "Grinding",
            ambientClass: "ambient-grinding"
        },
        {
            id: 5,
            number: "05",
            title: "The Final Touch",
            description: "Carefully tempered and poured into our signature molds. Each bar is hand-wrapped, sealing in the absolute purity of the West Godavari terroir.",
            imagePath: "images/authentic_product_1.png",
            imageAlt: "Packaging",
            ambientClass: "ambient-packaging"
        }
    ],

    // ============================================
    // 3. THE COLLECTION (PRODUCTS)
    // ============================================
    collectionIntro: {
        eyebrow: "The Collection",
        headlineHtml: "Artisanal<br><em>Masterpieces.</em>"
    },
    products: [
        {
            name: "72% Dark Origin",
            notes: "Wild Honey & Roasted Nut",
            price: "₹650",
            imagePath: "images/authentic_product_1.png",
            isElevated: true // Shifts the card down in the CSS grid
        },
        {
            name: "85% Delta Reserve",
            notes: "Deep Cacao & Spice",
            price: "₹750",
            imagePath: "images/authentic_product_2.png",
            isElevated: false
        },
        {
            name: "65% Sea Salt",
            notes: "Salted Caramel & Cream",
            price: "₹700",
            imagePath: "images/product_modern_3.png",
            isElevated: true
        }
    ],

    // ============================================
    // 4. SOCIAL GALLERY
    // ============================================
    socialGallery: {
        cta: {
            headlineHtml: "Follow Our<br><em>Journey.</em>",
            description: "Experience daily life on the farm, the meticulous chocolate making process, and the people behind the brand on our social channels.",
            buttonText: "Follow on Instagram",
            buttonLink: "https://www.instagram.com/akiracacaofarms/"
        },
        // Using an array to define the image grid order. 'cta' marks where the text block goes.
        // gridClass maps to CSS classes: img-tall, img-square, img-wide, etc.
        items: [
            { type: 'image', path: 'images/authentic_farmer.png', alt: 'Farm life', gridClass: 'img-tall', delayClass: '' },
            { type: 'image', path: 'images/authentic_product_1.png', alt: 'Cacao beans', gridClass: 'img-square', delayClass: 'delay-1' },
            { type: 'cta', gridClass: 'cta-block', delayClass: 'delay-2' },
            { type: 'image', path: 'images/authentic_process.png', alt: 'Chocolate grinding', gridClass: 'img-wide', delayClass: '' },
            { type: 'image', path: 'images/authentic_farm.png', alt: 'Godavari fields', gridClass: 'img-square', delayClass: 'delay-1' }
        ]
    }
};
