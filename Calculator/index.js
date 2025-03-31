let math = require("./calculator");  
let a = 35;
let b = 15;
let oprator = "*";

function cal(a, b, oprator) {
    switch (oprator) {
        case "+":
            console.log(`result: ${math.addition(a, b)}`);
            break;
        case "-":
            console.log(`result: ${math.subtraction(a, b)}`);
            break;
        case "*":
            console.log(`result: ${math.multiplication(a, b)}`);
            break;
        case "/":
            console.log(`result: ${math.divison(a, b)}`);
            break;
        default:
            console.log("Invalid oprator");
    }
}

cal(a, b, oprator);