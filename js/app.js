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
  const calculate = function() {
    const regex = output.match(/(-?\d*\.?\d*)(\+|-|÷|x)(-?\d*\.?\d*)/);
    const regexPlus = /(-?\d*\.?\d+)(\+)(-?\d*\.?\d+)/.test(output);
    const regexMinus = /(-?\d*\.?\d+)(-)(-?\d*\.?\d+)/.test(output);
    const regexMulti = /(-?\d*\.?\d+)(x)(-?\d*\.?\d+)/.test(output);
    const regexDivide = /(-?\d*\.?\d+)(÷)(-?\d*\.?\d+)/.test(output);

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
    else if (regex[3] === 0) {
      output = 'ERROR';
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }

    // DIVISION
    else if (regexDivide) {
      output = (parseFloat(regex[1]) / parseFloat(regex[3])).toFixed(13);
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }

    // NONSENSE INPUT
    else {
      output = 'ERROR';
      $('div#screen').empty();
      $screenSpan.text(output);
      $('div#screen').append($screenSpan);
    }
  };

  $('div.buttons').on('click', '#equals', calculate);
  $('html').on('keydown', (event) => {
    if (event.key === 'Enter') {
      calculate();
    }
  });

  // CLEAR SCREEN
  const $clear = $('div.buttons').children().eq(0);

  $clear.click(() => {
    output = '';
    $('div#screen').empty();
  });

  $('html').on('keydown', (event) => {
    if (event.key === 'Backspace') {
      output = '';
      $('div#screen').empty();
    }
  });

  // KEYDOWN EVENTS
  $('html').on('keydown', (event) => {
    if (/[0-9+-x/*]/.test(event.key)) {
      if (event.key === '/') {
        output += '÷';
        $screenSpan.text(output);
        $('div#screen').append($screenSpan);
      }
      else if (event.key === '*') {
        output += 'x';
        $screenSpan.text(output);
        $('div#screen').append($screenSpan);
      }
      else {
        output += event.key;
        $screenSpan.text(output);
        $('div#screen').append($screenSpan);
      }
    }
  });
})();
