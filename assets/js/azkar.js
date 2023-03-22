let azkarContainer = document.querySelector(".azkar-container");
let azkarList = document.querySelectorAll(".azkar-list li");
azkarList.forEach((azkarBtn) => {
 azkarBtn.onclick = function () {
  document.querySelector(".azkar-list li.active").classList.remove("active");
  azkarBtn.classList.add("active");
  if (azkarBtn.dataset.azkargategory == "azkark") {
   fetchAzkark();
  } else {
   fetchAzkar(azkarBtn);
  }
 };
});
fetchAzkar(document.querySelector(".azkar-list li.mokhtara"));
function fetchAzkar(azkarBtn) {
 const classesToRemove = ["alsabah", "almasaa", "alsalah", "mokhtara"];
 classesToRemove.forEach((className) => {
  azkarContainer.classList.remove(className);
 });
 azkarContainer.innerHTML = "";
 let azkarCategory = azkarBtn.dataset.azkargategory;
 fetch("assets/data/azkar.json")
  .then((response) => response.json())
  .then((data) => {
   let filterdAzkar = data
    .filter(function (zekr) {
     if (azkarCategory == "مختارة") {
      return (
       zekr.category != " أذكار الصباح" ||
       zekr.category != " أذكار المساء" ||
       zekr.category != "الأذكار بعد السلام من الصلاة"
      );
     } else {
      return zekr.category == azkarCategory;
     }
    })
    .slice(0, 31);
   azkarContainer.classList.add(azkarBtn.dataset.class);
   filterdAzkar.forEach((element, index) => {
    azkarContainer.innerHTML += `
      <div class="box">
      <span class="zekr-number">${index + 1}</span>
      <p class="zekr-text">${element.zekr} </p>
      <p class="zekr-description">${element.description}</p>
      <span class="zekr-count">${element.count ? element.count : 1}</span>
     </div>
    `;
   });
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}
function fetchAzkark() {
 zekr1 = parseInt(window.localStorage.getItem("سبحان اللة"));
 zekr2 = parseInt(window.localStorage.getItem("الحمد للة"));
 zekr3 = parseInt(window.localStorage.getItem("اللة اكبر"));
 totalZekr = zekr1 + zekr2 + zekr3;
 if (totalZekr == 0) {
  zekr1Percent = 0;
  zekr2Percent = 0;
  zekr3Percent = 0;
 } else {
  zekr1Percent = ((zekr1 / totalZekr) * 100).toFixed(0);
  zekr2Percent = ((zekr2 / totalZekr) * 100).toFixed(0);
  zekr3Percent = ((zekr3 / totalZekr) * 100).toFixed(0);
 }
 console.log(zekr1Percent);
 azkarContainer.innerHTML = `
 <h1 class="card-heading">مجموع أذكارك  <span>(${totalZekr})</span> </h1>  
 <div class="card-container">
  <div class="card">
    <div class="progress" style="--num:${zekr1Percent};">
    <svg>
    <circle cx="70" cy="70" r="70"></circle>
    <circle cx="70" cy="70" r="70"></circle>
   </svg>
     <span class="count">${zekr1Percent}%</span>
     </div>
     <div class="zekr">سبحان اللة</div>
  </div>
  <div class="card">
  <div class="progress" style="--num:${zekr2Percent};">
  <svg>
  <circle cx="70" cy="70" r="70"></circle>
  <circle cx="70" cy="70" r="70"></circle>
 </svg>
   <span class="count">${zekr2Percent}%</span>
   </div>
   <div class="zekr">الحمد للة</div>
</div>
<div class="card">
<div class="progress" style="--num:${zekr3Percent};">
<svg>
<circle cx="70" cy="70" r="70"></circle>
<circle cx="70" cy="70" r="70"></circle>
</svg>
 <span class="count">${zekr3Percent}%</span>
 </div>
 <div class="zekr">اللة اكبر</div>
</div>
 </div>
  <a href="index.html#azkarSection" class="azkar-btn">قم بالتسبيح الان</a>
 `;
}
