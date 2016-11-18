(function() {
  'use strict';

  const $screenSpan = $('<span>');
  let output = '';

  // DECIMAL BUTTON
  $('l-row').children().eq(1).click((event) => {
    const $target = $(event).target;
    output += $target.text();
  });

  // DISPLAY NUMBERS & OPERATORS TO SCREEN
  $('div.buttons').on('click', 'span', (event) => {
    const $target = $(event.target);
    if ($target.is('#clear') || $target.is('#equals')) {
      return;
    }
    output += $target.text();
    $screenSpan.text(output);
    $('div#screen').append($screenSpan);
  });

  // CALCULATE OUTPUT
  $('div.buttons').on('click', '#equals', () => {
    console.log(output);
    const regex = output.match(/(\-?\d*\.?\d*)(\+|\-|\÷|\x)(\-?\d*\.?\d*)/);
    console.log(regex);
    const regexPlus = /(\-?\d*\.?\d+)(\+)(\-?\d*\.?\d+)/.test(output);
    const regexMinus = /(\-?\d*\.?\d+)(\-)(\-?\d*\.?\d+)/.test(output);
    const regexMulti = /(\-?\d*\.?\d+)(\x)(\-?\d*\.?\d+)/.test(output);
    const regexDivide = /(\-?\d*\.?\d+)(\÷)(\-?\d*\.?\d+)/.test(output);
    // ADDITION
    if (regexPlus) {
      output = parseFloat(regex[1]) + parseFloat(regex[3]);
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }
    // SUBTRACTION
    else if (regexMinus) {
      output = parseFloat(regex[1]) - parseFloat(regex[3]);
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }
    // MULTIPLICATION
    else if (regexMulti) {
      output = parseFloat(regex[1]) * parseFloat(regex[3]);
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }
    // DENOMINATOR IS ZERO
    else if (regex[3] == 0) {
      output = 'ERROR';
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }
    // DIVISION
    else if (regexDivide) {
      output = parseFloat(regex[1]) / parseFloat(regex[3]);
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }
    // DENOMINATOR IS ZERO
    else {
      output = 'ERROR';
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }

  });

  // CLEAR SCREEN
  const $clear = $('div.buttons').children().eq(0);

  $clear.click(() => {
    output = '';
    $('div#screen').empty();
  });

  // KEYDOWN EVENTS
  $('html').on('keydown', (event) => {
    const $target = event.target;
      if (/[0-9\+\-\x\/\*]/.test(event.key)) {
        if (event.key === '/') {
          output += '÷';
          $screenSpan.text(output);
          $('div#screen').append($screenSpan);
        } else if (event.key === '*') {
          output += 'x';
          $screenSpan.text(output);
          $('div#screen').append($screenSpan);
        }
        else {
          console.log(typeof event.key);
          output += event.key;
          $screenSpan.text(output);
          $('div#screen').append($screenSpan);
        }
      }

  });













})();

// function makeNumClickEvent(number, childIndex) {
//   const $number = $('div.buttons').children().eq(childIndex);
//
//   $('div.buttons').click('span', () => {
//     output += $number.text()
//   })
// }
