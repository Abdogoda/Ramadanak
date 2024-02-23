const queryString = window.location.search;
const urlParams = queryString.slice(1).split("-");
var name = urlParams[0];
var message = urlParams[1];
var song = urlParams[2];
if (song == "") {
 song = "1";
}
if (message == "") {
 message = "رمضانك كريم";
}

// start btn
document.querySelector(".overall button").addEventListener("click", () => {
 document.querySelector(".overall").style.display = "none";
 document.body.innerHTML += `<div class="preloader"><lottie-player
   src="https://assets1.lottiefiles.com/private_files/lf30_013r2q.json"
   background="transparent"
   speed="1.5"
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
 }, 1000);
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
   document.querySelector(".default-message").textContent = decodeURI(message);
  });
 // share
 document.querySelector(".share").addEventListener("click", () => {
  var uri = `${window.location.origin}${window.location.pathname}?${encodeURI(name)}-${encodeURI(message)}-${song}`;
  let url = `https://wa.me/?text=${uri}`;
  window.open(url, "_blank");
 });
}
