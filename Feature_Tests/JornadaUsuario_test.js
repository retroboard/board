Feature('Jornada do Usuario');

Scenario('Abrir board', (I) => {
    I.amOnPage('https://github.com');
    I.see('GitHub');
});