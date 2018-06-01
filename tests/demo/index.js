// Define a pause variable here
const pause = 3000;

module.exports = {
  // Define test name and create function body here
  'Will navigate to Google and do something cool and fun...': function(browser) {
    // Navigate to a URL in the browser
    browser
      .url('http://www.google.com');
    // Perform your assertions here
    browser
      .assert.visible('[title="Search"]')
      .setValue('[title="Search"]', 'Nightwatch')
      .pause(pause);
    // You MUST end the browser or the window stays open indefinitely...ask me how I know
    browser
      .end();
  },
};
