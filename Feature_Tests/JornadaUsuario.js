Feature('Jornada do Usuario');

Scenario('Abrir board', (I) => {
    I.amOnPage('http://localhost:3000/#/');
    I.seeTheOption('New board');
});