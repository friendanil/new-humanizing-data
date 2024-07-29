import { MONTHS } from "../../constants/time.constants";

export function generateYearOptions() {
  let yearOptions = "";
  let currentYear = 2024;
  do {
    yearOptions += `
          <option value="${currentYear}" ${
      currentYear == new Date().getFullYear() && "selected"
    }>
        ${currentYear}
        </option>`;
    currentYear += 1;
  } while (currentYear <= new Date().getFullYear());

  return yearOptions;
}

export function generateMonthOptions() {
  let monthOptions = "";
  for (let i = 0; i < MONTHS.length; i++) {
    const month = MONTHS[i];
    monthOptions += `
        <option value="${i <= 9 ? `0${i}` : i}" ${i == new Date().getMonth() && "selected"}>
        ${month}
        </option>
        `;
  }
  return monthOptions;
}

export function getDuration(timeMs: number) {
  const days = Math.floor(timeMs / (60 * 60 * 24 * 1000));
  const hours = Math.floor(timeMs / (60 * 60 * 1000)) - days * 24;
  const minutes =
    Math.floor(timeMs / (60 * 1000)) - (days * 24 * 60 + hours * 60);
  const seconds =
    Math.floor(timeMs / 1000) -
    (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
  let timeFormat = "";
  if (hours) timeFormat += `${hours}h `;
  if (minutes) timeFormat += `${minutes}m `;
  if (seconds) timeFormat += `${seconds}s `;

  return timeFormat;
}

export function getDateInMonth(year: number, month: number) {
    const day = new Date(year, month, 0).getDate()
    console.log('day', day)
    const startDate = new Date(`${year}-${month}-2`)
    const endDate = new Date(`${year}-${month}-${day}`)

    const arr = [];
    for (
      const date = new Date(startDate);
      date <= new Date(endDate);
      date.setDate(date.getDate() + 1)
    ) {
      arr.push(new Date(date));
    }
    let dateList: string[] = [];
    arr.map((v) => dateList.push(v.toISOString().slice(0, 10)));
    return dateList
}