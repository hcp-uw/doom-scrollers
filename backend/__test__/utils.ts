export const generateMockRequest = (payload: object) => {
  return {
    json: async () => payload,
  };
};
