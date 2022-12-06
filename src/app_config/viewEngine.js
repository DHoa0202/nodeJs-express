import express from "express";

export default (app) => {
    app.use(express.static('./src/app_static'));
    app.set('view engine', 'ejs');
    app.set('views', './src/views')
}