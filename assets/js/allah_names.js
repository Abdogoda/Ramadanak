function getAllahNames() {
 fetch("assets/data/allah_names.json")
  .then((response) => response.json())
  .then((data) => {
   data.forEach((element) => {
    document.querySelector(".allah-names-page-container").innerHTML += `
    <div class="wrapper" style="margin-bottom:1rem;padding-top:3rem">
    <div class="box">
     <div class="name">${element.name}</div>
     <div class="meaning">${element.text}</div>
    </div>
   </div>
    `;
   });
  })
  .catch((error) => {
   console.error("Error fetching data:", error);
  });
}
getAllahNames();
