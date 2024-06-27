document.addEventListener("DOMContentLoaded", () => {
    // Dropdown Menu Interaction
    const dropdown = document.querySelector(".dropdown");
    dropdown.addEventListener("mouseenter", () => {
        dropdown.querySelector(".dropdown-content").style.display = "block";
    });
    dropdown.addEventListener("mouseleave", () => {
        dropdown.querySelector(".dropdown-content").style.display = "none";
    });

    // Form Validation
    const contactForm = document.querySelector("#contactForm");
    const feedbackForm = document.querySelector("#feedbackForm");
    const successModal = document.querySelector("#successModal");
    const closeModal = document.querySelector("#closeModal");
    const dynamicContent = document.querySelector("#dynamicContent");

    function validateForm(form) {
        let valid = true;
        const inputs = form.querySelectorAll("input, textarea");

        inputs.forEach(input => {
            if (!input.value) {
                valid = false;
                input.classList.add("error");
                input.nextElementSibling.textContent = `${input.name} is required.`;
            } else {
                input.classList.remove("error");
                input.nextElementSibling.textContent = '';
            }
        });

        return valid;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;

        if (validateForm(form)) {
            // Dynamic content update
            const formData = new FormData(form);
            const content = document.createElement("div");
            content.classList.add("content-item");
            formData.forEach((value, key) => {
                const p = document.createElement("p");
                p.innerHTML = `<strong>${key}:</strong> ${value}`;
                content.appendChild(p);
            });
            dynamicContent.appendChild(content);

            // Show success modal
            successModal.style.display = "block";
            form.reset();
        }
    }

    if (contactForm) {
        contactForm.addEventListener("submit", handleSubmit);
    }

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", handleSubmit);
    }

    closeModal.addEventListener("click", () => {
        successModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === successModal) {
            successModal.style.display = "none";
        }
    });
});
