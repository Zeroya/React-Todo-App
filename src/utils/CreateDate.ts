export const getCreationInputDate = (): string => {
  return (
    new Date()
      .toLocaleDateString()
      .split("")
      .map((el) => (el === "/" ? "." : el))
      .join("") +
    " " +
    new Date()
      .toLocaleTimeString()
      .split("")
      .filter((el, i, arr) =>
        arr.length === 11 ? i < 5 || i > 7 : arr.length === 10 ? i < 4 || i > 6 : i < arr.length - 3
      )
      .join("")
  );
};

export const getCreationInputDateExpiration = (): string => {
  return (
    new Date()
      .toLocaleDateString()
      .split("")
      .map((el) => (el === "/" ? "." : el))
      .map((el, i, arr) =>
        i === 0 && arr[i + 1] === "." ? Number(el) + 1 : i === 1 && arr[i + 1] === "." ? Number(el) + 1 : el
      )
      .join("") +
    " " +
    new Date()
      .toLocaleTimeString()
      .split("")
      .filter((el, i, arr) =>
        arr.length === 11 ? i < 5 || i > 7 : arr.length === 10 ? i < 4 || i > 6 : i < arr.length - 3
      )
      .join("")
  );
};

export const getCreationModalDate = (payload: string): string => {
  return payload
    .split("")
    .map((el) => (el === "T" ? " " : el === "-" ? "." : el))
    .join("")
    .slice(0, 10)
    .split(".")
    .reverse()
    .join(".")
    .concat(" ")
    .concat(payload.slice(11, 16));
};
