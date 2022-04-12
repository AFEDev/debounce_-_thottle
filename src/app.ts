console.log("*****************Debounce*****************");

/**forces a function to wait a certain amount of time before running again.  */

const debounce = (fn:Function, ms:number) => {
  let timeout:number;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    setTimeout(fnCall, ms);
  };
};

interface KeyboardEventOnInputField extends KeyboardEvent {
    target: HTMLInputElement;
  }
  
let onChange = function (e: KeyboardEventOnInputField) {
  console.log(e.target.value);
}

onChange = debounce(onChange, 1000);

document.getElementById("search").addEventListener("keyup", onChange);

console.log("*****************Throttle*****************")

/**used to call a function after every millisecond or a particular interval of time only the first click is executed immediately */

function thottle(func:Function, ms:number) {
  let isThrottle = false;
  let savedArgs:IArguments;
  let savedThis:Window;

  function wrapper() {
    if (isThrottle) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments);

    isThrottle = true;

    setTimeout(function () {
      isThrottle = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}


let mauseMove = function () {
  console.log(new Date());
}

mauseMove = thottle(mauseMove, 3000);

setInterval(mauseMove, 10000);