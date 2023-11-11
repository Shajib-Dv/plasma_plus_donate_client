/** @format */

import getCurrentUser from "../utils/getCurrentUser";

const useCurrentUser = () => {
  const { currentUser } = getCurrentUser();
  return { ...currentUser, currentUser };
};

export default useCurrentUser;
