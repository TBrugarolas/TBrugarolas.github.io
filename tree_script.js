document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalLink = document.getElementById("modalLink");
    const closeBtn = document.querySelector(".close");

    const buttons = document.querySelectorAll(".openModalBtn");

    let isDragging = false;

    buttons.forEach(button => {
        let offsetX = 0;
        let offsetY = 0;

        /* ===============================
           CLICK → OPEN MODAL
        =============================== */
        button.addEventListener("click", (e) => {
            if (isDragging) return;

            modalTitle.textContent = button.dataset.title;
            modalBody.textContent = button.dataset.content;
            modalLink.href = button.dataset.link;

            modal.style.display = "flex";
        });

        /* ===============================
           DRAG LOGIC
        =============================== */
        button.addEventListener("mousedown", (e) => {
            isDragging = false;

            const rect = button.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            const parent = button.offsetParent;
            const parentRect = parent.getBoundingClientRect();

            const onMouseMove = (e) => {
                isDragging = true;

                const x =
                    ((e.clientX - parentRect.left - offsetX) / parentRect.width) * 100;
                const y =
                    ((e.clientY - parentRect.top - offsetY) / parentRect.height) * 100;

                button.style.left = `${x}%`;
                button.style.top = `${y}%`;
            };

            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);

                // prevent click firing immediately after drag
                setTimeout(() => {
                    isDragging = false;
                }, 0);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });

    /* ===============================
       MODAL CLOSE HANDLERS
    =============================== */
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
