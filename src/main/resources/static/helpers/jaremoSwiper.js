export function SwiperJaremo(){

    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      autoplay: {
        delay: 1500,
        disableOnInteraction: false
      },
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: true },
        
      loop: true});
  }