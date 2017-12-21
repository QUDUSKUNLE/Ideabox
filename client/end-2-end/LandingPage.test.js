import faker from 'faker';
module.exports = new (function () {
  const testCase = this;
  testCase['Shows the landing page'] = function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.logo', 3000)
      .waitForElementVisible('h4', 2000)
      .waitForElementVisible('.flex-center', 2000)
      .waitForElementVisible('h3', 2000)
      .pause(2000)
      .waitForElementVisible('#open_reg', 2000)
      .pause(2000)
      .waitForElementVisible('#open_log', 2500)
      .pause(2000)
      .expect.element('#open_log').text.to.equal('LOG IN');
    client.end();
  };

  testCase['landing page should have button text REGISTER'] = function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.logo', 3000)
      .waitForElementVisible('h4', 2000)
      .waitForElementVisible('.flex-center', 2000)
      .waitForElementVisible('h3', 2000)
      .pause(2000)
      .waitForElementVisible('#open_reg', 2000)
      .pause(2000)
      .expect.element('#open_reg').text.to.equal('REGISTER');
    client.end();
  };

  testCase['landing page should have button text LOG IN'] = function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.logo', 3000)
      .waitForElementVisible('h4', 2000)
      .waitForElementVisible('.flex-center', 2000)
      .waitForElementVisible('h3', 2000)
      .pause(2000)
      .waitForElementVisible('#open_log', 2000)
      .pause(2000)
      .expect.element('#open_log').text.to.equal('LOG IN');
    client.end();
  };

  testCase['Register page should successfully register a new user'] = function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.logo', 3000)
      .waitForElementVisible('h4', 2000)
      .waitForElementVisible('.flex-center', 2000)
      .waitForElementVisible('h3', 2000)
      .pause(2000)
      .waitForElementVisible('#open_reg', 2000)
      .pause(2000)
      .click('#open_reg')
      .pause(2000)
      .waitForElementVisible('#register', 2000)
      .pause(2000)
      .waitForElementVisible('#register_form', 3000)
      .pause(1000)
      .waitForElementVisible('.input-field .username', 1500)
      .waitForElementVisible('.username', 3500)
      .setValue('#reg_username', faker.name.findName())
      .pause(2000)
      .setValue('#reg_email', faker.internet.email())
      .pause(3000)
      .setValue('#reg_password', 'abc1234567')
      .pause(3000)
      .waitForElementVisible('button', 1500)
      .pause(1000)
      .click('button')
      .pause(3500)
      .waitForElementVisible('#dasboard_page', 2500)
      .expect.element('#dasboard_page').to.be.visible;
    client.end();
  };
})();
