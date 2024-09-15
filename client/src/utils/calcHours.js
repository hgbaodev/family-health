export const calcHours = (record, subject) => {
  const { theory_hours, lab_hours, exercise_hours } = subject;
  const { theory_group_count, exercise_group_count, lab_group_count } = record;
  return (
    (theory_group_count ?? 0) * theory_hours +
    (lab_group_count ?? 0) * lab_hours +
    (exercise_group_count ?? 0) * exercise_hours
  );
};
