/* eslint-disable no-multiple-empty-lines*/
(function() {
  'use strict';

  const $screen = $('#screen');
  let expression = '';
  let total;

  // CLEAR SCREEN
  $('#clear').click(() => {
    expression = '';
    total = '';
    $screen.text(expression);
  });

  // DISPLAY NUMBERS & OPERATORS ON BUTTON CLICK
  $('.buttons').on('click', 'span', (event) => {
    const $target = $(event.target);

    if ($target.is('#clear') || $target.is('#equals')) {
      return;
    }

    // CLEAR SCREEN AFTER ERROR
    // if ($screen.text() === 'Error') {
    //   $('span').one('click', () => {
    //     expression = '';
    //     $screen.text(expression);
    //   });
    // }

    expression += $target.text();
    $screen.text(expression);
  });

  const calculate = function() {
    const regex = /^(\-?\d+\.?\d*)(\+|\-|x|÷)(\-?\d+\.?\d*)$/;

    const expRegex = $screen.text().match(regex);

    if (expRegex === null) {
      expression = 'Error';
      $screen.text(expression);

      return;
    }

    const operator = expRegex[2];
    const value1 = parseFloat(expRegex[1]);
    const value2 = parseFloat(expRegex[3]);

    if (operator === '+') {
      total = value1 + value2;
    }
    else if (operator === '-') {
      total = value1 - value2;
    }
    else if (operator === 'x') {
      total = value1 * value2;
    }
    else if (operator === '÷') {
      if (value2 === 0) {
        total = 'Error';

        return;
      }

      total = value1 / value2;
    }
  };

  // EVALUATE ON CLICK EQUALS
  $('#equals').click(() => {
    if (expression === '') {
      expression = 'Error';

      return;
    }

    calculate();

    if (total === Math.round(total)) {
      expression = total;
    }
    else {
      if (String(total).length <= 4) {
        expression = total.toFixed(2);
      }
      else if (String(total).length <= 8) {
        expression = total.toFixed(4);
      }
      else {
        expression = total.toFixed(8);
      }
    }

    $screen.text(expression);
    expression = '';
  });

  $('html').on('keydown', (event) => {
    if (/[0-9+\-x/*]/.test(event.key)) {
      if (event.key === '/') {
        expression += '÷';
        $screen.text(expression);
      }
      else if (event.key === '*') {
        expression += 'x';
        $screen.text(expression);
      }
      else {
        expression += event.key;
        $screen.text(expression);
      }
    }
    else if (event.key === 'Enter') {
      calculate();

      if (total === Math.round(total)) {
        expression = total;
      }
      else {
        if (String(total).length <= 4) {
          expression = total.toFixed(2);
        }
        else if (String(total).length <= 8) {
          expression = total.toFixed(4);
        }
        else {
          expression = total.toFixed(8);
        }
      }

      $screen.text(expression);
      expression = '';
    }
    else if (event.key === 'Backspace') {
      expression = '';
      total = '';
      $screen.text(expression);
    }
  });
})();
