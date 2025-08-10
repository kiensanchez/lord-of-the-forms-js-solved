import { allCities } from "./all-cities";
import { capitalize } from "./transformations";

export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export const checkValidInput = (
  firstNameInput,
  lastNameInput,
  emailInput,
  cityInput,
  phoneInput
) => {
  if (firstNameInput.length < 2) return false;
  if (lastNameInput.length < 2) return false;
  if (!isEmailValid(emailInput)) return false;
  if (!allCities.includes(capitalize(cityInput))) return false;
  if (phoneInput.join("").length !== 7) return false;
  return true;
};
