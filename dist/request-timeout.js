"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requestTimeout = function requestTimeout(fn, delay) {
  if (!window.requestAnimationFrame) {
    return window.setInterval(fn, delay);
  }

  var time = {
    then: new Date().getTime(),
    now: null,
    delta: null
  };
  var handler = {};
  var loop = function loop() {
    time.now = new Date().getTime();
    time.delta = time.now - time.then;

    if (time.delta >= delay) {
      fn.call();
    } else {
      handler.value = window.requestAnimationFrame(loop);
    }
  };

  handler.value = window.requestAnimationFrame(loop);

  return handler;
};
var clearRequestTimeout = function clearRequestTimeout(handler) {
  return window.cancelAnimationFrame(handler.value) || window.clearTimeout(handler.value);
};

exports.clearRequestTimeout = clearRequestTimeout;
exports.requestTimeout = requestTimeout;
