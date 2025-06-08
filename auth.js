
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person.js')


passport.use(new localStrategy(async (username, password, done) =>{
  try {
    // console.log("Received Credentiaals:", username, password);
    const user = await Person.findOne({username: username});
    if(!user){
      return done(null , false, {message : "Invalid Username."});
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(isPasswordMatched){
      return done(null, user);
    }else{
      return done(null, false , {message : "Incorrect Password"});
    }

  } catch (error) {
    return done(err);
  }
}))

module.exports = passport;