export const userActionTypes = {
  UPDATE_USER_STATUS: "UPDATE_USER_STATUS"
};

export const loginUser = () => {
  return { type: userActionTypes.UPDATE_USER_STATUS };
};