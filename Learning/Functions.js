// function add(a , b){
//     return a+b;
// }

// var add = function(a,b){
//     return a+b;
// }

// Arrow Function
// let add = (a,b) =>{return a+b};

let add = (a,b) => a+b;

let res = console.log(add(2,10));

// Automatically running a function without calling
(function(){
    console.log("Hello Div!")
})();


// Calling CallBack Function
/*
function CallBack(){
    console.log("Adding is Successfully Completed.")
}

let addition = function(a,b,CallBack){
    let res = a+b;
    console.log(res);
    CallBack();
}
addition(100,37367,CallBack);
*/

let addition = function (a,b,call){
    let res = a+b;
    console.log(res);
    call();
}

addition(10 , 20 , () => console.log("Addition Done!!"))
