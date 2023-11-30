var rangeSlider = function () {
  var slider = $('.blur_degree'),
    range = $('.slider'),
    value = $('.output')

  slider.each(function () {
    value.each(function () {
      var value = $(this).prev().attr('value')
      $(this).html(value)
    })

    range.on('input', function () {
      $(this).next(value).html(this.value)
      console.log($(this).next(value).html(this.value))
    })
  })
}

rangeSlider()
