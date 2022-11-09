import Flickity from "flickity";

export default function Gallery($selector) {
  const flickity = new Flickity($selector, {
    cellAlign: "left",
    wrapAround: true,
    lazyLoad: true,
    contain: true,
    pageDots: false,
    adaptiveHeight: true,
    imagesLoaded: true,
  });
}
