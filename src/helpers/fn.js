export const generateCode = (value) => {
  let output = "";
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .forEach((item) => {
      output += item.charAt(0).toUpperCase();
    });

  return output + value.length;
};
