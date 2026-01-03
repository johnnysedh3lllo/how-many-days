import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(GSDevTools, SplitText);

const ELEMENTS = {
  DAY_SELECT: "day-select",
  MONTH_SELECT: "#month-select",
  YEAR_SELECT: "year-select",
  CALCULATOR_FORM: "birthday-form",
  CALCULATOR_OUTPUT: ".calculator__output",
  CALCULATOR_OUTPUT_VALUE: ".calculator__output__value",
};

const daySelect = document.getElementById(ELEMENTS.DAY_SELECT);
const yearSelect = document.getElementById(ELEMENTS.YEAR_SELECT);

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

const calculatorForm = document.getElementById(
  ELEMENTS.CALCULATOR_FORM
) as HTMLFormElement;

const calculatorOutput = document.querySelector(
  ELEMENTS.CALCULATOR_OUTPUT
) as HTMLDivElement;

const calculatorOutputValue = document.querySelector(
  ELEMENTS.CALCULATOR_OUTPUT_VALUE
);
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

const calculatorInteractionTl = gsap.timeline({
  paused: true,
});
calculatorInteractionTl
  .to(calculatorForm, { autoAlpha: 0 })
  .fromTo(calculatorOutput, { autoAlpha: 0 }, { autoAlpha: 1 });

calculatorForm?.addEventListener("submit", function (e) {
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

  if (calculatorOutputValue)
    calculatorOutputValue.textContent = `${totalDaysFormatted} ${dayText}`;

  // calculatorForm.classList.add("hidden");
  // calculatorOutput.classList.remove("hidden");

  calculatorInteractionTl.play();
});

calculatorOutput?.addEventListener("click", function () {
  calculatorInteractionTl.reverse();
});
