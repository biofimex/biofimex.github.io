function startSlider() {
  var slider = document.querySelector('.slider');
  var images = slider.getElementsByTagName('img');
  var currentImage = 0;

  setInterval(function() {
    images[currentImage].style.display = 'none';
    currentImage = (currentImage + 1) % images.length;
    images[currentImage].style.display = 'block';
  }, 4000);
}

startSlider();
