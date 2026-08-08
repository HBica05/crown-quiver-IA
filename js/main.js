document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* ========================================
           Shared Elements
        ======================================== */

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );

        const navigation =
            document.querySelector(
                ".site-nav"
            );

        const backToTop =
            document.querySelector(
                ".back-to-top"
            );


        /* ========================================
           Mobile Navigation
        ======================================== */

        if (
            menuToggle &&
            navigation
        ) {

            menuToggle.addEventListener(
                "click",
                function () {

                    navigation
                        .classList
                        .toggle("open");


                    const isOpen =
                        navigation
                            .classList
                            .contains(
                                "open"
                            );


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

                                navigation
                                    .classList
                                    .remove(
                                        "open"
                                    );

                                menuToggle
                                    .setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                            }
                        );

                    }
                );

        }


        /* ========================================
           Back To Top Button
        ======================================== */

        if (backToTop) {

            function updateBackToTop() {

                if (
                    window.scrollY >
                    500
                ) {

                    backToTop
                        .classList
                        .add("show");

                }

                else {

                    backToTop
                        .classList
                        .remove("show");

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

                        behavior:
                            "smooth"

                    });

                }
            );

        }


        /* ========================================
           Active Navigation Link
        ======================================== */

        const currentPage =
            window.location
                .pathname
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
                    link.getAttribute(
                        "href"
                    );


                if (
                    linkPage ===
                    currentPage
                ) {

                    navigationLinks
                        .forEach(
                            function (
                                navLink
                            ) {

                                navLink
                                    .classList
                                    .remove(
                                        "active"
                                    );

                            }
                        );


                    link.classList
                        .add(
                            "active"
                        );

                }

            }
        );


        /* ========================================
           Activity / Event Details Modal
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


        function closeDetailsModal() {

            if (!detailsModal) {
                return;
            }


            detailsModal
                .classList
                .remove(
                    "show"
                );


            detailsModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style
                .overflow = "";

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

                                modalTitle
                                    .textContent =
                                    button.dataset
                                        .title
                                    ||
                                    "Details";

                            }


                            if (modalTime) {

                                modalTime
                                    .textContent =
                                    button.dataset
                                        .time
                                    ||
                                    "";

                            }


                            if (modalLocation) {

                                modalLocation
                                    .textContent =
                                    button.dataset
                                        .location
                                    ||
                                    "";

                            }


                            if (modalDesc) {

                                modalDesc
                                    .textContent =
                                    button.dataset
                                        .desc
                                    ||
                                    "";

                            }


                            detailsModal
                                .classList
                                .add(
                                    "show"
                                );


                            detailsModal
                                .setAttribute(
                                    "aria-hidden",
                                    "false"
                                );


                            document.body.style
                                .overflow =
                                "hidden";

                        }
                    );

                }
            );

        }


        /* Close Modal Using X */

        if (
            closeModalBtn &&
            detailsModal
        ) {

            closeModalBtn
                .addEventListener(
                    "click",
                    closeDetailsModal
                );

        }


        /* Close Modal by Clicking Background */

        if (detailsModal) {

            detailsModal
                .addEventListener(
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


        /* Close Modal Using Escape Key */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                    &&
                    detailsModal
                    &&
                    detailsModal
                        .classList
                        .contains(
                            "show"
                        )
                ) {

                    closeDetailsModal();

                }

            }
        );

    }
);