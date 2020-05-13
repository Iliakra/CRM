/* eslint-disable no-undef */
import puppeteer from 'puppeteer';
const {fork} = require('child_process');

jest.setTimeout(30000);
describe('click to button', () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = 'http://localhost:9000';
    beforeAll(async () => {
        server = fork(`${__dirname}/e2e.server.js`);
        await new Promise((resolve, reject) => {
            server.on('error', () => {
                reject();
            });
            server.on('message', (message) => {
                if (message === 'ok') {
                    resolve();
                }
            });
        });        
        browser = await puppeteer.launch(
            {
                headless: false,
                slowMo: 100,
                devtools: true,
            }
        );      
        page = await browser.newPage();
    });
    afterAll(async () => {
        await browser.close();
        server.kill();
    });
    test('' , async () => {
        await page.goto(baseUrl);
        const addButton = await page.$('.add-button');
        await addButton.click();
        const inputName = await page.$('input.item-name');
        await inputName.type('123');
        const inputPrice = await page.$('input.item-price');
        await inputPrice.type('20300');
        const saveButton = await page.$('.save-button');
        await saveButton.click();
        await page.waitForSelector('.tr-added');
    });
  
});

