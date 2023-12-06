const verifyToken = require('../src/middleware');
const {axiosMock} = require('./singleton');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(express.json());

const secondsInSixHours = 60 * 60 * 6;

let res = {
    statusVal: 500,
    jsonVal: {},
    status: jest.fn().mockImplementation((val) => {
        res = {...res, statusVal: val};
        return res;
    }),
    json: jest.fn().mockImplementation((val) => {
        res = {...res, jsonVal: val};
        return res;
    })
}

class AxiosError {
    constructor(message, code) {
        this.response = {
            data: message,
            status: code
        };
    }
}

AxiosError.prototype = new Error();

describe('Token', () => {
    test('Successfully verified', async () => {
        axiosMock.get.mockResolvedValueOnce({status: 200, data: {blocked: false}});
        const token = jwt.sign({
            username: 'gstfrenkel',
            exp: Math.floor(new Date() / 1000) + secondsInSixHours
        }, "tp2");

        const result = await verifyToken(token, "tp2");
        
        expect(result).toEqual('gstfrenkel');
    });

    test('Expired', async () => {
        axiosMock.get.mockResolvedValueOnce({status: 200, data: {blocked: false}});
        const token = jwt.sign({
            username: 'gstfrenkel',
            exp: 0,
        }, "tp2");

        try{
            await verifyToken(token, "tp2");
            expect(false).toEqual(true);
        } catch(_){
            expect(true).toEqual(true);
        }
    });

    test('Expired', async () => {
        axiosMock.get.mockResolvedValueOnce({status: 200, data: {blocked: true}});
        const token = jwt.sign({
            username: 'gstfrenkel',
            exp: Math.floor(new Date() / 1000) + secondsInSixHours,
        }, "tp2");

        try{
            await verifyToken(token, "tp2");
            expect(false).toEqual(true);
        } catch(_){
            expect(true).toEqual(true);
        }
    });
});
