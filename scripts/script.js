$(document).ready( function () {
  updateRemained();
  var cur_itms = $('input[type="checkbox"]').length;

  $('.toggle-theme-btn').on('click', function() {
    $('body').toggleClass('theme-light').toggleClass('theme-dark');
  });

  $('.todo-lst').sortable({
    placeholderClass: 'todo-lst-item'
  });

  $('html').on('click', '.todo-lst-item__close', function() {
    $(this).parent().css({'opacity': 0, 'transform': 'translateX(100px)'});
    $(this).parent().addClass('removed');
    setTimeout(() => {
      $('.todo-lst-item.removed').remove();
      updateRemained();
    }, 300);
  });

  $('.todo-filter__btn').on('click', function() {
    $('.todo-filter__btn').removeClass('active');
    $(this).addClass('active');
    if( $(this).data('filter') == '0' ) {
      $('.todo-lst-item').show();
    } else if( $(this).data('filter') == '1' ) {
      $('input[type="checkbox"]:not(:checked)').each(function() {
        $(this).parent().show();
      });
      $('input[type="checkbox"]:checked').each(function() {
        $(this).parent().hide();
      });
    } else if( $(this).data('filter') == '2' ) {
      $('input[type="checkbox"]:not(:checked)').each(function() {
        $(this).parent().hide();
      });
      $('input[type="checkbox"]:checked').each(function() {
        $(this).parent().show();
      });
    } else {
      $('input[type="checkbox"]:checked').each(function() {
        $(this).parent().css({'opacity': 0, 'transform': 'translateX(100px)'});
        $(this).parent().addClass('removed');
        setTimeout(() => {
          $('.todo-lst-item.removed').remove();
          updateRemained();
        }, 300);
      });
    }
  });

  $('input[type=checkbox]').on('change', function() {
    updateRemained();
  });

  $('input[type=text]').on('keypress', function(e) {
    if (e.which == 13) {
      if( $(this).val() != '' ) {
        $('.todo-lst').prepend('<div class="todo-lst-item"><input type="checkbox" name="item_' + cur_itms + '" id="item_' + cur_itms + '"><label for="item_' + cur_itms + '">' + $(this).val() + '</label><button class="todo-lst-item__close"></button></div>');
        cur_itms++;
      }
      $(this).val('');
      $('.todo-lst').sortable({
        placeholderClass: 'todo-lst-item'
      });
      updateRemained();
    }
  });

  function updateRemained() {
    $('.todo-filter__remained span')[0].innerHTML = $('input[type="checkbox"]:not(:checked)').length;
  }
});