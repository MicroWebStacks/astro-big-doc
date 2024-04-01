async function initPhotoSwipe() {
  // Dynamically import the PhotoSwipeLightbox module and CSS
  const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox');
  await import('photoswipe/style.css');

  // Initialize PhotoSwipeLightbox
  const lightbox = new PhotoSwipeLightbox({
      gallery: '#my-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe') // This remains the same, dynamically importing the main module
  });

  // Initiate the lightbox
  lightbox.init();
}

// Call initPhotoSwipe on page load
if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', initPhotoSwipe);
} else {  // `DOMContentLoaded` has already fired
  initPhotoSwipe();
}
