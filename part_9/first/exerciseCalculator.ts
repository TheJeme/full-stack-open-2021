interface ratingTypes {
  rating: number
  ratingDescription: string
}

interface ExercisesResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const ratingTypes = (target: number, average: number): ratingTypes => {
  if (average < target) {
    return {rating: 3, ratingDescription: 'not to bad, but could be better'};
  } else if (average === target) {
    return {rating: 2, ratingDescription: 'good'};
  } else if (average > target) {
    return {rating: 1, ratingDescription: 'very good'};
  }
  return {rating: 3, ratingDescription: 'not to bad, but could be better'};
};

export const calculateExercises = (timeDailyHours: number[], target: number): ExercisesResult => {
  const periodLength = timeDailyHours.length;
  const trainingDays = timeDailyHours.filter(dh => dh > 0).length;
  const average: number = timeDailyHours.reduce((acc, curr) => acc += curr, 0) / timeDailyHours.length;
  const success = target <= average / timeDailyHours.length;
  const { rating, ratingDescription } = ratingTypes(target, average);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};
