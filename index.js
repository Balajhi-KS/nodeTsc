"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Heylo');
});
app.post('/api/post', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
app.listen(3000, () => { console.log('Listening to 5000'); });
