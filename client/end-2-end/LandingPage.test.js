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
      .setValue('#reg_username', 'myName')
      .pause(2000)
      .setValue('#reg_email', 'ben@gmail.com')
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
  // testCase['SignUp page should have heading text SIGN UP'] = function (client) {
  //   client
  //     .url('http://localhost:8000/login')
  //     .waitForElementVisible('.container-fluid', 1500)
  //     .waitForElementVisible('.signUp h4', 1500)
  //     .expect.element('.signUp h4').text.to.equal('SIGN UP');
  //   client.end();
  // };
  // testCase['SignUp page should successfully signUp a new user'] = function (client) {
  //   client
  //     .url('http://localhost:8000/login')
  //     .waitForElementVisible('.container-fluid', 1500)
  //     .waitForElementVisible('.signUp h4', 1500)
  //     .waitForElementVisible('.row', 1500)
  //     .waitForElementVisible('.input-field', 1500)
  //     .waitForElementVisible('.name', 3500)
  //     .setValue('.name', 'Guy Richards')
  //     .pause(2000)
  //     .setValue('.user-name', 'Richie2')
  //     .pause(3000)
  //     .setValue('.email', 'Richie1@testing.com')
  //     .pause(3000)
  //     .setValue('.password', 'abc123')
  //     .pause(3000)
  //     .setValue('.confirm-password', 'abc123')
  //     .pause(3000)
  //     .waitForElementVisible('.btn-large', 1500)
  //     .pause(2000)
  //     .click('.btn-large')
  //     .pause(5000)
  //     .waitForElementVisible('.wrapper', 2500)
  //     .expect.element('.wrapper').to.be.visible;
  //   client.end();
  // };
  // testCase['SignIn page should successfully signIn registered user'] = function (client) {
  //   client
  //     .url('http://localhost:8000/login')
  //     .waitForElementVisible('.container-fluid', 1500)
  //     .waitForElementVisible('.row', 1500)
  //     .waitForElementVisible('.message', 1500)
  //     .waitForElementVisible('.toggler2', 1500)
  //     .pause(2000)
  //     .click('.toggler2')
  //     .pause(3000)
  //     .waitForElementVisible('.input-field', 1500)
  //     .waitForElementVisible('.email', 1500)
  //     .pause(3000)
  //     .setValue('.email', 'Richie1@testing.com')
  //     .pause(3000)
  //     .setValue('.password', 'abc123')
  //     .pause(3000)
  //     .waitForElementVisible('.btn-large', 1500)
  //     .pause(2000)
  //     .click('.btn-large')
  //     .pause(5000)
  //     .waitForElementVisible('.wrapper', 2500)
  //     .expect.element('.wrapper').to.be.visible;
  //   client.end();
  // };
  // testCase['SignIn page should successfully signIn registered user'] = function (client) {
  //   client
  //     .url('http://localhost:8000/login')
  //     .waitForElementVisible('.container-fluid', 1500)
  //     .waitForElementVisible('.row', 1500)
  //     .waitForElementVisible('.message', 1500)
  //     .waitForElementVisible('.toggler2', 1500)
  //     .pause(2000)
  //     .click('.toggler2')
  //     .pause(3000)
  //     .waitForElementVisible('.input-field', 1500)
  //     .waitForElementVisible('.email', 1500)
  //     .pause(3000)
  //     .setValue('.email', 'Richie1@testing.com')
  //     .pause(3000)
  //     .setValue('.password', 'abc123')
  //     .pause(3000)
  //     .waitForElementVisible('.btn-large', 1500)
  //     .pause(2000)
  //     .click('.btn-large')
  //     .pause(5000)
  //     .waitForElementVisible('.wrapper', 2500)
  //     .expect.element('.wrapper').to.be.visible;
  //   client.end();
  // };
})();


// module.exports = {
//   'shows the landing page': function (client) {
//     client
//       .url('http://localhost:8000/')
//       .waitForElementVisible('.container', 1500)
//       .expect.element('.container').to.be.present;
//     client.end();
//   },
// };