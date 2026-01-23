const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.compareLogin = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};



