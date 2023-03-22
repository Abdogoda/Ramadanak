//

//======== array of overlay images ==========
const overlays = [
 "assets/img/overlay/over2.jpg",
 "assets/img/overlay/over4.jpg",
 "assets/img/overlay/over5.jpg",
 "assets/img/overlay/over6.jpg",
 "assets/img/overlay/over7.jpg",
 "assets/img/overlay/over11.jpg",
 "assets/img/overlay/over12.jpg",
 "assets/img/overlay/over13.jpg",
 "assets/img/overlay/over14.jpg",
 "assets/img/overlay/over16.jpg",
 "assets/img/overlay/over16.jpg",
 "assets/img/overlay/over18.jpg",
 "assets/img/overlay/over21.jpg",
 "assets/img/overlay/over22.jpg",
];

//========== nav toggler =============
let ulLinks = document.querySelector("ul.links");
let ulLinksToggler = document.querySelector(".nav-toggler");
ulLinksToggler.addEventListener("click", () => {
 ulLinksToggler.querySelector("i").classList.toggle("fa-close");
 ulLinksToggler.classList.toggle("active");
 ulLinks.classList.toggle("active");
});
