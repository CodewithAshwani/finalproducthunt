const validateAlphaNumeric = (v) => {
  if (v) {
    return /^[^<>#$\\/]*[s,.-]*[^<>#$\\/]*$/.test(v);
  }
  return false;
};

module.exports = { validateAlphaNumeric };
