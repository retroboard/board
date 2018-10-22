const I = actor();

module.exports = {

    fields: {
      newBoardButtonLabel: '#root > div > div > button'
    },

    navigate(url) {
        I.amOnPage(url);
    },

    async getNewBoardButtonLabel() {
      I.waitForVisible(this.fields.newBoardButtonLabel);
      const label = await I.grabTextFrom(this.fields.newBoardButtonLabel);
      return label;
    }
};