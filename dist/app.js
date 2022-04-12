console.log("*****************Debounce*****************");
const debounce = (fn, ms) => {
    let timeout;
    return function () {
        const fnCall = () => {
            fn.apply(this, arguments);
        };
        clearTimeout(timeout);
        setTimeout(fnCall, ms);
    };
};
let onChange = function (e) {
    console.log(e.target.value);
};
onChange = debounce(onChange, 1000);
document.getElementById("search").addEventListener("keyup", onChange);
console.log("*****************Throttle*****************");
function thottle(func, ms) {
    let isThrottle = false;
    let savedArgs;
    let savedThis;
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
};
mauseMove = thottle(mauseMove, 3000);
setInterval(mauseMove, 10000);
