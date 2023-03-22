let date = new Date();
let today = date.getDate();
let days = document.querySelectorAll(".calendar-body .week-col p");
days.forEach((day) => {
 if (parseInt(day.lastChild.textContent) == today) {
  day.classList.add("active");
 }
});
