const User = require('../models/user');
const {checkAuthenticated} = require('../middlewares/checkAuthenticated');
const {checkLoggedIn} = require('../middlewares/checkLoggedIn');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const {body, validationResult} = require('express-validator');



exports.sign_up_get = [checkLoggedIn, (req, res, next) => {
    res.render("user_form", {
        title: "Sign Up",
        isSignup: true
    });
}];
exports.sign_up_post = [
    body("first_name").trim().isLength({min: 1})
        .withMessage("First name must be specified").isLength({max: 32})
        .withMessage("First name max length is 32").escape()
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters"),
    body("last_name").trim().isLength({min: 1})
        .withMessage("Last name must be specified").isLength({max: 32})
        .withMessage("Last name max length is 32").escape()
        .isAlphanumeric()
        .withMessage("Last name has non-alphanumeric characters"),
    body("login").trim().isLength({min: 1})
        .withMessage("Login must be specified").isLength({max: 32})
        .withMessage("Login max length is 32").escape()
        .isAlphanumeric()
        .withMessage("Login has non-alphanumeric characters"),
    body("email").trim().isEmail().withMessage("Incorrect email").escape(),
    body("password").isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(body);

        if (!errors.isEmpty()) {
            res.redirect('/sign-up', {
                title: 'Sign Up (check errors)',
                errors: errors.array()
            });
        }
        
        User.find().or([{username: req.body.username}, {email: req.body.email}])
        .then(users => {

            if (users) { // есть пользователи с таким username или email
                res.render('user_form', {
                    message: `User with '${req.body.username}' username or '${req.body.email}' email already registered`,
                    isSignup: true,
                    title: 'Sign Up'
                });
            } else { // username и email не заняты - регистрируем
                const hashedPassword = bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                    if (err) {
                        return next(err);
                    }
        
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        membership_status: 'padawan'
                    });
        
                    user.save(err => {
                        if (err) {
                            return next(err);
                        }
                        req.logIn(user, function(err) {
                            if (err) {
                                return next(err);
                            }
        
                            res.redirect('/');
                        });
                    });
                });
            }
        })
        .catch(err => {
                return next(err);
        });
    }
];

exports.log_in_get = [checkLoggedIn, (req, res, next) => {
    res.render("user_form", {
        title: "Log In",
        isSignup: false
    });
}];
exports.log_in_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/log-in_error'
});
exports.log_out_get = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
}

exports.update_status_get = [checkAuthenticated, (req, res, next) => {
    res.render('change-status', {
        user: req.user
    });
}];
exports.update_status_post = (req, res, next) => {
    const desiredStatus = req.body.status;
    const secretWord = req.body.secret_word.trim();
    let isSecretWordWrong = false;

    if (desiredStatus === 'padawan') {
        updateStatus('padawan');
    } else if (desiredStatus === 'jedi') {
        if (secretWord === process.env.SECRET_WORD_JEDI) {
            updateStatus('jedi');
        } else {
            isSecretWordWrong = true;
        }
    } else if (desiredStatus === 'master') {
        if (secretWord === process.env.SECRET_WORD_MASTER) {
            updateStatus('master');
        } else {
            isSecretWordWrong = true;
        }
    } else {
        const error = new Error("Sorry! Unexpected error(");
        error.status = 500;
        error.link = `/user/${req.params.id}/change-status`;
        return next(error);
    }

    if (isSecretWordWrong) {
        res.render('change-status', {
            status: desiredStatus
        });
    }

    function updateStatus(status) {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                const err = new Error("User not found");
                err.status = 404;
                return next(err);
            }

            if (user.membership_status === status) {
                res.render('homepage', {
                    message: `You already have '${status}' status!`,
                    user: user
                });
                return;
            }

            User.findByIdAndUpdate(req.params.id, {_id: req.params.id, membership_status: status}, {}, (err, theuser) => {
                if (err) {
                    return next(err);
                }
                
                res.redirect('/');     
            });

        });
    }
};