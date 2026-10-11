/* ==========================================
   lightbox.js
   Click any image or video in a
   .case-study-section to open it full screen.
   Arrow keys and buttons step through them.
   ========================================== */

(function () {
    /* --- Setup --- */

    var images = Array.from(document.querySelectorAll('.case-study-section img, .case-study-section video'));
    var currentIndex = -1;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');

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

    // Videos get their own element so they keep looping, muted, with controls
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

    /* --- Open, Close, Navigate --- */

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

    function close() {
        vid.pause();
        overlay.classList.remove('lightbox-overlay--visible');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentIndex = -1;
    }

    function navigate(direction) {
        var next = currentIndex + direction;
        if (next >= 0 && next < images.length) {
            open(next);
        }
    }

    function updateArrows() {
        prevBtn.style.visibility = currentIndex > 0 ? '' : 'hidden';
        nextBtn.style.visibility = currentIndex < images.length - 1 ? '' : 'hidden';
    }

    /* --- Events --- */

    // Stop propagation so the overlay's click-to-close doesn't also fire
    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigate(-1);
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigate(1);
    });

    img.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    vid.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
        if (currentIndex === -1) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    images.forEach(function (image, i) {
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', function () {
            open(i);
        });
    });
})();
