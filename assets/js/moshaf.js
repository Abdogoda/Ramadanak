let selectSouraBox = document.getElementById("select-soura-box");
//======show all quran chapters in select box
function fetchSouraName() {
 fetch("assets/data/quran_chapters.json")
  .then((response) => response.json())
  .then((data) => {
   data.forEach((element) => {
    selectSouraBox.innerHTML += `
   <option value="${element.id}">${element.name}</option>
   `;
   });
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}
fetchSouraName();

//======get the chapter when click
selectSouraBox.addEventListener("change", (e) => {
 if (e.target.value != 0) {
  fetchSoura(e.target.value);
 }
});

//======get the soura details
function fetchSouraDetails(id) {
 fetch("assets/data/quran_chapters.json")
  .then((response) => response.json())
  .then((data) => {
   const element = data.find((s) => s.id == id);
   let souraDetails = document.querySelector(".select-soura .soura");
   souraDetails.querySelector("span").innerHTML = element.name;
   souraDetails.querySelector("p").innerHTML = `(${element.total_verses})`;
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}

//======get the soura ayyat
let souraWrapper = document.querySelector(".soura-wrapper");
function fetchSoura(id) {
 selectSouraBox.selectedIndex = id;
 window.localStorage.setItem("souraId", id);
 fetchSouraDetails(id);
 souraWrapper.innerHTML = "";
 fetch("assets/data/quran.json")
  .then((response) => response.json())
  .then((data) => {
   data[id].forEach((ayya) => {
    souraWrapper.innerHTML += `
     <div class="ayya-text ayya-${id}-${ayya.verse}" onclick="addBookmark(this,${id},${ayya.verse})">${ayya.text}<span>${ayya.verse}</span></div>
     `;
   });
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}
fetchSoura(1);

// next soura
document.querySelector(".next-soura").addEventListener("click", () => {
 let storedId = parseInt(window.localStorage.getItem("souraId"));
 var nextId = 1;
 if (storedId != 114) {
  nextId = storedId + 1;
 }

 fetchSoura(nextId);
});

// add bookmark
function addBookmark(e, id, verse) {
 document.querySelectorAll(".ayya-text .fa-bookmark").forEach((x) => {
  x.parentNode.removeChild(x);
 });
 e.innerHTML += `<i class="fa fa-bookmark"></i>`;
 window.localStorage.setItem("BookmarkedSoura", id);
 window.localStorage.setItem("BookmarkedAyya", verse);
}

//goBookmark
function goBookmark(e) {
 let BookmarkedSoura = window.localStorage.getItem("BookmarkedSoura");
 let BookmarkedAyya = window.localStorage.getItem("BookmarkedAyya");
 if (BookmarkedSoura && BookmarkedAyya) {
  fetchSoura(BookmarkedSoura);
  e.querySelector(".bookmark-number").innerHTML = BookmarkedAyya;
 }
}
