const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 32},
    last_name: {type: String, required: true, maxLength: 32},
    username: {type: String, required: true, maxLength: 32, unique: true},
    email: {type: String, maxLength: 64, unique: true},
    password: {type: String, required: true, minLength: 6},
    membership_status: {type: String, required: true, enum: ['padawan', 'jedi', 'master']}
});

// Виртуальное поле для User
UserSchema.virtual('fullname').get(function() {
    let fullname = "";
    if (this.first_name && this.last_name) {
        fullname = `${this.first_name} ${this.last_name}`;
    } else {
        fullname = '';
    }
    return fullname;
});

// Виртуальное поле для User. Ссылка на user
UserSchema.virtual('url').get(function() {
    // Не использую стрелочную функцию, т.к. мне нужен объект this
    return `/users/${this._id}`;
});

// Экспортирую модель
module.exports = mongoose.model('User', UserSchema);