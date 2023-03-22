let songsBox = document.querySelector(".songs-box");
function fetchSongs() {
 fetch("assets/data/songs.json")
  .then((res) => res.json())
  .then((data) => {
   data.forEach((element) => {
    songsBox.innerHTML += `
      <div>
       <input type="radio" name="song" id="song${element.id}" value="${element.id}" />
       <i class="fa fa-volume-up" onclick="speakSong(this)"></i>
       <i class="fa fa-volume-xmark hide"></i>
       <label for="song${element.id}">
        <audio src=${element.src}></audio>
        <span>${element.text}</span>
       </label>
      </div>
    `;
   });
  });
}
fetchSongs();

const form = document.getElementById("sendgift");
form.addEventListener("submit", (e) => {
 e.preventDefault();
 const name = form["name"];
 const message = form["message"];
 const song = form["song"];
 if (name.value == "" || !name.value) {
  name.setAttribute("placeholder", "من فضلك أدخل اسم المرسل اليه");
  document.getElementById("name").classList.add("error");
 } else {
  window.location.href = ` viewGift.html?${name.value}-${song.value}`;
 }
});
// play the song
function speakSong(songPlayer) {
 var songOff = songPlayer.parentElement.querySelector("i.fa-volume-xmark");
 let song = songPlayer.parentElement.querySelector("audio").src;
 var audio = new Audio(song);
 songPlayer.addEventListener("click", () => {
  audio.play();
  songPlayer.classList.add("hide");
  songOff.classList.remove("hide");
  audio.addEventListener("ended", function () {
   songPlayer.classList.remove("hide");
   songOff.classList.add("hide");
  });
 });
 songOff.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  songPlayer.classList.remove("hide");
  songOff.classList.add("hide");
 });
}
