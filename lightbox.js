/* ============================================
   Lightbox — click-to-expand for project images
   Include once per page; works on any <img> inside
   a .project-section element.
   ============================================ */

(function () {
    /* --- Build overlay DOM --- */
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.className = 'lightbox-img';
    overlay.appendChild(img);

    document.body.appendChild(overlay);

    /* --- Open --- */
    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        overlay.classList.add('lightbox-overlay--visible');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    /* --- Close --- */
    function close() {
        overlay.classList.remove('lightbox-overlay--visible');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* Click anywhere on overlay (background or image) to close */
    overlay.addEventListener('click', close);

    /* Escape key to close */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });

    /* --- Attach to project images --- */
    document.querySelectorAll('.project-section img').forEach(function (image) {
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', function () {
            open(image.src, image.alt);
        });
    });
})();
