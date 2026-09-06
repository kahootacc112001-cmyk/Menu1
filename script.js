/* =========================================
   RESTAURANTS DATA
========================================= */

const restaurants = [
    {
        name: "كريبيانو",

        phones: [
            "01283038100",
            "01070760003"
        ],

        menuImages: [
            "images/krepeano-menu1.jpg",
            "images/krepeano-menu2.jpg"
        ]
    },

    {
        name: "BAZOOKA",

        phones: [
            "16455"
        ],

        menuImages: [
            "images/bazooka-menu1.jpg",
            "images/bazooka-menu2.jpg",
            "images/bazooka-menu3.jpg"
        ]
    },

    {
        name: "SALTA3 BURGER",

        phones: [
            "01007916001",
            "01156852717"
        ],

        menuImages: [
            "images/salta3-menu1.jpg",
            "images/salta3-menu2.jpg"
        ]
    },

    {
        name: "بحري",

        phones: [
            "01027812572",
            "01222225976"
        ],

        menuImages: [
            "images/bahary-menu1.jpg"
        ]
    }
];


/* =========================================
   DOM ELEMENTS
========================================= */

const restaurantsGrid =
    document.getElementById("restaurantsGrid");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const lightboxRestaurant =
    document.getElementById("lightboxRestaurant");

const lightboxCounter =
    document.getElementById("lightboxCounter");

const backToTop =
    document.getElementById("backToTop");


/* =========================================
   LIGHTBOX STATE
========================================= */

let currentRestaurantIndex = 0;
let currentImageIndex = 0;


/* =========================================
   PLACEHOLDER GENERATOR
========================================= */

function createPlaceholder(restaurantName, imageNumber = 1) {

    const placeholderSVG = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1200"
            height="800"
            viewBox="0 0 1200 800"
        >

            <defs>

                <linearGradient
                    id="bg"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stop-color="#dff4f4"
                    />

                    <stop
                        offset="100%"
                        stop-color="#fff0df"
                    />
                </linearGradient>

            </defs>

            <rect
                width="1200"
                height="800"
                fill="url(#bg)"
            />

            <circle
                cx="600"
                cy="400"
                r="220"
                fill="#ffffff"
                opacity="0.5"
            />

            <text
                x="600"
                y="390"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="95"
            >
                🍔
            </text>

            <text
                x="600"
                y="485"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="32"
                font-weight="700"
                fill="#14212b"
            >
                ${restaurantName}
            </text>

            <text
                x="600"
                y="535"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="21"
                fill="#687780"
            >
                Menu Placeholder ${imageNumber}
            </text>

        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(placeholderSVG)}`;
}


/* =========================================
   IMAGE FALLBACK
========================================= */

function setupImageFallback(img, restaurantName, imageNumber) {

    img.addEventListener("error", function () {

        /*
         * If the real menu image doesn't exist yet,
         * show a temporary placeholder instead.
         */

        if (!img.dataset.fallbackApplied) {

            img.dataset.fallbackApplied = "true";

            img.src = createPlaceholder(
                restaurantName,
                imageNumber
            );
        }

    });
}


/* =========================================
   RENDER RESTAURANTS
========================================= */

function renderRestaurants() {

    restaurantsGrid.innerHTML = "";

    restaurants.forEach((restaurant, restaurantIndex) => {

        const card = document.createElement("article");

        card.className = "restaurant-card";

        card.innerHTML = `

            <!-- Card Header -->
            <div class="card-top">

                <div>

                    <h3 class="restaurant-name">
                        ${restaurant.name}
                    </h3>

                    <div class="restaurant-badge">
                        <i class="fa-solid fa-location-dot"></i>
                        مطعم قريب 🍴
                    </div>

                </div>

                <div class="restaurant-icon">
                    <i class="fa-solid fa-burger"></i>
                </div>

            </div>


            <!-- Gallery -->
            <div class="menu-gallery">

                <div
                    class="gallery-main"
                    data-restaurant="${restaurantIndex}"
                    data-image="0"
                >

                    <img
                        src="${restaurant.menuImages[0]}"
                        alt="منيو ${restaurant.name}"
                        loading="lazy"
                    >

                    <div class="gallery-overlay">

                        <span class="gallery-view">
                            <i class="fa-solid fa-expand"></i>
                            اضغط لعرض المنيو
                        </span>

                        <span class="gallery-count">
                            ${restaurant.menuImages.length} صور
                        </span>

                    </div>

                </div>

                <div class="gallery-thumbnails">

                    ${restaurant.menuImages
                        .map((image, imageIndex) => {

                            return `
                                <div
                                    class="gallery-thumbnail
                                    ${imageIndex === 0 ? "active" : ""}"
                                    data-restaurant="${restaurantIndex}"
                                    data-image="${imageIndex}"
                                >

                                    <img
                                        src="${image}"
                                        alt="منيو ${restaurant.name} ${imageIndex + 1}"
                                        loading="lazy"
                                    >

                                </div>
                            `;

                        })
                        .join("")
                    }

                </div>

            </div>


            <!-- Card Bottom -->
            <div class="card-bottom">

                <div class="phone-area">

                    <div class="phone-label">

                        <i class="fa-solid fa-phone"></i>

                        ${restaurant.phones.length === 1
                            ? "رقم الهاتف"
                            : "أرقام الهاتف"
                        }

                    </div>

                    <div class="phone-numbers">

                        ${restaurant.phones
                            .map(phone => {

                                /*
                                 * Remove any spaces or symbols
                                 * from tel link.
                                 */

                                const telNumber =
                                    phone.replace(/[^\d+]/g, "");

                                return `
                                    <a
                                        class="phone-number"
                                        href="tel:${telNumber}"
                                    >
                                        <i class="fa-solid fa-phone"></i>
                                        <span dir="ltr">
                                            ${phone}
                                        </span>
                                    </a>
                                `;

                            })
                            .join("")
                        }

                    </div>

                </div>


                <!-- Call Button -->

                <a
                    class="call-button"
                    href="tel:${restaurant.phones[0]}"
                >

                    <i class="fa-solid fa-phone-volume"></i>

                    <span>
                        ${restaurant.phones.length === 1
                            ? "اتصل الآن"
                            : "اتصل الآن"
                        }
                    </span>

                </a>

            </div>

        `;


        restaurantsGrid.appendChild(card);


        /* =========================
           Setup Images
        ========================== */

        const images =
            card.querySelectorAll("img");

        images.forEach((img, imageIndex) => {

            setupImageFallback(
                img,
                restaurant.name,
                imageIndex + 1
            );

        });


        /* =========================
           Main Gallery Click
        ========================== */

        const mainGallery =
            card.querySelector(".gallery-main");

        mainGallery.addEventListener("click", () => {

            openLightbox(
                restaurantIndex,
                Number(mainGallery.dataset.image)
            );

        });


        /* =========================
           Thumbnail Clicks
        ========================== */

        const thumbnails =
            card.querySelectorAll(".gallery-thumbnail");

        thumbnails.forEach(thumbnail => {

            thumbnail.addEventListener("click", event => {

                event.stopPropagation();

                const imageIndex =
                    Number(thumbnail.dataset.image);

                updateMainGallery(
                    restaurantIndex,
                    imageIndex,
                    card
                );

            });

        });

    });

}


/* =========================================
   UPDATE MAIN GALLERY
========================================= */

function updateMainGallery(
    restaurantIndex,
    imageIndex,
    card
) {

    const restaurant =
        restaurants[restaurantIndex];

    const mainGallery =
        card.querySelector(".gallery-main");

    const mainImage =
        mainGallery.querySelector("img");

    mainGallery.dataset.image = imageIndex;

    mainImage.src =
        restaurant.menuImages[imageIndex];

    mainImage.alt =
        `منيو ${restaurant.name}`;


    /*
     * Re-apply fallback to the new image.
     */

    setupImageFallback(
        mainImage,
        restaurant.name,
        imageIndex + 1
    );


    /*
     * Update active thumbnail.
     */

    const thumbnails =
        card.querySelectorAll(".gallery-thumbnail");

    thumbnails.forEach((thumbnail, index) => {

        thumbnail.classList.toggle(
            "active",
            index === imageIndex
        );

    });

}


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(
    restaurantIndex,
    imageIndex
) {

    currentRestaurantIndex =
        restaurantIndex;

    currentImageIndex =
        imageIndex;

    updateLightbox();

    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


/* =========================================
   UPDATE LIGHTBOX
========================================= */

function updateLightbox() {

    const restaurant =
        restaurants[currentRestaurantIndex];

    const image =
        restaurant.menuImages[currentImageIndex];

    lightboxImage.src = image;

    lightboxImage.alt =
        `منيو ${restaurant.name}`;

    lightboxRestaurant.textContent =
        restaurant.name;

    lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${restaurant.menuImages.length}`;


    /*
     * Placeholder if image doesn't exist.
     */

    setupImageFallback(
        lightboxImage,
        restaurant.name,
        currentImageIndex + 1
    );
}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


