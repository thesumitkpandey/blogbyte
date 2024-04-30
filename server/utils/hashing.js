const bcrypt = require("bcrypt");
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Password hashing failed");
  }
}
async function comparePasswords(originalPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(originalPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
}
export { hashPassword, comparePasswords };
