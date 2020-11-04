const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mssql = require('./connection');

function initialize(passport, getUserById) {
  const authenticateUser = async (password, done) => {
    const user = getUserById(DRNO);
    const query = "SELECT DRPassword from Doctors WHERE DRNO = '" + user + "'";
    if (user == null) {
      return done(null, false, { message: 'No user with that Id' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ IdField: 'DRNO' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.DRNO));
  passport.deserializeUser((DRNO, done) => {
    return done(null, getUserById(DRNO));
  });
}

module.exports = initialize;
