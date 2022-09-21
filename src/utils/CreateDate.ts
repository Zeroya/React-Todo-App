export const getCreationInputDate = (): string => {
  return new Date().toLocaleDateString().split(".").join(".") + " " + new Date().toLocaleTimeString().slice(0, -3);
};

export const getCreationInputDateExpiration = (): string => {
  return (
    new Date()
      .toLocaleDateString()
      .split(".")
      .map((el, i) => (i === 0 ? Number(el) + 1 : el))
      .join(".") +
    " " +
    new Date().toLocaleTimeString().slice(0, -3)
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
