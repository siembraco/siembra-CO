const mQ = window.matchMedia("(min-width: 992px)");
const headerCollection = document.querySelector("#header");
const collapsingNavbar = document.querySelector("#CollapsingNavbar");

if (mQ && headerCollection) {
  collapsingNavbar.classList.remove("justify-content-end");
  let navbarMain = document.querySelector("#navbar-main");
  let cloneNavbarMain = navbarMain.cloneNode(true);

  cloneNavbarMain.id = "navbar-main-first";
  cloneNavbarMain.classList = "navbar navbar-first fixed-top navbar-expand-lg";
  navbarMain.after(cloneNavbarMain);

  const navbarMainCollHide = document.querySelector(
    "#navbar-main .navbar-brand"
  );
  const navbarMainColl = document.querySelector(
    "#navbar-main-first .navbar-brand"
  );
  const navbarActive = document.querySelector("#navbar-main-first");
  const navbarInactive = document.querySelector("#navbar-main");

  navbarMainColl.addEventListener("click", function (event) {
    event.preventDefault();
    navbarInactive.classList.toggle("show");
    navbarActive.classList.toggle("navbar-default");
  });

  navbarMainCollHide.addEventListener("click", function (event) {
    event.preventDefault();
    navbarInactive.classList.remove("show");
    navbarActive.classList.remove("navbar-default");
  });
  /**
     * Hover in the menu 
     *
     * Animation Menu
     */
  let NavbarFirst = document.querySelector(".navbar-first");
  let mainContent = document.querySelector(".main-content");
  let highlighted = document.querySelector(".highlighted");


  console.log(NavbarFirst);
  NavbarFirst.addEventListener("mouseenter", function (e) {
    navbarInactive.classList.add("show");
    navbarActive.classList.add("navbar-default");
  })
  mainContent.addEventListener("mouseover", function (e) {
    navbarInactive.classList.remove("show");
    navbarActive.classList.remove("navbar-default");
  })
  if (highlighted) {
    highlighted.addEventListener("mouseover", function (e) {
      navbarInactive.classList.remove("show");
      navbarActive.classList.remove("navbar-default");
    })
  }

}
