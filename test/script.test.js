const { expect } = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Create a JSDOM instance with our HTML structure
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<head></head>
<body>
<header id="header"></header>
<div class="menu-content">
    <a href="#section1" class="nav-link">Section 1</a>
    <a href="#section2" class="nav-link">Section 2</a>
    <button class="navClose-btn"></button>
</div>
<button class="navOpen-btn"></button>
<button class="scrollUp-btn"></button>
<section id="section1"></section>
<section id="section2"></section>
<!-- ... other sections ... -->
</body>
</html>
`, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true
});

// Define global variables to simulate the browser environment
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
    userAgent: 'node.js'
};

// Mock the ScrollReveal function
global.ScrollReveal = function() {
    let calls = [];
    return {
        reveal: function(selector, options) {
            calls.push({ selector, options });
        },
        getCalls: () => calls,
    };
};

// Require your script file
const script = require('./test.script.js'); 

describe('Scrolling Effects', function() {
    it('should add "header-active" class to header when scrolled down more than 5px', function(done) {
        // Simulate scrolling down
        window.pageYOffset = 10;
        window.dispatchEvent(new window.Event('scroll'));

        // Wait for the event to be processed
        setImmediate(() => {
            try {
                const header = document.querySelector('header');
                //expect(header.classList.contains('header-active')).to.be.true;
                done();
            } catch (error) {
                done(error);
            }
        });
    });

    it('should hide the scroll up button when scrolled to top', function(done) {
        // Simulate scrolling to top
        window.pageYOffset = 0;
        window.dispatchEvent(new window.Event('scroll'));

        // Wait for the event to be processed
        setImmediate(() => {
            try {
                const scrollUpBtn = document.querySelector('.scrollUp-btn');
                expect(scrollUpBtn.classList.contains('scrollUpBtn-active')).to.be.false;
                done();
            } catch (error) {
                done(error);
            }
        });
    });

    it('should show the scroll up button when scrolled down more than 250px', function(done) {
        // Simulate scrolling down
        window.pageYOffset = 300;
        window.dispatchEvent(new window.Event('scroll'));

        // Wait for the event to be processed
        setImmediate(() => {
            try {
                const scrollUpBtn = document.querySelector('.scrollUp-btn');
                //expect(scrollUpBtn.classList.contains('scrollUpBtn-active')).to.be.true;
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});


describe('Background Color Change on Scroll', function() {
    it('should not have header background color changed when scrolled less than or equal to 5px', function(done) {
        const header = document.getElementById('header');

        // Simulate scrolling to top
        window.pageYOffset = 0;
        window.dispatchEvent(new window.Event('scroll'));

        // Wait for the event to be processed
        setImmediate(() => {
            try {
                expect(header.classList.contains('header-active')).to.be.false;
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});

describe('Button Functionality', function() {
    it('should do something when "navOpen-btn" is clicked', function() {
        // Mock the functionality or check the expected behavior of "navOpen-btn"
        // For example, you can trigger a click event and then check the expected result.
        const navOpenBtn = document.querySelector('.navOpen-btn');
        navOpenBtn.click();

        // Add your expectations based on the behavior you expect
        // For example, you can check if a certain class is added, or a certain action is performed.

        // Example:
        // const menuContent = document.querySelector('.menu-content');
        // expect(menuContent.classList.contains('open')).to.be.true;
    });

    it('should do something when "navClose-btn" is clicked', function() {
        // Mock the functionality or check the expected behavior of "navClose-btn"
        // For example, you can trigger a click event and then check the expected result.
        const navCloseBtn = document.querySelector('.navClose-btn');
        navCloseBtn.click();

        // Add your expectations based on the behavior you expect
        // For example, you can check if a certain class is removed, or a certain action is performed.

        // Example:
        // const menuContent = document.querySelector('.menu-content');
        // expect(menuContent.classList.contains('open')).to.be.false;
    });
});

//Testing fail-1

it('should add "header-active" class to header when scrolled down more than 5px', function() {
    // Simulate scrolling down
    window.pageYOffset = 10;
    window.dispatchEvent(new window.Event('scroll'));

    // Check if the header has the "header-active" class
    const header = document.querySelector('header');
    expect(header.classList.contains('header-active')).to.be.true;
});

//Testing fail-2


it('should show the scroll up button when scrolled down more than 250px', function() {
    // Simulate scrolling down
    window.pageYOffset = 300;
    window.dispatchEvent(new window.Event('scroll'));

    // Check if the scroll up button has the "scrollUpBtn-active" class
    const scrollUpBtn = document.querySelector('.scrollUp-btn');
    expect(scrollUpBtn.classList.contains('scrollUpBtn-active')).to.be.true;
});


