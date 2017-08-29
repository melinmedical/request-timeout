const requestTimeout = (fn, delay) => {
  if (!window.requestAnimationFrame) {
    return window.setInterval(fn, delay);
  }

  const time = {
    then: new Date().getTime(),
    now: null,
    delta: null,
  };
  const handler = {};
  const loop = () => {
    time.now = new Date().getTime();
    time.delta = time.now - time.then;

    if (time.delta >= delay) {
      fn.call();
    } else {
      handler.value = window.requestAnimationFrame(loop)
    }
  };

  handler.value = window.requestAnimationFrame(loop);

  return handler;
};
const clearRequestTimeout = (handler) => (
  window.cancelAnimationFrame(handler.value) || window.clearTimeout(handler.value)
);

export {
  clearRequestTimeout,
  requestTimeout,
};
