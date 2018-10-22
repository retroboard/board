'use strict';

const chai = require('chai');
const assert = chai.assert;

const homePage = require('../pages/homePage');

module.exports = function () {
    return actor ({
        amOnPage(url) {
            homePage.navigate(url);
        },

        async seeTheOption(label) {
          const buttonLabel = await homePage.getNewBoardButtonLabel();
          assert.equal(buttonLabel, label.toUpperCase());
        }
    })
};
