const User = require('../models/user');
const Message = require('../models/message');
const dateToString = require('../utilityFunctions/dateToString');

const {checkAuthenticated} = require('../middlewares/checkAuthenticated');

const {body, validationResult} = require('express-validator');


// messages list
exports.messages_list_get = (req, res, next) => {
    Message.find().sort({timestamp: 1})
    .populate('user')
    .exec(function(err, messages_list) {
        if (err) {
            return next(err);
        }

        if (!req.user || req.user.membership_status === 'padawan') {
            messages_list = messages_list.map(message => {
                return {
                    _id: message._id,
                    title: message.title,
                    text: message.text
                }
            });
        }

        res.render('messages_list', {
            user: req.user,
            messages: messages_list,
        });
    });
}

// delete message
exports.message_delete_post = (req, res, next) => {
    Message.findById(req.params.id, (err, message) => {
        if (err) {
            return next(err);
        }

        if (!message) {
            const err = new Error('Sorry, message does not found in DB');
            err.status = 404;
            return next(err);
        }

        Message.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return next(err);
            }

            res.redirect('/message/list');
        });
    });
}

// create message
exports.create_message_get = [checkAuthenticated, (req, res, next) => {
    res.render('message-form', {
        title: 'Create new message',
        user: req.user
    });
}];
exports.create_message_post = [
    body('title').trim().isLength({min: 1})
        .withMessage("Title must be specified").escape(),
    body('text').trim().isLength({min: 1})
        .withMessage("Please, enter some text").escape(),
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(body);
        
        if (!errors.isEmpty()) {
            res.render('message-form', {
                message: {
                    title: req.body.title,
                    text: req.body.text
                }
            });
        }
        
        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            user: req.user._id,
            timestamp: dateToString(new Date())
        });

        message.save(err => {
            if (err) {
                return next(err);
            }

            res.redirect('/');
        });
    }
];