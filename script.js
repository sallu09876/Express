// To find the second largest number in an array :-

// let num = [10, 35, -30, 45, -50, 50, -20]
// let num = [-2, -4, -1, -7, -5, 0]

// let largest = -Infinity;
// let secondLargest = -Infinity;

// for (let i = 0; i < num.length; i++) {
//     if (num[i] > largest) {
//         secondLargest = largest;
//         largest = num[i];
//     } else if (num[i] > secondLargest && num[i] !== largest) {
//         secondLargest = num[i];
//     }
// }
// console.log("The second largest number is: " + secondLargest);



// To find a number is palindrome or not :-

// let str = "malayalam";
// str = str.toLowerCase();
// let bag = "";

// for (let i = str.length - 1; i >= 0; i--) {
//     bag += str[i];
// }

// if (bag === str) {
//     console.log(str + " is a palindrome");
// } else {
//     console.log(str + " is not a palindrome");
// }



// To find a number is Armstrong or not :-

// let num = 153;
// let sum = 0;
// let temp = num;
// let power = num.toString().length;

// while (temp > 0) {
//   let digit = temp % 10;
//   sum += Math.pow(digit, power);
//   temp = Math.floor(temp / 10);
// }

// if (sum === num) {
//   console.log(num + " is an Armstrong number");
// } else {
//   console.log(num + " is not an Armstrong number");
// }



// js working, code exexcution, memmory allocation, call stack
// react working


// password hashing

