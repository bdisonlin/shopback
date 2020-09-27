var express = require('express');
var controller = require("../controllers/app.controller.js");

var router = express.Router();

router.route('/*')
    .get(function (req, res, next) {
        res.set({ 'X-SHOPBACK-TIMESTAMP': new Date() });
        if (res.method == 'GET') {
            var host = req.get('host');
            if (host == 'www.shopback.com') {
                res.sendStatus(400);
                return;
            }
        }
        next('route');
    })

    .put(function (req, res, next) {
        res.set({ 'X-SHOPBACK-TIMESTAMP': new Date() });
        var remove_url = req.originalUrl.split("?").shift();
        console.log(`http method:${req.method} remove query param:${remove_url}`);
        controller.postcheck(req, function (err, results) {
            if (!results) {
                res.sendStatus(400);
                return;
            }
            console.log(`header check result:${results}`);
            next();
        });
    })

    .post(function (req, res, next) {
        res.set({ 'X-SHOPBACK-TIMESTAMP': new Date() });
        var remove_url = req.originalUrl.split("?").shift();
        console.log(`http method:${req.method} remove query param:${remove_url}`);
        controller.postcheck(req, function (err, results) {
            if (!results) {
                res.sendStatus(400);
                return;
            }
            console.log(`header check result:${results}`);
            next();
        });
    })

    .delete(function (req, res, next) {
        res.set({ 'X-SHOPBACK-TIMESTAMP': new Date() });
        controller.deletecheck(req, function (err, results) {
            if (!results) {
                res.sendStatus(400);
                return;
            }
            console.log(`agent check result:${results}`);
            next();
        });
      });


router.route('/api/*')
    .get(function (req, res) {
        res.set({ 'From': 'hello@shopback.com' });
        console.log(`successful; http method:${req.method}; Set header From:${res.get('From')}`);
        res.end(`successful; http method:${req.method}; Set header From:${res.get('From')}`);
    })

    .put(function (req, res) {
        console.log(`successful; http method:${req.method}`);
        res.end(`successful; http method:${req.method}`);
    })

    .post(function (req, res) {
        console.log(`successful; http method:${req.method}`);
        res.end(`successful; http method:${req.method}`);
    })

    .delete(function (req, res) {
        console.log(`successful; http method:${req.method}`);
        res.end(`successful; http method:${req.method}`);
    })

router.route('/resource')
    .get(function (req, res) {
        res.redirect("static/assets");
        console.log(`http method:${req.method}; URL path :${req.originalUrl}`);
    })

router.route('/static/assets')
    .get(function (req, res) {
        console.log(`successful; http method:${req.method}; URL path :${req.originalUrl}; from ststic/assets`);
        res.end(`successful; http method:${req.method}; URL path :${req.originalUrl}`);
    })


router.route('/me')
    .get(function (req, res) {
        var subcookies = JSON.stringify(req.headers)
        if (!req.header('Cookie')) {
            res.sendStatus(400);
            return;
        }
        console.log(`successful; http method:${req.method}; header Cookie:${req.header('Cookie')}`);
        res.end(`successful; http method:${req.method}; check header Cookie:${req.header('Cookie')}`);
    })


module.exports = router;