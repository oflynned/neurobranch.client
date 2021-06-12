export const getHeaders = (uid: string, token: string) => {
  return {
    headers: {
      'x-firebase-uid': uid,
      Authorization: `Bearer ${token}`,
    },
  };
};
