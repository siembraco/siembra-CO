function domReady(fn) {
  // If we're early to the party
  
  document.addEventListener("DOMContentLoaded", fn);

  // If late; I mean on time.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    console.log("load");
    fn();
    setTimeout(() => {
      document.querySelector("html").classList.add("preload");
    }, 400);
  }
}

