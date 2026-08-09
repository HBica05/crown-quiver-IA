document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* ========================================
           Shared Elements
        ======================================== */

        const menuToggle =
            document.querySelector(".menu-toggle");

        const navigation =
            document.querySelector(".site-nav");

        const backToTop =
            document.querySelector(".back-to-top");


        /* ========================================
           Mobile Navigation
        ======================================== */

        if (menuToggle && navigation) {

            menuToggle.addEventListener(
                "click",
                function () {

                    navigation.classList.toggle("open");

                    const isOpen =
                        navigation.classList.contains("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );

                }
            );


            navigation
                .querySelectorAll("a")
                .forEach(
                    function (link) {

                        link.addEventListener(
                            "click",
                            function () {

                                navigation.classList.remove("open");

                                menuToggle.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }
                        );

                    }
                );

        }


        /* ========================================
           Back To Top
        ======================================== */

        if (backToTop) {

            function updateBackToTop() {

                if (window.scrollY > 500) {

                    backToTop.classList.add("show");

                } else {

                    backToTop.classList.remove("show");

                }

            }


            window.addEventListener(
                "scroll",
                updateBackToTop
            );


            updateBackToTop();


            backToTop.addEventListener(
                "click",
                function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }


        /* ========================================
           Active Navigation
        ======================================== */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
            ||
            "index.html";


        const navigationLinks =
            document.querySelectorAll(
                ".site-nav a"
            );


        navigationLinks.forEach(
            function (link) {

                const linkPage =
                    link.getAttribute("href");


                if (linkPage === currentPage) {

                    navigationLinks.forEach(
                        function (navLink) {

                            navLink.classList.remove(
                                "active"
                            );

                        }
                    );


                    link.classList.add(
                        "active"
                    );

                }

            }
        );


        /* ========================================
           Shared Details Modal
           Activities / Events / News
        ======================================== */

        const detailsModal =
            document.getElementById(
                "detailsModal"
            );

        const closeModalBtn =
            document.getElementById(
                "closeModal"
            );

        const viewMoreButtons =
            document.querySelectorAll(
                ".view-more-btn"
            );

        const modalTitle =
            document.getElementById(
                "modalTitle"
            );

        const modalTime =
            document.getElementById(
                "modalTime"
            );

        const modalLocation =
            document.getElementById(
                "modalLocation"
            );

        const modalDesc =
            document.getElementById(
                "modalDesc"
            );

        const modalTableContainer =
            document.getElementById(
                "modalTableContainer"
            );


        function closeDetailsModal() {

            if (!detailsModal) {
                return;
            }


            detailsModal.classList.remove(
                "show"
            );


            detailsModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }


        if (
            detailsModal &&
            viewMoreButtons.length > 0
        ) {

            viewMoreButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            if (modalTitle) {

                                modalTitle.textContent =
                                    button.dataset.title ||
                                    "Details";

                            }


                            if (modalTime) {

                                modalTime.textContent =
                                    button.dataset.time ||
                                    "";

                            }


                            if (modalLocation) {

                                modalLocation.textContent =
                                    button.dataset.location ||
                                    "";

                            }


                            if (modalDesc) {

                                modalDesc.textContent =
                                    button.dataset.desc ||
                                    "";

                            }


                            /* Activities:
                               show schedule only for Training Sessions */

                            if (modalTableContainer) {

                                if (
                                    button.dataset.type ===
                                    "training"
                                ) {

                                    modalTableContainer
                                        .classList
                                        .add("show");

                                } else {

                                    modalTableContainer
                                        .classList
                                        .remove("show");

                                }

                            }


                            detailsModal.classList.add(
                                "show"
                            );


                            detailsModal.setAttribute(
                                "aria-hidden",
                                "false"
                            );


                            document.body.style.overflow =
                                "hidden";

                        }
                    );

                }
            );

        }


        /* Close Modal Button */

        if (
            closeModalBtn &&
            detailsModal
        ) {

            closeModalBtn.addEventListener(
                "click",
                closeDetailsModal
            );

        }


        /* Close Modal by Clicking Background */

        if (detailsModal) {

            detailsModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        detailsModal
                    ) {

                        closeDetailsModal();

                    }

                }
            );

        }


        /* Close Modal with Escape */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    detailsModal &&
                    detailsModal.classList.contains(
                        "show"
                    )
                ) {

                    closeDetailsModal();

                }

            }
        );


        /* ========================================
           Activities Countdown
        ======================================== */

        const activityDays =
            document.getElementById(
                "activityDays"
            );

        const activityHours =
            document.getElementById(
                "activityHours"
            );

        const activityMinutes =
            document.getElementById(
                "activityMinutes"
            );

        const activitySeconds =
            document.getElementById(
                "activitySeconds"
            );


        if (
            activityDays &&
            activityHours &&
            activityMinutes &&
            activitySeconds
        ) {

            const competitionDate =
                new Date(
                    "2026-10-15T09:00:00"
                ).getTime();


            function updateActivityCountdown() {

                const now =
                    new Date().getTime();

                const timeLeft =
                    competitionDate - now;


                if (timeLeft <= 0) {

                    activityDays.textContent =
                        "00";

                    activityHours.textContent =
                        "00";

                    activityMinutes.textContent =
                        "00";

                    activitySeconds.textContent =
                        "00";

                    return;

                }


                const days =
                    Math.floor(
                        timeLeft /
                        (1000 * 60 * 60 * 24)
                    );


                const hours =
                    Math.floor(
                        (
                            timeLeft %
                            (1000 * 60 * 60 * 24)
                        )
                        /
                        (1000 * 60 * 60)
                    );


                const minutes =
                    Math.floor(
                        (
                            timeLeft %
                            (1000 * 60 * 60)
                        )
                        /
                        (1000 * 60)
                    );


                const seconds =
                    Math.floor(
                        (
                            timeLeft %
                            (1000 * 60)
                        )
                        /
                        1000
                    );


                activityDays.textContent =
                    String(days).padStart(
                        2,
                        "0"
                    );


                activityHours.textContent =
                    String(hours).padStart(
                        2,
                        "0"
                    );


                activityMinutes.textContent =
                    String(minutes).padStart(
                        2,
                        "0"
                    );


                activitySeconds.textContent =
                    String(seconds).padStart(
                        2,
                        "0"
                    );

            }


            updateActivityCountdown();


            setInterval(
                updateActivityCountdown,
                1000
            );

        }


        /* ========================================
           Events Countdown
        ======================================== */

        const eventDays =
            document.getElementById(
                "eventDays"
            );

        const eventHours =
            document.getElementById(
                "eventHours"
            );

        const eventMinutes =
            document.getElementById(
                "eventMinutes"
            );

        const eventSeconds =
            document.getElementById(
                "eventSeconds"
            );

        const eventCountdownMessage =
            document.getElementById(
                "eventCountdownMessage"
            );


        if (
            eventDays &&
            eventHours &&
            eventMinutes &&
            eventSeconds
        ) {

            const eventDate =
                new Date(
                    "2026-10-25T09:00:00"
                ).getTime();


            function updateEventCountdown() {

                const now =
                    new Date().getTime();

                const timeLeft =
                    eventDate - now;


                if (timeLeft <= 0) {

                    eventDays.textContent =
                        "00";

                    eventHours.textContent =
                        "00";

                    eventMinutes.textContent =
                        "00";

                    eventSeconds.textContent =
                        "00";


                    if (
                        eventCountdownMessage
                    ) {

                        eventCountdownMessage.textContent =
                            "The countdown has ended.";

                    }


                    return;

                }


                const days =
                    Math.floor(
                        timeLeft /
                        (1000 * 60 * 60 * 24)
                    );


                const hours =
                    Math.floor(
                        (
                            timeLeft %
                            (1000 * 60 * 60 * 24)
                        )
                        /
                        (1000 * 60 * 60)
                    );


                const minutes =
                    Math.floor(
                        (
                            timeLeft %
                            (1000 * 60 * 60)
                        )
                        /
                        (1000 * 60)
                    );


                const seconds =
                    Math.floor(
                        (
                            timeLeft %
                            (1000 * 60)
                        )
                        /
                        1000
                    );


                eventDays.textContent =
                    String(days).padStart(
                        2,
                        "0"
                    );


                eventHours.textContent =
                    String(hours).padStart(
                        2,
                        "0"
                    );


                eventMinutes.textContent =
                    String(minutes).padStart(
                        2,
                        "0"
                    );


                eventSeconds.textContent =
                    String(seconds).padStart(
                        2,
                        "0"
                    );

            }


            updateEventCountdown();


            setInterval(
                updateEventCountdown,
                1000
            );

        }


        /* ========================================
           News Search & Category Filters
        ======================================== */

        const newsSearch =
            document.getElementById(
                "newsSearch"
            );

        const filterButtons =
            document.querySelectorAll(
                ".filter-btn"
            );

        const newsCards =
            document.querySelectorAll(
                ".news-page-card"
            );

        const noResults =
            document.getElementById(
                "noResults"
            );


        if (newsCards.length > 0) {

            let currentCategory =
                "all";

            let currentSearchTerm =
                "";


            function filterNews() {

                let visibleCount =
                    0;


                newsCards.forEach(
                    function (card) {

                        const category =
                            card.dataset.category ||
                            "";


                        const titleElement =
                            card.querySelector(
                                "h3"
                            );


                        const descriptionElement =
                            card.querySelector(
                                ".card-description"
                            );


                        const title =
                            titleElement
                                ?
                                titleElement
                                    .textContent
                                    .toLowerCase()
                                :
                                "";


                        const description =
                            descriptionElement
                                ?
                                descriptionElement
                                    .textContent
                                    .toLowerCase()
                                :
                                "";


                        const matchesCategory =
                            currentCategory ===
                            "all"
                            ||
                            category ===
                            currentCategory;


                        const matchesSearch =
                            title.includes(
                                currentSearchTerm
                            )
                            ||
                            description.includes(
                                currentSearchTerm
                            );


                        if (
                            matchesCategory &&
                            matchesSearch
                        ) {

                            card.style.display =
                                "flex";

                            visibleCount++;

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );


                if (noResults) {

                    noResults.hidden =
                        visibleCount !== 0;

                }

            }


            filterButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            filterButtons.forEach(
                                function (
                                    filterButton
                                ) {

                                    filterButton
                                        .classList
                                        .remove(
                                            "active"
                                        );

                                }
                            );


                            button.classList.add(
                                "active"
                            );


                            currentCategory =
                                button.dataset.filter ||
                                "all";


                            filterNews();

                        }
                    );

                }
            );


            if (newsSearch) {

                newsSearch.addEventListener(
                    "input",
                    function () {

                        currentSearchTerm =
                            newsSearch
                                .value
                                .toLowerCase()
                                .trim();


                        filterNews();

                    }
                );

            }


            filterNews();

        }


        /* ========================================
           Gallery Featured Slider
        ======================================== */

        const featuredGalleryImage =
            document.getElementById(
                "featuredGalleryImage"
            );

        const featuredGalleryTitle =
            document.getElementById(
                "featuredGalleryTitle"
            );

        const featuredGalleryCaption =
            document.getElementById(
                "featuredGalleryCaption"
            );

        const galleryPrev =
            document.getElementById(
                "galleryPrev"
            );

        const galleryNext =
            document.getElementById(
                "galleryNext"
            );

        const galleryDots =
            document.getElementById(
                "galleryDots"
            );


        if (
            featuredGalleryImage &&
            featuredGalleryTitle &&
            featuredGalleryCaption
        ) {

            const featuredSlides = [

                {
                    src:
                        "https://images.unsplash.com/photo-1528037316938-a1faa7812673?q=80&w=1200&auto=format&fit=crop",

                    alt:
                        "Archery practice session",

                    title:
                        "Recurve Practice",

                    caption:
                        "Illustrative archery training and technique development."
                },

                {
                    src:
                        "https://images.unsplash.com/photo-1712350840799-eed8c91053ce?q=80&w=1200&auto=format&fit=crop",

                    alt:
                        "Friendly archery competition",

                    title:
                        "Friendly Competition",

                    caption:
                        "A representation of friendly competition and club sportsmanship."
                },

                {
                    src:
                        "https://images.unsplash.com/photo-1709568859072-17c8748a3f19?q=80&w=1200&auto=format&fit=crop",

                    alt:
                        "Archery skills workshop",

                    title:
                        "Skills Workshop",

                    caption:
                        "An illustrative workshop focused on technique, confidence and equipment awareness."
                }

            ];


            let currentSlide =
                0;


            function createGalleryDots() {

                if (!galleryDots) {
                    return;
                }


                galleryDots.innerHTML =
                    "";


                featuredSlides.forEach(
                    function (
                        slide,
                        index
                    ) {

                        const dot =
                            document.createElement(
                                "button"
                            );


                        dot.type =
                            "button";


                        dot.className =
                            "gallery-dot";


                        dot.setAttribute(
                            "aria-label",
                            "Show featured image " +
                            (index + 1)
                        );


                        dot.addEventListener(
                            "click",
                            function () {

                                currentSlide =
                                    index;


                                updateFeaturedGallery();

                            }
                        );


                        galleryDots.appendChild(
                            dot
                        );

                    }
                );

            }


            function updateFeaturedGallery() {

                const slide =
                    featuredSlides[
                        currentSlide
                    ];


                featuredGalleryImage.src =
                    slide.src;


                featuredGalleryImage.alt =
                    slide.alt;


                featuredGalleryTitle.textContent =
                    slide.title;


                featuredGalleryCaption.textContent =
                    slide.caption;


                if (galleryDots) {

                    const dots =
                        galleryDots
                            .querySelectorAll(
                                ".gallery-dot"
                            );


                    dots.forEach(
                        function (
                            dot,
                            index
                        ) {

                            dot.classList.toggle(
                                "active",
                                index ===
                                currentSlide
                            );

                        }
                    );

                }

            }


            if (galleryPrev) {

                galleryPrev.addEventListener(
                    "click",
                    function () {

                        currentSlide =
                            (
                                currentSlide -
                                1 +
                                featuredSlides.length
                            )
                            %
                            featuredSlides.length;


                        updateFeaturedGallery();

                    }
                );

            }


            if (galleryNext) {

                galleryNext.addEventListener(
                    "click",
                    function () {

                        currentSlide =
                            (
                                currentSlide +
                                1
                            )
                            %
                            featuredSlides.length;


                        updateFeaturedGallery();

                    }
                );

            }


            createGalleryDots();

            updateFeaturedGallery();

        }


        /* ========================================
           Gallery Lightbox
        ======================================== */

        const galleryItems =
            document.querySelectorAll(
                ".gallery-item"
            );

        const galleryLightbox =
            document.getElementById(
                "galleryLightbox"
            );

        const galleryLightboxImage =
            document.getElementById(
                "galleryLightboxImage"
            );

        const galleryLightboxCaption =
            document.getElementById(
                "galleryLightboxCaption"
            );

        const galleryLightboxClose =
            document.getElementById(
                "galleryLightboxClose"
            );

        const lightboxPrev =
            document.getElementById(
                "lightboxPrev"
            );

        const lightboxNext =
            document.getElementById(
                "lightboxNext"
            );


        let currentGalleryIndex =
            0;


        function showGalleryImage(
            index
        ) {

            if (
                galleryItems.length === 0 ||
                !galleryLightboxImage ||
                !galleryLightboxCaption
            ) {

                return;

            }


            currentGalleryIndex =
                (
                    index +
                    galleryItems.length
                )
                %
                galleryItems.length;


            const item =
                galleryItems[
                    currentGalleryIndex
                ];


            const image =
                item.querySelector(
                    "img"
                );


            if (!image) {
                return;
            }


            galleryLightboxImage.src =
                image.src;


            galleryLightboxImage.alt =
                image.alt;


            galleryLightboxCaption.textContent =
                item.dataset.caption ||
                image.alt;

        }


        function openGalleryLightbox(
            index
        ) {

            if (!galleryLightbox) {
                return;
            }


            showGalleryImage(
                index
            );


            galleryLightbox.classList.add(
                "show"
            );


            galleryLightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }


        function closeGalleryLightbox() {

            if (!galleryLightbox) {
                return;
            }


            galleryLightbox.classList.remove(
                "show"
            );


            galleryLightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }


        if (
            galleryItems.length > 0 &&
            galleryLightbox
        ) {

            galleryItems.forEach(
                function (
                    item,
                    index
                ) {

                    item.addEventListener(
                        "click",
                        function () {

                            openGalleryLightbox(
                                index
                            );

                        }
                    );

                }
            );

        }


        if (galleryLightboxClose) {

            galleryLightboxClose.addEventListener(
                "click",
                closeGalleryLightbox
            );

        }


        if (lightboxPrev) {

            lightboxPrev.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    showGalleryImage(
                        currentGalleryIndex -
                        1
                    );

                }
            );

        }


        if (lightboxNext) {

            lightboxNext.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    showGalleryImage(
                        currentGalleryIndex +
                        1
                    );

                }
            );

        }


        if (galleryLightbox) {

            galleryLightbox.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        galleryLightbox
                    ) {

                        closeGalleryLightbox();

                    }

                }
            );

        }


        /* Gallery Keyboard Controls */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !galleryLightbox ||
                    !galleryLightbox
                        .classList
                        .contains(
                            "show"
                        )
                ) {

                    return;

                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeGalleryLightbox();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    showGalleryImage(
                        currentGalleryIndex -
                        1
                    );

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    showGalleryImage(
                        currentGalleryIndex +
                        1
                    );

                }

            }
        );


        /* ========================================
           Registration Form
        ======================================== */

        const registrationForm =
            document.getElementById(
                "registrationForm"
            );


        if (registrationForm) {

            const registrationMessage =
                document.getElementById(
                    "registrationMessage"
                );


            registrationForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById(
                                "registrationName"
                            )
                            .value
                            .trim();


                    const tp =
                        document
                            .getElementById(
                                "registrationTP"
                            )
                            .value
                            .trim();


                    const email =
                        document
                            .getElementById(
                                "registrationEmail"
                            )
                            .value
                            .trim();


                    const phone =
                        document
                            .getElementById(
                                "registrationPhone"
                            )
                            .value
                            .trim();


                    const programme =
                        document
                            .getElementById(
                                "registrationProgramme"
                            )
                            .value
                            .trim();


                    const experience =
                        document
                            .getElementById(
                                "registrationExperience"
                            )
                            .value;


                    const reason =
                        document
                            .getElementById(
                                "registrationReason"
                            )
                            .value
                            .trim();


                    const agreement =
                        document
                            .getElementById(
                                "registrationAgreement"
                            )
                            .checked;


                    if (
                        name === "" ||
                        tp === "" ||
                        email === "" ||
                        phone === "" ||
                        programme === "" ||
                        experience === "" ||
                        reason === "" ||
                        !agreement
                    ) {

                        registrationMessage.textContent =
                            "Please complete all required fields.";

                        registrationMessage.className =
                            "form-message error";

                        return;

                    }


                    if (
                        !email.includes("@")
                    ) {

                        registrationMessage.textContent =
                            "Please enter a valid email address.";

                        registrationMessage.className =
                            "form-message error";

                        return;

                    }


                    registrationMessage.textContent =
                        "Registration submitted successfully!";


                    registrationMessage.className =
                        "form-message success";


                    registrationForm.reset();

                }
            );

        }


        /* ========================================
           Enquiry Form
        ======================================== */

        const enquiryForm =
            document.getElementById(
                "enquiryForm"
            );


        if (enquiryForm) {

            const enquiryStatus =
                document.getElementById(
                    "enquiryMessageStatus"
                );


            enquiryForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById(
                                "enquiryName"
                            )
                            .value
                            .trim();


                    const email =
                        document
                            .getElementById(
                                "enquiryEmail"
                            )
                            .value
                            .trim();


                    const subject =
                        document
                            .getElementById(
                                "enquirySubject"
                            )
                            .value
                            .trim();


                    const category =
                        document
                            .getElementById(
                                "enquiryCategory"
                            )
                            .value;


                    const message =
                        document
                            .getElementById(
                                "enquiryMessage"
                            )
                            .value
                            .trim();


                    if (
                        name === "" ||
                        email === "" ||
                        subject === "" ||
                        category === "" ||
                        message === ""
                    ) {

                        enquiryStatus.textContent =
                            "Please complete all required fields.";


                        enquiryStatus.className =
                            "form-message error";


                        return;

                    }


                    if (
                        !email.includes("@")
                    ) {

                        enquiryStatus.textContent =
                            "Please enter a valid email address.";


                        enquiryStatus.className =
                            "form-message error";


                        return;

                    }


                    enquiryStatus.textContent =
                        "Your enquiry has been submitted successfully!";


                    enquiryStatus.className =
                        "form-message success";


                    enquiryForm.reset();

                }
            );

        }


        /* ========================================
           Feedback Form
        ======================================== */

        const feedbackForm =
            document.getElementById(
                "feedbackForm"
            );


        if (feedbackForm) {

            const feedbackMessage =
                document.getElementById(
                    "feedbackMessage"
                );


            feedbackForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById(
                                "feedbackName"
                            )
                            .value
                            .trim();


                    const email =
                        document
                            .getElementById(
                                "feedbackEmail"
                            )
                            .value
                            .trim();


                    const rating =
                        document
                            .getElementById(
                                "feedbackRating"
                            )
                            .value;


                    const comments =
                        document
                            .getElementById(
                                "feedbackComments"
                            )
                            .value
                            .trim();


                    if (
                        name === "" ||
                        email === "" ||
                        rating === "" ||
                        comments === ""
                    ) {

                        feedbackMessage.textContent =
                            "Please complete all required fields.";


                        feedbackMessage.className =
                            "form-message error";


                        return;

                    }


                    if (
                        !email.includes("@")
                    ) {

                        feedbackMessage.textContent =
                            "Please enter a valid email address.";


                        feedbackMessage.className =
                            "form-message error";


                        return;

                    }


                    feedbackMessage.textContent =
                        "Thank you for your feedback!";


                    feedbackMessage.className =
                        "form-message success";


                    feedbackForm.reset();

                }
            );

        }

    }
);