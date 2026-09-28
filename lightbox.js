/* ============================================
   Lightbox — click-to-expand for project images
   Include once per page; works on any <img> or <video>
   inside a .project-section element.
   Supports left/right arrow navigation.
   ============================================ */

(function () {
    /* --- Collect all project images --- */
    var images = Array.from(document.querySelectorAll('.project-section img, .project-section video'));
    var currentIndex = -1;

    /* --- Build overlay DOM --- */
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    /* --- Navigation arrows --- */
    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-arrow lightbox-arrow--prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '&#8249;';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-arrow lightbox-arrow--next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '&#8250;';

    var img = document.createElement('img');
    img.className = 'lightbox-img';

    /* Videos open in their own element: same autoplay/loop/muted behavior, plus controls */
    var vid = document.createElement('video');
    vid.className = 'lightbox-img';
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.controls = true;

    overlay.appendChild(img);
    overlay.appendChild(vid);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);

    document.body.appendChild(overlay);

    /* --- Open --- */
    function open(index) {
        currentIndex = index;
        var item = images[index];
        if (item.tagName === 'VIDEO') {
            img.style.display = 'none';
            img.removeAttribute('src');
            vid.style.display = '';
            vid.src = item.currentSrc || item.src;
            vid.poster = item.poster || '';
            vid.setAttribute('aria-label', item.getAttribute('aria-label') || '');
            vid.currentTime = item.currentTime || 0;
            vid.play().catch(function () {});
        } else {
            vid.pause();
            vid.style.display = 'none';
            vid.removeAttribute('src');
            img.style.display = '';
            img.src = item.src;
            img.alt = item.alt || '';
        }
        overlay.classList.add('lightbox-overlay--visible');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        updateArrows();
    }

    /* --- Close --- */
    function close() {
        vid.pause();
        overlay.classList.remove('lightbox-overlay--visible');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentIndex = -1;
    }

    /* --- Navigate --- */
    function navigate(direction) {
        var next = currentIndex + direction;
        if (next >= 0 && next < images.length) {
            open(next);
        }
    }

    /* --- Show/hide arrows based on position --- */
    function updateArrows() {
        prevBtn.style.visibility = currentIndex > 0 ? '' : 'hidden';
        nextBtn.style.visibility = currentIndex < images.length - 1 ? '' : 'hidden';
    }

    /* Arrow clicks — stop propagation so overlay click-to-close doesn't fire */
    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigate(-1);
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigate(1);
    });

    /* Click on image should not close */
    img.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    vid.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    /* Click on overlay background to close */
    overlay.addEventListener('click', close);

    /* Keyboard navigation */
    document.addEventListener('keydown', function (e) {
        if (currentIndex === -1) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    /* --- Attach to project images --- */
    images.forEach(function (image, i) {
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', function () {
            open(i);
        });
    });
})();
