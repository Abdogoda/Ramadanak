// Get day names in Arabic
const arabicDays = ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'];

// Function to generate calendar using API data
async function generateCalendar() {
  try {
    // Get current date to determine which Ramadan to show
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayFormatted = `${dd}-${mm}-${yyyy}`;
    
    // Fetch current Hijri date
    const todayResponse = await fetch(`https://api.aladhan.com/v1/gToH/${todayFormatted}`);
    const todayData = await todayResponse.json();
    
    if (todayData.code !== 200) {
      throw new Error('Failed to fetch current Hijri date');
    }
    
    const currentHijri = todayData.data.hijri;
    
    // Determine Ramadan year
    let ramadanYear = parseInt(currentHijri.year);
    const currentMonth = parseInt(currentHijri.month.number);
    if (currentMonth > 9) {
      ramadanYear++;
    }
    
    // Convert Ramadan 1st to Gregorian to get start date
    const ramadanStartResponse = await fetch(`https://api.aladhan.com/v1/hToG/01-09-${ramadanYear}`);
    const ramadanStartData = await ramadanStartResponse.json();
    
    if (ramadanStartData.code !== 200) {
      throw new Error('Failed to fetch Ramadan start date');
    }
    
    // Parse the Gregorian date properly
    const gregorianDate = ramadanStartData.data.gregorian;
    const startDate = new Date(`${gregorianDate.year}-${gregorianDate.month.number.toString().padStart(2, '0')}-${gregorianDate.day.toString().padStart(2, '0')}`);
    
    // Fetch Ramadan 30th to check if it exists (29 or 30 days)
    const ramadan30Response = await fetch(`https://api.aladhan.com/v1/hToG/30-09-${ramadanYear}`);
    const ramadan30Data = await ramadan30Response.json();
    const ramadanLength = ramadan30Data.code === 200 && ramadan30Data.data.hijri.month.number === 9 ? 30 : 29;
    
    // Generate calendar days
    const ramadanDays = [];
    for (let day = 0; day < ramadanLength; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);
      
      ramadanDays.push({
        hijriDay: day + 1,
        gregorianDay: currentDate.getDate(),
        gregorianDate: currentDate,
        dayOfWeek: currentDate.getDay()
      });
    }
    
    const firstDayOfWeek = ramadanDays[0].dayOfWeek;
    
    // Update title
    document.querySelector('.pre-calendar h1').textContent = `رمضان ${ramadanYear}`;
    
    // Generate calendar
    const calendarBody = document.querySelector('.calendar-body');
    calendarBody.innerHTML = '<div class="week-col" dir="ltr"></div>';
    const weekCol = calendarBody.querySelector('.week-col');
    
    // Add empty cells before Ramadan starts
    const daysBeforeRamadan = (6 - firstDayOfWeek + 7) % 7;
    for (let i = 0; i < daysBeforeRamadan; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.innerHTML = '<p><span></span><small></small></p>';
      weekCol.appendChild(emptyDiv);
    }
    
    // Add Ramadan days
    ramadanDays.forEach((dayData) => {
      const dayDiv = document.createElement('div');
      const specialClass = dayData.hijriDay === 27 ? ' class="special"' : '';
      dayDiv.innerHTML = `<p${specialClass}><span>${dayData.gregorianDay}</span> <small>${dayData.hijriDay}</small></p>`;
      weekCol.appendChild(dayDiv);
    });
    
    // Fill remaining cells
    const totalCells = weekCol.children.length;
    const remainingCells = Math.ceil(totalCells / 7) * 7 - totalCells;
    for (let i = 0; i < remainingCells; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.innerHTML = '<p><span></span><small></small></p>';
      weekCol.appendChild(emptyDiv);
    }
    
    // Update Laylat al-Qadr info (27th of Ramadan)
    const laylatAlQadrData = ramadanDays[26]; // Index 26 = 27th day
    if (laylatAlQadrData) {
      const laylatAlQadrDay = arabicDays[laylatAlQadrData.dayOfWeek];
      const laylatAlQadrGregorianDay = laylatAlQadrData.gregorianDay;
      
      document.querySelector('.calendar-special .day p').textContent = laylatAlQadrDay;
      document.querySelector('.calendar-special .day span').textContent = laylatAlQadrGregorianDay;
      document.querySelector('.calendar-special .speciality p').textContent = `27 رمضان ${ramadanYear}`;
    }
    
    // Highlight today if we're in Ramadan
    if (currentMonth === 9 && parseInt(currentHijri.year) === ramadanYear) {
      const days = document.querySelectorAll(".calendar-body .week-col p");
      days.forEach((day) => {
        const hijriDay = parseInt(day.querySelector('small')?.textContent);
        if (hijriDay === parseInt(currentHijri.day)) {
          day.classList.add("active");
        }
      });
    }
    
  } catch (error) {
    console.error('Error generating calendar:', error);
    document.querySelector('.pre-calendar h1').textContent = 'خطأ في تحميل التقويم';
  }
}

// Initialize calendar
generateCalendar();
