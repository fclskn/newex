const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var http = require("http");
var fs = require("fs");
const app = express();
const { Server } = require("http");
const path = require('path');



// Veritabanı bağlantısı
mongoose.connect('mongodb+srv://ramazannasuhbey:ramazan10@cluster0.pgtgls6.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});

// Kullanıcı Şeması
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Ana Sayfa
app.get('/', (req, res) => {
    res.render('login');
});

// Kayıt Olma Sayfası
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/sayfa1', (req, res) => {
    res.render('sayfa1');
});

app.get('/sayfa2', (req, res) => {
    res.render('sayfa2');
});




// Kullanıcıyı Kaydet
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        newUser.save();
        res.redirect('/');
    } catch {
        res.redirect('/register');
    }
});

// Giriş Kontrolü
app.post('/', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (user != null && await bcrypt.compare(req.body.password, user.password)) {
        res.redirect('/sayfa1');
    } else {
        res.send('Kullanıcı adı veya şifre hatalı.');
    }
});




app.listen(5000, () => {
    console.log('Sunucu çalışıyor...');
});
