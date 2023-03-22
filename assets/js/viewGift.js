const queryString = window.location.search;
const urlParams = queryString.slice(1).split("-");
var name = urlParams[0];
var song = urlParams[1];
if (song == "") {
 song = "1";
}
function getData() {
 fetch("assets/data/songs.json")
  .then((res) => res.json())
  .then((data) => {
   var fetchedData = data.find((s) => s.id == song);
   var audio = new Audio(fetchedData.src);
   audio.play();
   document.querySelector(".name").textContent = decodeURI(name);
  });
}
setTimeout(() => {
 getData();
}, 4500);

// share
document.querySelector(".share").addEventListener("click", () => {
 var uri = `${window.location.origin}${window.location.pathname}?${encodeURI(
  name
 )}-${song}`;
 let url = `https://wa.me/?text=${uri}`;
 window.open(url, "_blank");
});
