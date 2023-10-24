function generateCalendar(year, month) {
  const calendarBody = document.getElementById("calendar-body");
  const monthYear = document.getElementById("month-year");

  const currentDate = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  monthYear.textContent = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(currentDate);

  while (calendarBody.firstChild) {
    calendarBody.removeChild(calendarBody.firstChild);
  }

  let day = new Date(currentDate);
  day.setDate(1);

  const firstDayOfWeek = day.getDay();
  const daysInMonth = lastDay.getDate();

  let newRow = document.createElement("tr");
  for (let i = 0; i < firstDayOfWeek; i++) {
    newRow.appendChild(document.createElement("td"));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    if (newRow.children.length === 7) {
      calendarBody.appendChild(newRow);
      newRow = document.createElement("tr");
    }
    const cell = document.createElement("td");
    cell.textContent = i;
    newRow.appendChild(cell);
  }

  if (newRow.children.length > 0) {
    calendarBody.appendChild(newRow);
  }
}

function prevMonth() {
  const currentDate = new Date(
    document.getElementById("month-year").textContent
  );
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function nextMonth() {
  const currentDate = new Date(
    document.getElementById("month-year").textContent
  );
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

generateCalendar(2023, 9); // Specify the initial year and month (2023, 9 for October 2023)

// Add a click event handler for the calendar container
// Add a click event handler for the calendar container
document
  .getElementById("calendar-body")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "TD") {
      // Toggle the 'selected-date' class on the clicked date cell
      event.target.classList.toggle("selected-date");
    }
  });