/* =========================================
   NEXT IMAGE
========================================= */

function nextImage() {

    const restaurant =
        restaurants[currentRestaurantIndex];

    currentImageIndex++;

    if (
        currentImageIndex >=
        restaurant.menuImages.length
    ) {
        currentImageIndex = 0;
    }

    updateLightbox();
}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function previousImage() {

    const restaurant =
        restaurants[currentRestaurantIndex];

    currentImageIndex--;

    if (currentImageIndex < 0) {

        currentImageIndex =
            restaurant.menuImages.length - 1;
    }

    updateLightbox();
}


/* =========================================
   LIGHTBOX EVENTS
========================================= */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);

lightboxNext.addEventListener(
    "click",
    nextImage
);

lightboxPrev.addEventListener(
    "click",
    previousImage
);


/*
 * Clicking outside the image closes
 * the lightbox.
 */

document
    .querySelector(".lightbox-backdrop")
    .addEventListener(
        "click",
        closeLightbox
    );


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            previousImage();
        }

        if (event.key === "ArrowLeft") {
            nextImage();
        }

    }
);


/* =========================================
   TOUCH / SWIPE SUPPORT
========================================= */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);

lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;

    /*
     * Ignore very small movements.
     */

    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    if (swipeDistance > 0) {
        previousImage();
    } else {
        nextImage();
    }
}


/* =========================================
   BACK TO TOP
========================================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

function setupScrollReveal() {

    const cards =
        document.querySelectorAll(
            ".restaurant-card"
        );

    /*
     * IntersectionObserver gives us
     * a lightweight scroll animation
     * without any external library.
     */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        cards.forEach(card => {
            observer.observe(card);
        });

    }

}


/* =========================================
   INITIALIZE
========================================= */

renderRestaurants();

setupScrollReveal();
