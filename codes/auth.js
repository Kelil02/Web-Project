const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db');

passport.use(new LocalStrategy(
    (username, password, done) => {
        const sql = 'SELECT * FROM users WHERE username = ? COLLATE NOCASE';
        db.get(sql, [username], async (err, user) => {
            if (err) {
                console.error("DB error during authentication:", err);
                return done(err); 
            }
            if (!user) {
             
                return done(null, false, { message: 'Incorrect username or password.' }); 
            }

            try {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }

              
                return done(null, user);

            } catch (compareError) {
                console.error("Bcrypt compare error:", compareError);
                return done(compareError);
            }
        });
    }
));


passport.serializeUser((user, done) => {

    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [id], (err, user) => {
        if (err) {
            return done(err, null);
        }
        done(null, user); 
    });
});

module.exports = passport;