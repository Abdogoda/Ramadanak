const queryString = window.location.search;
const urlParams = queryString.slice(1).split("-");
var name = urlParams[0];
var song = urlParams[1];
if (song == "") {
 song = "1";
}

// start btn
document.querySelector(".overall button").addEventListener("click", () => {
 document.querySelector(".overall").style.display = "none";
 document.body.innerHTML += `<div class="preloader"><lottie-player
   src="https://assets1.lottiefiles.com/private_files/lf30_013r2q.json"
   background="transparent"
   speed="1.2"
   autoplay
  ></lottie-player></div>`;
 setTimeout(() => {
  document.querySelector(".preloader").style.animation = "fadeOut 0.5s ease";
 }, 3000);
 setTimeout(() => {
  document.body.removeChild(document.querySelector(".preloader"));
 }, 3500);
 setTimeout(() => {
  getData();
 }, 1500);
});

//start
function getData() {
 fetch("assets/data/songs.json")
  .then((res) => res.json())
  .then((data) => {
   var fetchedData = data.find((s) => s.id == song);
   var audio = new Audio(fetchedData.src);
   audio.play();
   document.querySelector(".name").textContent = decodeURI(name);
  });
 // share
 document.querySelector(".share").addEventListener("click", () => {
  var uri = `${window.location.origin}${window.location.pathname}?${encodeURI(
   name
  )}-${song}`;
  let url = `https://wa.me/?text=${uri}`;
  window.open(url, "_blank");
 });
}
