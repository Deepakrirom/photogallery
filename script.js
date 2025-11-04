    const gallery = document.getElementById('gallery');
    const photoInput = document.getElementById('photoInput');
    const clearBtn = document.getElementById('clearBtn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('closeBtn');

    // Load from localStorage
    let photos = JSON.parse(localStorage.getItem('phoneGallery')) || [];

    // Render saved gallery
    function renderGallery() {
      gallery.innerHTML = '';
      photos.forEach(src => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.innerHTML = `<img src="${src}" alt="">`;
        gallery.appendChild(div);
        attachLightbox(div.querySelector('img'));
      });
    }

    renderGallery();

    // Upload from phone
    photoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          photos.push(base64);
          localStorage.setItem('phoneGallery', JSON.stringify(photos));
          renderGallery();
        };
        reader.readAsDataURL(file);
      }
    });

    // Clear all saved photos
    clearBtn.addEventListener('click', () => {
      if (confirm('Delete all saved photos?')) {
        photos = [];
        localStorage.removeItem('phoneGallery');
        renderGallery();
      }
    });

    // Lightbox
    function attachLightbox(img) {
      img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
      });
    }

    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) lightbox.classList.remove('active');
    });
