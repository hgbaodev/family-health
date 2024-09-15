export const formatErrors = (res) => {
  return Object.keys(res.errors).map((key) => ({
    name: key,
    errors: res.errors[key],
  }));
};
