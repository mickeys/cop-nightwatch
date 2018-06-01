> This is a WIP readme....it will be updated over the next few days to include test tips and such.

# Writing automated tests with Nightwatch

[Nightwatch.js](http://nightwatchjs.org/) is an easy-to-use Node.js based end-to-end (E2E) testing solution for browser-based apps and websites. It uses a webdriver to perform commands and assertions on [DOM](https://www.wikiwand.com/en/Document_Object_Model) elements. This document is a tutorial on one way to write automated tests with Nightwatch.

<center><a href="./images/shaun_foran.png"><img src="./images/shaun_foran-thumb.png" border="3" width="20%"></a><br><font size="+1"><a href="mailto:shaun.foran@nike.com">Shaun Foran</a></font></center>

## Understand the concepts

Writing automated tests with Nightwatch requires some learning in parallel. The following free resources will help.

**JavaScript**

* [A re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript), developer.mozilla.org (translated into many languages)
* [Speaking JavaScript](http://speakingjs.com/es5/index.html), Dr Axel Rauschmayer (O'Reilly) (available also in various [e-book formats](http://speakingjs.com/)).

**node.js**

* [The only node.js introduction you’ll ever need](https://codeburst.io/the-only-nodejs-introduction-youll-ever-need-d969a47ef219), Victor Ofoegbu

**The bash terminal shell**

Of all the available shells, I've chosen `bash` because it's available on macOS, Linux, and even as a fully-fledged [add-on to Windows](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

* [The Bash Guide - A quality-driven guide through the shell's many features](https://guide.bash.academy/), Maarten Billemont
* [The Bash command line interface (terminal) on Unix/Linux](https://ryanstutorials.net/linuxtutorial/), Ryan Chadwick

## Notes & prerequisites

* In the command-line examples you'll see lines beginning with the `%` character. This is the prompt from your terminal shell. Depending upon the shell you're using, you may see a `$` instead. If you see `#` then you're running as the root superuser, a situation you ought to consider changing.

* You _MUST_ have the following installed **prior** to cloning this repo in order for NightwatchJS to work. Select one of the following options:

	* Visit each URL, download, and install the latest stable release for your OS.

		* [Node/NPM](https://nodejs.org/en/)
		* [Java](https://java.com/en/)
		* [git](https://git-scm.com/)

	* macOS users may install [homebrew](http://brew.sh) to install useful UNIX tools (and their dependencies) from the command line:

	```
% /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
% brew install node
% brew cask install java
% brew install git
```

## Get everything running locally

To clone my instructional repo up and running on your local machine, run:

```
% git clone https://SFora2@bitbucket.nike.com/scm/~sfora2/cop-nightwatch.git
% cd cop-nightwatch
% npm install
```

### Find chromedriver

To find the Chrome driver:

1. Edit the file `nightwatch.json`
2. Find the line which contains `webdriver.chrome.driver` (in the `selenium -> cli-args` section)
3. Verify/change the line to be appropriate for your OS:

	* macOS ```
"webdriver.chrome.driver" : "./node_modules/chromedriver/bin/chromedriver/"
```

	* Windows	
```
"webdriver.chrome.driver" : "./node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
```

## Running the demo NightwatchJS test

The command to run Nightwatch usually requires that you supply the full path each time. To make things easy for everyone, I've aliased the command; to run the demo test:

```
% npm run nightwatch tests/
```
This will start Selenium and run the demo test in your Google Chrome browser. To just run nightwatch:

```
% npm run nightwatch
```

If _you_ want to control when Selenium starts, or have it running in the background (on port 9999):

```
% npm run start-server
```

## The Page Object Model

> WIP: Need to update for NightwatchJS)

Instead of having to re-write selectors for every single test, we are leveraging the Page Object Model (POM). This allows us to have a single source of truth for our selectors and have a very scalable selector system. Let's take a closer look at how this is implemented.

Your basic selector looks like:

`.example-selector .example-subselector:nth-child(13)`

There are a few things with this format that are quite challenging to deal with. The first thing is that it is quite difficult to read. `nth-child` is not very descriptive, and having multiple lines with these types of selectors will make your tests quite cumbersome.

Another problem with this type of selector is scalability. If a developer changes the selector, then you will have to go back into every test and change your selector to reflect their changes. This can prove to be quite cumbersome and time-consuming (not to mention brittle), but luckily there is a great way to handle this!

This is an example of a Page Object:

`Insert code here`

Easy to understand, right? You know exactly what selector you are using without having to use a crazy selector string, and, if written well, the page objects are super-descriptive. Also, once you have the page objects defined for a section of the application they can be used throughout your tests. This makes it that much easier to deal with developer changes; instead of updating your selector in every single test you just update the page object and the changes update instantly throughout your tests: simple!

## Writing a test

All of this is cool, but what about **actually** writing a test?

> WIP: This is for using a Mocha style

Writing a test is super easy! There are 3 parts to a test; let's take a look at them now.

### The `describe` block

Thhe wrapper of the test, used to nest all of the context/it blocks for your test file. You should only have one `describe` block in a test file, as they are just a wrapper in which to run your test file. You should describe what your main test file is doing in this block, such as `Insert code here`. Your describe block will look like this:

```
describe('This will be your description text', () => {
    Your test code goes here...
});
```

> If you are not familiar with the "fat arrow" JS code style, it's super easy. It's how you call your function with the new JS syntax instead of writing `function` all of the time.

***
### The `context` block

Where the `describe` block is the main wrapper for the file, the `context` block is the wrapper for different tests. I use the `context` block to change between [Behavior-Driven Development](https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/) (BDD) testing and Functional testing. This will allow you to test different facets of an app within one file. Much like the `describe` block, you put a description of the type of testing that you are doing, such as `Manage Aircraft BDD Testing`. A typical `context` block will look like this:

```
context('This will be your context text', () => {
    Your test code goes here...
});
```

> A note about **before** vs **beforeEach**: `before` will only run code once for the entire block, and it is mostly used for BDD testing. `beforeEach` will run every time before the it block, clearing out any previous state of the app.

### The `it` block

This is where you put your test code. The same pattern that you have been following for the `describe` and `context` blocks will apply here:

```
it('Should do this in your specific text', () => {
    Your test code goes here...
});
```


## Types of tests


### BDD/Assertion testing

These will be your "should" type of tests. They are flexible for testing and easy to follow and understand. An example of a BDD style test is:

```
Insert code here
```

> **New to test automation?** You should start with BDD testing to get familiar with the code syntax, how to work with the selectors/page objects, and how to chain assertions.


### Functional/End-to-end (E2E) testing

End-to-end tests are your fully functional tests, running through the app in the same way as a user.

Because these tests run against "real" API calls, they can be brittle. _(See the TODO section for information about API mocking that will be done soon.)_ In addition, they can be cumbersome to write and pretty tricky to debug; in some cases you will need to wait for selectors to become visible, add wait statements, and more fun things. I would recommend having a solid understanding of BDD testing and Mocha before jumping straight into functional/E2E testing.

Here is an example of an e2e test:

```
Insert code here
```

> If you have any trouble with writing these type of tests, please reach out to me and I can help you get started or try to unblock you. They can definitely be a pain to deal with!

## Conclusion & next steps

PLACEHOLDER
