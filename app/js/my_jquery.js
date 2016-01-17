/**
 * Created by Peter on 17.01.2016.
 */
'use strict';

//// enter edit mode by clicking on the PCS field, exit edit mode by clicking outside the edit field
$(document).ready(function() {
  // 1. bind click event to the PCS field
  console.log('jquery works!');
  $('.order-list').on('click', '.pcs-field', function() {
    console.log('jquery click');
    // 1.1. change details pane to edit pane on click event
    var thisOrder = $(this).closest('.order-list');
    thisOrder.addClass('changing');
    thisOrder.find('.button-change').html('Confirm');
    thisOrder.find('.show-details').css({'display' : 'none'});
    thisOrder.find('.edit-details').css({'display' : 'block'});
  });
  // 2. bind blur event to the edit field
  // 2.1. change edit pane to details pane on blur event

});
