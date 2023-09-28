export const validate = (newDriver) => {
  const reg = /^\d{4}[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[1-2][0-9]|3[0-1])$/;
  let errors = {
    forename: "",
    surname: "",
    description: "",
    nationality: "",
    image: "",
    dob: "",
    teams: "",
    ok: true,
  };

  if (!newDriver.image) {
    errors.image = "URL image default";
  }

  if (!newDriver.forename) {
    errors.ok = false;
    errors.forename = "The forename is required";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(newDriver.forename)) {
    errors.ok = false;
    errors.forename = "The name only accepts letters and apostrophes";
  } else if (newDriver.forename.length > 25) {
    errors.ok = false;
    errors.forename = "The maximum length is 25 characters";
  }

  if (!newDriver.surname) {
    errors.ok = false;
    errors.surname = "The surname is required";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(newDriver.surname)) {
    errors.ok = false;
    errors.surname = "The surname only accepts letters and apostrophes";
  } else if (newDriver.surname.length > 20) {
    errors.ok = false;
    errors.surname = "The maximum length is 20 characters";
  }

  if (!newDriver.dob) {
    errors.ok = false;
    errors.dob = "The dob is required";
  } else if (
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
      newDriver.dob
    )
  ) {
    errors.ok = false;
    errors.dob = "The dob only accepts dd/mm/aaaa";
  }

  if (!newDriver.nationality) {
    errors.ok = false;
    errors.nationality = "The surname is required";
  } else if (!/^[a-zA-Z]+$/u.test(newDriver.nationality)) {
    errors.ok = false;
    errors.nationality = "The nationality only accepts letters and apostrophes";
  } else if (newDriver.nationality.length > 30) {
    errors.ok = false;
    errors.nationality = "The maximum length is 30 characters";
  }

  if (!newDriver.description) {
    errors.ok = false;
    errors.description = "The description is required";
  }

  if (!newDriver.teams) {
    errors.ok = false;
    errors.teams = "The teams is required";
  }

  return errors;
};
