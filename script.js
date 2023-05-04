(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showCurrentMonth = showCurrentMonth;
var daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
var daysOfWeekLarge = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();
function nextMonth() {
  if (month === 11) {
    month = 0;
    year++;
  } else {
    month++;
  }
  showCurrentMonth();
}
function previousMonth() {
  if (month === 0) {
    month = 11;
    year--;
  } else {
    month--;
  }
  showCurrentMonth();
}
function showCurrentMonth() {
  showMounth(year, month);
}
function showMounth(y, m) {
  // First day of the week in the selected month
  var firstDayOfMonth = new Date(y, m, 1).getDay();
  // Last day of the selected month
  var lastDateOfMonth = new Date(y, m + 1, 0).getDate();
  // Last day of the previous month
  var lastDayOfLastMonth = m === 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  var html = '';

  // Write the header of the days of the week
  for (var _i = 0; _i < daysOfWeek.length; _i++) {
    html += '<div class="calendar__item day--week">' + daysOfWeek[_i] + '</div>';
  }

  // Write the days
  // Write the days
  var i = 1;
  do {
    var dow = new Date(y, m, i).getDay();

    // If Sunday, start new row
    if (dow === 0) {
      html += '';
    } else if (i === 1) {
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<div class="calendar__item prev--month">' + k + '</div>';
        k++;
      }
    }

    // Write the current day in the loop
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY === year && chkM === month && i === day) {
      html += '<div class="calendar__item current--day">' + i + '</div>';
    } else {
      html += '<div class="calendar__item current--month">' + i + '</div>';
    }
    // If Saturday, closes the row
    if (dow === 6) {
      html += '';
    } else if (i === lastDateOfMonth) {
      var _k = 1;
      for (dow; dow < 6; dow++) {
        html += '<div class="calendar__item next--month">' + _k + '</div>';
        _k++;
      }
    }
    i++;
  } while (i <= lastDateOfMonth);

  // Write selected month and year
  document.getElementById('month').innerHTML = monthsOfYear[m] + ' ' + y;
  // Write HTML to the div
  document.getElementById('calendar').innerHTML = html;
  // Wirte the current day on this format, week day of month, year
  var datHtml = daysOfWeekLarge[date.getDay()] + ' ' + date.getDate() + ' de ' + monthsOfYear[date.getMonth()] + ' de ' + date.getFullYear();
  document.getElementById('date').innerHTML = datHtml;
}
if (document.querySelector('.calendar')) {
  document.querySelector('.calendar__header').addEventListener('click', function (e) {
    if (e.target.matches('#btnNext')) {
      nextMonth();
    }
    if (e.target.matches('#btnPrev')) {
      previousMonth();
    }
  });
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clock = clock;
function clock() {
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  document.getElementById('secondHand').className = 'second--' + seconds;
  document.getElementById('minuteHand').className = 'minute--' + minutes;
  document.getElementById('hourHand').className = 'hour--' + hours;
  window.setInterval(function () {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var session = 'am';
    if (hours === 0) hours = 12;
    if (hours > 12) {
      hours = hours - 12;
      session = 'pm';
    }
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    var timeString = hours + ':' + minutes + ':' + seconds + ' ' + session;
    document.getElementById('time').innerHTML = timeString;
  }, 1000);
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countDown = countDown;
var _parseDate = require("../utils/parseDate.js");
var timeHtml = document.querySelector(".countdown");
function countDown() {
  var countDown = setInterval(function () {
    var dateFinish = new Date('2023-05-11T23:00:00');
    var dateNow = new Date();
    var dateDiff = dateFinish.getTime() - dateNow.getTime();
    var days = (0, _parseDate.parseTime)(Math.floor(dateDiff / (1000 * 60 * 60 * 24)));
    var hours = (0, _parseDate.parseTime)(Math.floor(dateDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    var minutes = (0, _parseDate.parseTime)(Math.floor(dateDiff % (1000 * 60 * 60) / (1000 * 60)));
    var seconds = (0, _parseDate.parseTime)(Math.floor(dateDiff % (1000 * 60) / 1000));
    timeHtml.innerHTML = "\n        <h2>".concat((0, _parseDate.parseDate)(dateFinish), "</h2>\n        <div class=\"countdown-time\">\n            <div class=\"countdown-item\">\n              <span class=\"label-title\">D</span>\n              <span class=\"label-number\">").concat(days, "</span>\n            </div>\n            <div class=\"countdown-item\">\n              <span class=\"label-title\">H</span>\n              <span class=\"label-number\">").concat(hours, "</span>\n            </div>\n            <div class=\"countdown-item\">\n              <span class=\"label-title\">M</span>\n              <span class=\"label-number\">").concat(minutes, " </span>\n            </div>\n            <div class=\"countdown-item\">\n              <span class=\"label-title\">S</span>\n              <span class=\"label-number\">").concat(seconds, "</span>\n            </div>\n        </div>\n        <p>Tiempo restante para entregar el ecomerce</p>\n    "); /* HTML */

    if (dateDiff < 0) {
      clearInterval(countDown);
      timeHtml.innerHTML = "\n      <h2>Se acabo el tiempo...</h2>\n        <div class=\"box_img\">\n            <img src=\"../img/23.jpg\" alt=\"llorando\">\n        </div>\n      <p>Mentiras, si viste esto, tomale SS y escribeme al interno</p>\n        ";
    }
  }, 1000);
}

},{"../utils/parseDate.js":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printPhrase = printPhrase;
var currentDay = new Date().getDay();
var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var emojis = ['😴', '😮‍💨', '🙂', '🫡', '😉', '🥳', '😎'];
var currentDayName = days[currentDay];
var emojiPerDayOfWeek = emojis[currentDay];
var programmingPhrases = [{
  day: 0,
  dayName: 'Domingo',
  phrases: [{
    text: 'Un buen programador es aquel que siempre mira a ambos lados de una solución antes de implementarla',
    author: 'Jamie Zawinski'
  }, {
    text: 'La programación es la mejor forma de decirle al ordenador lo que quieres que haga',
    author: 'Brian Kernighan'
  }]
}, {
  day: 1,
  dayName: 'Lunes',
  phrases: [{
    text: 'La programación es un arte. Al igual que todas las artes, requiere de práctica, dedicación y aprendizaje constante',
    author: 'Matt Mullenweg'
  }, {
    text: 'El éxito en la programación depende de aprender cómo se piensa antes que de aprender cómo se programa',
    author: 'John Carmack'
  }]
}, {
  day: 2,
  dayName: 'Martes',
  phrases: [{
    text: 'Programar no es solo escribir código, es pensar',
    author: 'John Romero'
  }, {
    text: 'El código es el arte que enseña al ordenador a hacer algo interesante',
    author: 'H. G. Wells'
  }]
}, {
  day: 3,
  dayName: 'Miércoles',
  phrases: [{
    text: 'El arte de la programación consiste en construir programas eficientes y mantenibles',
    author: 'Robert Martin'
  }, {
    text: 'La programación es la construcción de sistemas complejos mediante la resolución de problemas simples',
    author: 'Damian Conway'
  }]
}, {
  day: 4,
  dayName: 'Jueves',
  phrases: [{
    text: 'No hay programadores buenos o malos, solo hay programadores que escriben código que funciona y programadores que escriben código que no funciona',
    author: 'Guido van Rossum'
  }, {
    text: 'La programación no es solo sobre escribir código, es sobre solucionar problemas',
    author: 'Linda Liukas'
  }]
}, {
  day: 5,
  dayName: 'Viernes',
  phrases: [{
    text: 'La programación es un arte, pero también es una ciencia. Es un arte porque requiere creatividad y es una ciencia porque requiere lógica',
    author: 'Bill Gates'
  }, {
    text: 'La programación es como construir un castillo de naipes, un pequeño error puede hacer que todo se desmorone',
    author: 'Mark Zuckerberg'
  }]
}, {
  day: 6,
  dayName: 'Sábado',
  phrases: [{
    text: 'La programación es la habilidad de decirle al ordenador lo que quieres que haga. La verdadera habilidad es decirle al ordenador cómo resolver problemas',
    author: 'Grace Hopper'
  }, {
    text: 'La programación es la mejor manera de aprender cómo funcionan las cosas',
    author: 'Douglas Crockford'
  }]
}];
var currentPhrases = programmingPhrases.find(function (phrase) {
  return phrase.day === currentDay;
}).phrases;
var randomPhrase = currentPhrases[Math.floor(Math.random() * currentPhrases.length)];
function printPhrase() {
  var phrases = "\xA1Hoy es ".concat(currentDayName, " ").concat(emojiPerDayOfWeek, "! \"").concat(randomPhrase.text, "\" - ").concat(randomPhrase.author);
  document.querySelector('.phrases').innerHTML = phrases;
}

},{}],5:[function(require,module,exports){
"use strict";

var _clock = require("./components/clock.js");
var _calendar = require("./components/calendar.js");
var _phrases = require("./components/phrases.js");
var _countdown = require("./components/countdown.js");
// Start the clock
if (document.querySelector('.clock')) (0, _clock.clock)();
if (document.querySelector('.calendar')) (0, _calendar.showCurrentMonth)();
if (document.querySelector('.phrases')) (0, _phrases.printPhrase)();
if (document.querySelector('.countdown')) (0, _countdown.countDown)();

},{"./components/calendar.js":1,"./components/clock.js":2,"./components/countdown.js":3,"./components/phrases.js":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDate = parseDate;
exports.parseTime = parseTime;
function parseTime(time) {
  return time.toString().padStart(2, '0');
}
function parseDate(date) {
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
}

},{}]},{},[5]);
