const admin = require("./admin");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    // parameter username is the same that come from client side , have to be the same name//
    new LocalStrategy((username, password, done) => {
      admin.findOne({ Username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.Password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};
