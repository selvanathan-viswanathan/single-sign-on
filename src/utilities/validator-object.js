export var userValidatorObj = {
  username: {
    isLength: {
      options: { min: 5 },
      errorMessage: "Invalid username",
    },
  },
  firstName: {
    errorMessage: "Please enter first name",
    isEmpty: { negated: true },
  },
  lastName: {
    errorMessage: "Please enter first name",
    isEmpty: { negated: true },
  },
  email: {
    errorMessage: "Invalid email",
    isEmail: true,
  },
};
export var userCreationValidatorSchema = {
  ...userValidatorObj,
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
};
