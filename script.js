// ===== LIGHTBOX FUNCTIONALITY =====

// Array of image URLs (matches the order in HTML)
const images = [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
    'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800'
];

// Keep track of current image index
let currentImageIndex = 0;

/**
 * Opens the lightbox and displays the selected image
 * @param {number} index - Index of the image in the images array
 */
function openLightbox(index) {
    // Get lightbox element
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Set current index
    currentImageIndex = index;
    
    // Set image source
    lightboxImg.src = images[index];
    
    // Show lightbox by adding 'active' class
    lightbox.classList.add('active');
    
    // Prevent body from scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Hide lightbox
    lightbox.classList.remove('active');
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

/**
 * Navigate to next/previous image in lightbox
 * @param {number} direction - 1 for next, -1 for previous
 */
function changeImage(direction) {
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Calculate new index (with wrap-around)
    currentImageIndex += direction;
    
    // Wrap to beginning if we go past the end
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    // Wrap to end if we go before the beginning
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    // Update image source
    lightboxImg.src = images[currentImageIndex];
}

// ===== KEYBOARD NAVIGATION =====
// Close lightbox with Escape key, navigate with arrow keys
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    
    // Only respond if lightbox is open
    if (lightbox.classList.contains('active')) {
        // Escape key closes lightbox
        if (event.key === 'Escape') {
            closeLightbox();
        }
        // Left arrow - previous image
        else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        }
        // Right arrow - next image
        else if (event.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Get the href attribute (e.g., "#gallery")
        const targetId = this.getAttribute('href');
        
        // Only apply to anchor links
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            // Find the target section
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== CLOSE LIGHTBOX WHEN CLICKING OUTSIDE IMAGE =====
document.getElementById('lightbox').addEventListener('click', function(e) {
    // Only close if clicking the background, not the image or buttons
    if (e.target === this) {
        closeLightbox();
    }
});
