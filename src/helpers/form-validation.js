export function validateValue(value, validator) {
  let isValid = false;
  if (validator(value)) {
    isValid = true;
  }
  return isValid;
}

export function validateNotEmpty(value) {
  let error;
  if (!value) {
    error = "Harus diisi";
  }
  return error;
}

/**
 * Validate an email address.
 * @param email - The email address to validate.
 * @returns The error message.
 */
export function validateEmail(email) {
  let error;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = "Email tidak valid";
  }
  return error;
}

export function validateNik(nik) {
  let error;
  if (nik.length !== 16) {
    error = "NIK tidak valid";
  }
  return error;
}

export function validateConfirmPassword(password, confirmPassword) {
  let error;
  if (password !== confirmPassword) {
    error = "Konfirmasi Kata sandi tidak cocok";
  }
  return error;
}
