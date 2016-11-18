(function() {
  'use strict';

  let expression = '';
  const $screenSpan = $('<span>');

  // DISPLAY NUMBERS TO SCREEN
  $('div.buttons').on('click', 'span', (event) => {
    const $target = $(event.target);
    if ($target.is('#clear') || $target.is('#equals')) {
      return;
    }
    expression += $target.text();
    $screenSpan.text(expression);
    $('div#screen').append($screenSpan);
  });

  // CALCULATE EXPRESSION
  $('div.buttons').on('click', '#equals', () => {
    let value = 0;
    let firstHalf = '';
    let lastHalf = '';
    // ADDITION
    if (expression.indexOf('+') > -1) {
      const plusIndex = expression.indexOf('+');
      firstHalf = parseInt(expression.slice(0, plusIndex));
      lastHalf = parseInt(expression.slice(plusIndex + 1));
      value = firstHalf + lastHalf;
      $('div#screen').empty();
      $screenSpan.text(value);
      $('div#screen').append($screenSpan);
    }
    // SUBTRACTION
    else if (expression.indexOf('-') > -1) {
      const minusIndex = expression.indexOf('-');
      firstHalf = parseInt(expression.slice(0, minusIndex));
      lastHalf = parseInt(expression.slice(minusIndex + 1));
      value = firstHalf - lastHalf;
      $('div#screen').empty();
      $screenSpan.text(value);
      $('div#screen').append($screenSpan);
    }
    // MULTIPLICATION
    else if (expression.indexOf('x') > -1) {
      const multiIndex = expression.indexOf('x');
      firstHalf = parseInt(expression.slice(0, multiIndex));
      lastHalf = parseInt(expression.slice(multiIndex + 1));
      value = firstHalf * lastHalf;
      $('div#screen').empty();
      $screenSpan.text(value);
      $('div#screen').append($screenSpan);
    }
    // DIVISION
    else if (expression.indexOf('÷') > -1) {
      const divideIndex = expression.indexOf('÷');
      firstHalf = parseInt(expression.slice(0, divideIndex));
      lastHalf = parseInt(expression.slice(divideIndex + 1));
      value = firstHalf / lastHalf;
      $('div#screen').empty();
      $screenSpan.text(value);
      $('div#screen').append($screenSpan);
    }
  });

  // CLEAR SCREEN
  const $clear = $('div.buttons').children().eq(0);

  $clear.click(() => {
    $('div#screen').empty();
    expression = '';
  });














})();

// function makeNumClickEvent(number, childIndex) {
//   const $number = $('div.buttons').children().eq(childIndex);
//
//   $('div.buttons').click('span', () => {
//     expression += $number.text()
//   })
// }
