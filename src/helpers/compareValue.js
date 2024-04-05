import bcrypt from "bcrypt";

const generateHasedValue = (value, saltRounds) =>bcrypt.hashSync(value, saltRounds);
const compareHasedvalue = (value, hasedvalue) =>bcrypt.compareSync(value, hasedvalue);

export { generateHasedValue, compareHasedvalue };
