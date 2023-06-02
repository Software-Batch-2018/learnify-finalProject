export function validatePassword(password: string) {
  const pattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/;
  return pattern.test(password);
}


