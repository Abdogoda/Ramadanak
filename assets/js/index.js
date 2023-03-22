setTimeout(() => {
 document.querySelector(".preloader").style.animation = "fadeOut 0.5s ease";
}, 4000);
setTimeout(() => {
 document
  .querySelector(".preloader")
  .parentNode.removeChild(document.querySelector(".preloader"));
}, 4500);
// // ============ zekr quote ====================
let zekrquoteWrapper = document.querySelector(".zekr-quote .wrapper");
let zekrquoteText = document.querySelector(".zekr-quote .quote");
let zekrquoteBtn = document.querySelector(".zekr-quote .next-quote");
let zekrcopyBtn = document.querySelector(".zekr-quote .copy");
let zekrwhatsappBtn = document.querySelector(".zekr-quote .whatsapp");
function randomzekrQoute() {
 fetch("assets/data/azkar.json")
  .then((response) => response.json())
  .then((data) => {
   let randomElement = Math.floor(Math.random() * data.length);
   zekrquoteText.innerHTML = data[randomElement].zekr;
   let randomOverlay = Math.floor(Math.random() * overlays.length);
   zekrquoteWrapper.style.backgroundImage = `url(${overlays[randomOverlay]})`;
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}
randomzekrQoute();
zekrquoteBtn.addEventListener("click", randomzekrQoute);
//copy the qoute
zekrcopyBtn.addEventListener("click", () => {
 navigator.clipboard.writeText(zekrquoteText.textContent);
});
//share the qoute
zekrwhatsappBtn.addEventListener("click", () => {
 let messageText = encodeURIComponent(`"${zekrquoteText.textContent}"`);
 let url = `https://wa.me/?text=${messageText}`;
 window.open(url, "_blank");
});

// ============ ayya quote ====================
let ayyaquoteWrapper = document.querySelector(".ayya-quote .wrapper");
let ayyaquoteText = document.querySelector(".ayya-quote .quote");
let ayyasouraText = document.querySelector(".ayya-quote .soura");
let ayyaquoteBtn = document.querySelector(".ayya-quote .next-quote");
let ayyasoundBtn = document.querySelector(".ayya-quote .sound");
let ayyaAudioBtn = document.querySelector(".ayya-quote #myAudio");
let ayyacopyBtn = document.querySelector(".ayya-quote .copy");
let ayyawhatsappBtn = document.querySelector(".ayya-quote .whatsapp");
function randomAyyaQoute() {
 fetch("assets/data/ayat.json")
  .then((response) => response.json())
  .then((data) => {
   let randomElement = Math.floor(Math.random() * data.length);
   ayyaquoteText.innerHTML = data[randomElement].ayya;
   ayyasouraText.innerHTML = `${data[randomElement].soura} <span>(${data[randomElement].number})</span>`;
   ayyaAudioBtn.src = data[randomElement].audio;
   let randomOverlay = Math.floor(Math.random() * overlays.length);
   ayyaquoteWrapper.style.backgroundImage = `url(${overlays[randomOverlay]})`;
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}
randomAyyaQoute();
ayyaquoteBtn.addEventListener("click", randomAyyaQoute);
//speake the quote
ayyasoundBtn.addEventListener("click", () => {
 var audio = new Audio(ayyaAudioBtn.src);
 audio.play();
 ayyasoundBtn.classList.add("hide");
 document.querySelector(".ayya-quote .sound-off").classList.remove("hide");
 audio.addEventListener("ended", function () {
  ayyasoundBtn.classList.remove("hide");
  document.querySelector(".ayya-quote .sound-off").classList.add("hide");
 });
 document
  .querySelector(".ayya-quote .sound-off")
  .addEventListener("click", () => {
   audio.pause();
   ayyasoundBtn.classList.remove("hide");
   document.querySelector(".ayya-quote .sound-off").classList.add("hide");
  });
});
//copy the qoute
ayyacopyBtn.addEventListener("click", () => {
 navigator.clipboard.writeText(ayyaquoteText.textContent);
});
//share the qoute
ayyawhatsappBtn.addEventListener("click", () => {
 let messageText = encodeURIComponent(`"${ayyaquoteText.textContent}"`);
 let url = `https://wa.me/?text=${messageText}`;
 window.open(url, "_blank");
});
// ============ allah-name quote ====================
let allahName = document.querySelector(".allah-names-container .name");
let allahNameMeaningText = document.querySelector(
 ".allah-names-container .meaning"
);
function randomAllahName() {
 fetch("assets/data/allah_names.json")
  .then((response) => response.json())
  .then((data) => {
   let randomElement = Math.floor(Math.random() * data.length);
   allahName.innerHTML = data[randomElement].name;
   allahNameMeaningText.innerHTML = data[randomElement].text;
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}
randomAllahName();

// ============  ====================
let azkarBoxs = document.querySelectorAll(".azkar-con .number");
azkarBoxs.forEach((azkarBox) => {
 if (!window.localStorage.getItem(azkarBox.dataset.zekr)) {
  window.localStorage.setItem(azkarBox.dataset.zekr, 0);
 }
 azkarBox.addEventListener("click", () => {
  let azkarBozValue = azkarBox.textContent;
  let azkarBoxData = window.localStorage.getItem(azkarBox.dataset.zekr);
  if (azkarBozValue > 0) {
   azkarBozValue--;
   azkarBoxData++;
   window.localStorage.setItem(azkarBox.dataset.zekr, azkarBoxData);
   azkarBox.textContent = azkarBozValue;
   if (azkarBozValue == 0) {
    azkarBox.textContent = 33;
    azkarBoxParent = azkarBox.parentElement;
    azkarBoxParent.innerHTML += `<lottie-player
      src="https://assets6.lottiefiles.com/packages/lf20_fJ7CVd.json"
      background="transparent"
      speed="1"
      class="video"
      autoplay
     ></lottie-player>`;
    setTimeout(() => {
     azkarBoxParent.removeChild(azkarBoxParent.lastElementChild);
    }, 1500);
   }
  }
 });
});
document.querySelector(".azkar-con .reset").addEventListener("click", () => {
 azkarBoxs.forEach((azkarBox) => {
  azkarBox.textContent = 33;
 });
});
