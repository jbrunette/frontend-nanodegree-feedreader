/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         for (var i=0; i<allFeeds.length; i++) {
            test_allFeeds_item_for_url(allFeeds[i]);
         }
         function test_allFeeds_item_for_url(item) {
            it('has a URL defined and populated', function() {
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe("");
            })
         }


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        for (var i=0; i<allFeeds.length; i++) {
            test_allFeeds_item_for_name(allFeeds[i]);
         }
         function test_allFeeds_item_for_name(item) {
            it('has a name defined and populated', function() {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe("");
            })
         }
    });

    describe('The menu', function() {

        // Check existance of menu-hidden class on body to determine if menu is hidden
        it('is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        // Check if menu sccessfully shows/hides when menu button is clicked
        it('is hidden or shown when clicked', function() {

            // Get current hidden state
            var hidden = $("body").hasClass("menu-hidden");

            // Click menu icon and verify that menu is not hidden
            $("i.icon-list").click();
            expect($("body").hasClass("menu-hidden")).not.toBe(hidden);

            // Click menu icon again and verify that menu is hidden
            $("i.icon-list").click();
            expect($("body").hasClass("menu-hidden")).toBe(hidden);
        })
    })

    // Test that feed loads entries successfully
    describe('Initial entries', function() {

      // Run loadFeed before each test, ensuring that we can run the test once the async call returns
      beforeEach(function(done) {
        loadFeed(0, function() {
            done();
        });
      });

      // Test if .entry elements are added to DOM when feed is loaded
      it('successfully loads feed data', function(done) {
        expect($(".feed .entry").length).not.toBe(0);
        done();
      });
    });

    // Test that a new feed selection loads entries and updates the elements successfully
    describe('New feed selection', function() {
      var first_feed_item_link = "";

      // Perform actions before test
      beforeEach(function(done) {

        // Load first feed
        loadFeed(0, function() {

          // Get the link for the first item from the initial feed
          var first_feed_item = $(".feed .entry-link")[0];
          if (first_feed_item) {
            first_feed_item_link = first_feed_item.href;
          }
        });

        // Load second feed
        loadFeed(1, function() {

          // Ready to run test
          done();
        });

      });

      // Test to see if first link in item list is different now after second feed is loaded
      it('successfully switches feeds', function(done) {
        expect($(".feed .entry-link")[0].href).not.toBe(first_feed_item_link);
        done();
      });
    });

}());
