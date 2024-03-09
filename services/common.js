import passport from "passport";

export const isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

export const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

export const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //TODO : this is temporary token for testing without cookie
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWM1OTllMGY4MDMzODNlNDU5NzVmNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTk5MDY3Nn0.8TtKCTR8o5JTFnQrqrC5iKAZTFU4eWFShDWor1DPx_o";
  return token;
};
