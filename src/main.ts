const ELEMENTS = {
  DAY_SELECT: "#day-select",
  MONTH_SELECT: "#month-select",
  YEAR_SELECT: "#year-select",
  BIRTHDAY_FORM: "birthday-form",
  DATE_OUTPUT: ".date-output",
  DATE_OUTPUT_WRAPPER: ".date-output-wrapper",
};

const daySelect = document.querySelector(ELEMENTS.DAY_SELECT);
const yearSelect = document.querySelector(ELEMENTS.YEAR_SELECT);

for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");

  option.value = `${i}`;
  option.textContent = `${i}`.padStart(2, "0");
  daySelect?.appendChild(option);
}

// CSS.supports("appearance: base-select");

for (let i = new Date().getFullYear(); i >= new Date(0).getFullYear(); i--) {
  const option = document.createElement("option");

  option.value = `${i}`;
  option.textContent = `${i}`.padStart(2, "0");
  yearSelect?.appendChild(option);
}

const birthdayForm = document.getElementById(
  ELEMENTS.BIRTHDAY_FORM
) as HTMLFormElement;

const dateOutput = document.querySelector(ELEMENTS.DATE_OUTPUT);

const dateOutputWrapper = document.querySelector(
  ELEMENTS.DATE_OUTPUT_WRAPPER
) as HTMLDivElement;

const MONTHS = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

birthdayForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    day: formData.get("day-select") as string,
    month: formData.get("month-select") as keyof typeof MONTHS,
    year: formData.get("year-select") as string,
  };

  const birthday = new Date(`${data.day} ${MONTHS[data?.month]} ${data.year}`);
  const currentDate = new Date();
  const differenceInTime = Math.abs(currentDate.getTime() - birthday.getTime());
  const totalDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  const dayText = totalDays > 1 ? "days" : "day";
  const totalDaysFormatted = new Intl.NumberFormat().format(totalDays);

  if (dateOutput) dateOutput.textContent = `${totalDaysFormatted} ${dayText}`;

  birthdayForm.classList.add("hidden");
  dateOutputWrapper.classList.remove("hidden");
});

dateOutputWrapper?.addEventListener("click", function () {
  birthdayForm.classList.remove("hidden");
  dateOutputWrapper.classList.add("hidden");
});
