clickAndPoint
=============

A JavaScript bookmarklet to return the coordinates of a point clicked on the DOM.

When the bookmarklet is clicked on a page, clickAndPoint will run immediately and you can see the location of your clicks printed to the console. The following options are available and can be set by passing them as an object e.g. clickAndPoint.setup(options) in the console

  1. element : (string) the DOM element that the click coordinates should be relative to. This can be any jQuery selector. If none is provided, it will default to 'body'
  2. progressive : (boolean) if true, will calculate coordinates relative to your last click rather than to a particular element. This defaults to false. Note that the first click (assuming you haven't clicked anywhere yet) will show the value relative to the body as well as that a value of true essentially overrides any value passed for 'element' since the click are relative to each other rather than the DOM
  3. callback : (function literal) a function that will override the default callback function when a click is made. the callback function can make use of any internal variables it wants - the ones of most interest are clickAndPoint.locationX and clickAndPoint.locationY. It is given one parameter, the click event. It will default to an internally defined function that prints information about your click

To try it out, open demo.html.

Once you've clicked around, try typing a few of the following commands into the console:

  1. clickAndPoint.setup({element : '#outer'}); This will set your clicks relative to the red square
  2. clickAndPoint.setup({callback : function() { console.log('x coordinate is '+ clickAndPoint.locationX); }}); This will override the current callback function. You'll probably want your callback to do something more productive, like add the click values to an array
  3. clickAndPoint.setup({progressive: true}); clickAndPoint will forget about your old element and will display click values based on your last click location
  4. clickAndPoint.setup({element : '.inner'}); show values relative to a selector that matches more than one DOM element (the blue rectangles)