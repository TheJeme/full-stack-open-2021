export const calculateBmi = (length: number, weight: number) => {
  const BMI = weight/Math.pow(length/100, 2);
  if (BMI < 18.5) {
    return "Underweight";
  }else if (BMI < 25) {
    return "Normal";
  } else if (BMI < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

//const height = Number(process.argv[2]);
//const weight = Number(process.argv[3]);

//console.log(calculateBmi(height, weight));