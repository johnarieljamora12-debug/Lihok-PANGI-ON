/* =====================================================
   LIHOK PANGIÑON — SK TRANSPARENCY WEBSITE
   File: script.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================================
       1. AUTOMATIC FOOTER YEAR
       ================================================ */

    const yearElements = document.querySelectorAll(".year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* ================================================
       2. ACTIVE NAVIGATION LINK
       ================================================ */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (!linkPage) {
            return;
        }

        const normalizedLink = linkPage
            .split("/")
            .pop()
            .toLowerCase();

        if (
            normalizedLink === currentPage ||
            (currentPage === "" && normalizedLink === "index.html")
        ) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }

    });


    /* ================================================
       3. MOBILE NAVIGATION MENU
       ================================================ */

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.querySelector(".nav-links");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("show");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

        });

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    /* ================================================
       4. PROJECT SEARCH AND STATUS FILTER
       ================================================ */

    const projectSearch = document.getElementById("projectSearch");
    const statusFilter = document.getElementById("statusFilter");
    const projectCards = document.querySelectorAll(".project-card");
    const noProjects = document.getElementById("noProjects");

    function filterProjects() {

        if (!projectCards.length) {
            return;
        }

        const searchText = projectSearch
            ? projectSearch.value.toLowerCase().trim()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value.toLowerCase().trim()
            : "all";

        let visibleProjects = 0;

        projectCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            const statusElement = card.querySelector(".project-status");

            const statusText = statusElement
                ? statusElement.textContent.toLowerCase().trim()
                : cardText;

            const matchesSearch = cardText.includes(searchText);

            const matchesStatus =
                selectedStatus === "all" ||
                statusText.includes(selectedStatus);

            const shouldDisplay = matchesSearch && matchesStatus;

            card.style.display = shouldDisplay ? "" : "none";

            if (shouldDisplay) {
                visibleProjects++;
            }

        });

        if (noProjects) {
            noProjects.style.display =
                visibleProjects === 0 ? "block" : "none";
        }

    }

    if (projectSearch) {
        projectSearch.addEventListener("input", filterProjects);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", filterProjects);
    }

    filterProjects();


    /* ================================================
       5. DOCUMENT SEARCH AND CATEGORY FILTER
       ================================================ */

    const documentSearch = document.getElementById("documentSearch");
    const documentCategory = document.getElementById("documentCategory");
    const documentItems = document.querySelectorAll(".document-item");
    const noDocuments = document.getElementById("noDocuments");

    function filterDocuments() {

        if (!documentItems.length) {
            return;
        }

        const searchText = documentSearch
            ? documentSearch.value.toLowerCase().trim()
            : "";

        const selectedCategory = documentCategory
            ? documentCategory.value.toLowerCase().trim()
            : "all";

        let visibleDocuments = 0;

        documentItems.forEach(function (item) {

            const itemText = item.textContent.toLowerCase();

            const itemCategory = (
                item.dataset.category ||
                item.getAttribute("data-category") ||
                ""
            ).toLowerCase().trim();

            const matchesSearch = itemText.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                itemCategory === selectedCategory;

            const shouldDisplay = matchesSearch && matchesCategory;

            item.style.display = shouldDisplay ? "" : "none";

            if (shouldDisplay) {
                visibleDocuments++;
            }

        });

        if (noDocuments) {
            noDocuments.style.display =
                visibleDocuments === 0 ? "block" : "none";
        }

    }

    if (documentSearch) {
        documentSearch.addEventListener("input", filterDocuments);
    }

    if (documentCategory) {
        documentCategory.addEventListener("change", filterDocuments);
    }

    filterDocuments();


    /* ================================================
       6. FEEDBACK FORM VALIDATION
       ================================================ */

    const feedbackForm = document.getElementById("feedbackForm");
    const formMessage = document.getElementById("formMessage");

    if (feedbackForm) {

        feedbackForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (formMessage) {
                formMessage.textContent = "";
                formMessage.style.color = "";
            }

            if (!feedbackForm.checkValidity()) {

                feedbackForm.reportValidity();

                return;
            }

            const nameInput = feedbackForm.querySelector(
                '[name="name"]'
            );

            const emailInput = feedbackForm.querySelector(
                '[name="email"]'
            );

            const subjectInput = feedbackForm.querySelector(
                '[name="subject"]'
            );

            const messageInput = feedbackForm.querySelector(
                '[name="message"]'
            );

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const subject = subjectInput ? subjectInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !subject || !message) {

                showFormMessage(
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }

            /*
             * IMPORTANT:
             * This is only front-end validation.
             * It does not send or save feedback.
             *
             * Connect a backend or a secure form service
             * if you want to receive and store submissions.
             */

            showFormMessage(
                "Your form passed validation, but your feedback has not been sent or saved. Please connect a backend to submit it.",
                "warning"
            );

        });

    }

    function showFormMessage(message, type) {

        if (!formMessage) {
            alert(message);
            return;
        }

        formMessage.textContent = message;

        if (type === "error") {
            formMessage.style.color = "#b91c1c";
        } else if (type === "warning") {
            formMessage.style.color = "#92400e";
        } else {
            formMessage.style.color = "#166534";
        }

        formMessage.setAttribute("role", "status");

    }


    /* ================================================
       7. PRINT PAGE
       ================================================ */

    window.printPage = function () {
        window.print();
    };


    /* ================================================
       8. CONFIRM BEFORE OPENING DOCUMENTS
       ================================================ */

    const documentLinks = document.querySelectorAll(
        "[data-confirm-download]"
    );

    documentLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const confirmed = window.confirm(
                "Would you like to open or download this document?"
            );

            if (!confirmed) {
                event.preventDefault();
            }

        });

    });


    /* ================================================
       9. BACK TO TOP BUTTON
       ================================================ */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }

        }

        window.addEventListener("scroll", updateBackToTop);

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

        updateBackToTop();

    }


    /* ================================================
       10. SMOOTH SCROLL FOR INTERNAL SECTION LINKS
       ================================================ */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ================================================
       11. PREVENT EMPTY SEARCH SUBMISSIONS
       ================================================ */

    const searchForms = document.querySelectorAll(".search-form");

    searchForms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            const searchInput = form.querySelector(
                'input[type="search"], input[name="search"]'
            );

            if (searchInput && !searchInput.value.trim()) {
                event.preventDefault();
                searchInput.focus();
            }

        });

    });


    /* ================================================
       12. DISPLAY CURRENT DATE
       ================================================ */

    const dateElements = document.querySelectorAll(".current-date");

    dateElements.forEach(function (element) {

        element.textContent = new Date().toLocaleDateString(
            "en-PH",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    });


    /* ================================================
       13. WELCOME MESSAGE IN CONSOLE
       ================================================ */

    console.log(
        "%cLIHOK PANGIÑON",
        "color: #16845b; font-size: 22px; font-weight: bold;"
    );

    console.log(
        "SK Transparency Website successfully initialized."
    );

});