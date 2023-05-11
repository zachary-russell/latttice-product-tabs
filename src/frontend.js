// Wait for the DOM content to be loaded before executing the following code.
document.addEventListener("DOMContentLoaded", function () {
    // Get all the desktop tabs, tab content container, and tab content elements.
    const tabs = document.querySelectorAll(".tabs > div");
    const tabContentContainer = document.querySelector(".tab-content");
    const tabContents = document.querySelectorAll(".tab-content > div");

    // Add a click event listener to each desktop tab.
    tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            // Get the background color and index from the clicked tab's data attributes.
            const bgcolor = this.getAttribute("data-backgroundColor");
            const index = this.getAttribute("data-index");

            // Set the background color for the tab content container and the clicked tab.
            tabContentContainer.style.backgroundColor = bgcolor;
            this.style.backgroundColor = bgcolor;

            // Loop through all the tabs.
            for (let i = 0; i < tabs.length; i++) {
                if (i != index) {
                    // If the tab is not the clicked one, remove the "active" class
                    // and set the background color to a default value.
                    tabs[i].classList.remove("active");
                    tabs[i].style.backgroundColor = "#e6e6e6";
                } else {
                    // If the tab is the clicked one, add the "active" class
                    // and set the background color according to the data attribute.
                    tabs[i].classList.add("active");
                    tabs[i].style.backgroundColor = bgcolor;
                }
            }

            // Loop through all the tab contents.
            for (let i = 0; i < tabContents.length; i++) {
                if (i != index) {
                    // If the content is not related to the clicked tab, remove the "active" class.
                    tabContents[i].classList.remove("active");
                } else {
                    // If the content is related to the clicked tab, add the "active" class.
                    tabContents[i].classList.add("active");
                }
            }
        });
    });

    // Get all the mobile tab headers.
    const tabHeaders = document.querySelectorAll(".tabs-mobile li");

    // Add a click event listener to each mobile tab header.
    tabHeaders.forEach((tabHeader) => {
        tabHeader.addEventListener("click", function () {
            // Toggle the "active" class for the clicked mobile tab header.
            this.classList.toggle("active");

            // Get the background color from the clicked mobile tab header's data attributes.
            const bgcolor = this.getAttribute("data-backgroundColor");

            // Set the background color for the clicked mobile tab header.
            this.style.backgroundColor = bgcolor;

            // If the mobile tab header doesn't have the "active" class,
            // reset the background color to its default value.
            if (!this.classList.contains("active")) {
                this.style.backgroundColor = "";
            }
        });
    });
});
