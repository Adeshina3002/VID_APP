const now = new Date ()

// age = new Date ().getFullYear() - birthYear
//     // if (age >= 18) {
//     //      age 
//     //      return
//     // } else {
//     //      age 
//     // }
//     return age

// console.log(age);

const getAge = (birthYear) => {
    const age = new Date ().getFullYear() - birthYear
    return age
}

console.log(getAge(1928));
