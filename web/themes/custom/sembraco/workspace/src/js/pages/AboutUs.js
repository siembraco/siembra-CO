import Gallery from "../component/Gallery";

export default function AboutUs() {
  let $elemStep = document.querySelector(".step-by-step .field-content");
  Gallery($elemStep);

  let $elemfarmers = document.querySelector(
    ".view-block-farmers .view-content"
  );
  Gallery($elemfarmers);

  let $elemBenefits = document.querySelector(".benefits .field-content");
  Gallery($elemBenefits);
}
