export const getTeachingPlanTitle = (majors) => {
  return majors.map((major) => major.name).join(", ");
};
