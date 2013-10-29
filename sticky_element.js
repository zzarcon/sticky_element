(function(exports) {

  var elements = [],
    MIN_TOP = 0,
    fakeClass = 'fake-sticky';

  $(document).ready(init);

  function init() {
    var win = $(window);
    win.on('scroll', positionElements);
    win.on('resize', positionElements);
  }

  function positionElements() {
    var scroll = $(window).scrollTop(),
      top;

    elements.forEach(function(element) {
      //Get offset of the current used element
      var offset = element.$current.offset(),
        $el = element.$el,
        maxTop = offset.top,
        left = offset.left,
        $fake = element.$fake;
      //Create the fake element
      if (scroll >= maxTop) {
        if (!$fake.length) {
          $fake = createFake(element.$el);
          element.$fake = $fake;
          element.$current = $fake;

          $el.css('left',offset.left);
          $el.addClass(fakeClass);
        }
      } else {
        //Use default element and remove the fake
        if ($fake.length) {
          $fake.remove();
          element.$fake = {};
          $el.css('position', 'initial');
          element.$current = $el;
          $el.removeClass(fakeClass);
        }
      }
    });
  }
  //Create and insert a copy of the passed element
  function createFake($element) {
    var $fakeElement = $element.clone();
    $fakeElement.empty();
    $fakeElement.css({
      visibility: 'hidden',
      height: $element.height(),
      width: $element.width()
    });
    $fakeElement.insertAfter($element);

    return $fakeElement;
  }

  function add($element) {
    if ($element.length && !$element.hasClass('stickyElement')) {
      $element.addClass('stickyElement');

      elements.push({
        $el: $element,
        $fake: {},
        $current: $element
      });
    }
    positionElements();
  }

  exports.App.stickyElement = {
    add: add
  };

})(window);