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
           Back To Top Button
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
           Active Navigation Link
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

                            navLink.classList.remove("active");

                        }
                    );


                    link.classList.add("active");

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


            detailsModal.classList.remove("show");


            detailsModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow = "";

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


        /* Close Modal Using X */

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


        /* Close Modal Using Escape Key */

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


                    if (!email.includes("@")) {

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


                    if (!email.includes("@")) {

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


                    if (!email.includes("@")) {

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