(function() {
  if(window.clickAndPoint) {
    return;
  }

  //if you try to run this in a browser without a console.
  //try passing in a callback function instead
  if(!window.console) {
    window.console = {
      log : function(message) {
        alert(message);
      }
    }
  }

  window.clickAndPoint = {
    oldX : 0,
    oldY : 0,
    CSSsetup : false,

    getClickLocation : function(e) {
      var clickX = e.pageX,
          clickY = e.pageY,
          offset;

      //keep track of which element it was that was actually clicked in the case that
      //clickAndPoint.$element has length > 1
      clickAndPoint.$currentTarget = $(e.currentTarget);
      offset = clickAndPoint.$currentTarget.offset();

      if(clickAndPoint.progressive) {
        clickAndPoint.locationX = clickX - clickAndPoint.oldX;
        clickAndPoint.locationY = clickY - clickAndPoint.oldY;
        clickAndPoint.oldX = clickX;
        clickAndPoint.oldY = clickY;
      } else {
        clickAndPoint.locationX = clickX - offset.left;
        clickAndPoint.locationY = clickY - offset.top;
      }

      clickAndPoint.callback();
    },

    setup : function(options) {
      if(!window.jQuery || !window.$) {
        return 'Whoops, jQuery hasn\'t loaded yet. Hold up one sec and try again';
      }

      //see if we've got any config options, if not, use defaults
      var options = options || {};

      clickAndPoint.element = options.element || 'body';
      clickAndPoint.callback = options.callback || clickAndPoint.defaultCallback;
      clickAndPoint.progressive = options.progressive || false;

      //make sure if we've switched our element we remove the click events from the old one
      if(clickAndPoint.$element) {
        clickAndPoint.$element.off('click.clickAndPoint');
      }

      clickAndPoint.$element = $(clickAndPoint.element);

      if(clickAndPoint.$element.length === 0) {
        clickAndPoint.element = 'body'
        clickAndPoint.$element = $(clickAndPoint.element);
        return 'element does not exist - using body instead';
      } else {
        clickAndPoint.$element.off('click.clickAndPoint').on('click.clickAndPoint', clickAndPoint.getClickLocation);
      }

      if(!clickAndPoint.CSSsetup) {
        $('head').append('<style>* { cursor: crosshair !important }</style>');

        clickAndPoint.CSSsetup = true;
      }

      return 'setup complete';
    },

    defaultCallback : function() {
      console.log('Your click is at location: X:' + clickAndPoint.locationX + ' Y:' + clickAndPoint.locationY + ' relative to ' + (clickAndPoint.progressive ? 'your last click' : clickAndPoint.element));
    }
  };

  //check if jQuery is loaded
  if(window.jQuery && window.$) {
    clickAndPoint.setup();
  } else {
    var script = document.createElement('script');
    script.src = 'http://code.jquery.com/jquery-latest.min.js';
    script.onload = clickAndPoint.setup;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
})();