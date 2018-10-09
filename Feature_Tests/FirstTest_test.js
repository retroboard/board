
Feature('setup');

Scenario('test something', (I) => {
    I.amOnPage('https://github.com');
    I.see('GitHub');
});
