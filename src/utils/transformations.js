export const capitalize = (str) => {
  // todo: build this function
  const smallWords = ["of", "the", "under"];
  return str
    .split(" ")
    .map((word) => {
      if (smallWords.includes(word)) return word;
      return word.charAt(0) !== "("
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2);
    })
    .join(" ");
};

export const formatPhoneNumber = (phoneNumber) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  const formattedNumber = phoneNumber.replace(
    /(\d{2})(\d{2})(\d{2})(\d{1})/,
    "$1-$2-$3-$4"
  );

  return formattedNumber;
};
