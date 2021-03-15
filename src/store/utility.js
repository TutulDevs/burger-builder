export const updateObj = (oldObj, updatedVal) => {
  return {
    ...oldObj,
    ...updatedVal,
  };
};
