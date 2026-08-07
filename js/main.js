document.addEventListener(
    "DOMContentLoaded",
    function () {

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


        /* =========================
           Mobile Navigation
        ========================== */

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
                        isOpen
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



        /* =========================
           Back To Top Button
        ========================== */

        if (backToTop) {

            window.addEventListener(
                "scroll",
                function () {

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
            );


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



        /* =========================
           Active Navigation Link
        ========================== */

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

    }
);