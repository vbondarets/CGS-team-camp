export type TError = {
  message: string;
  response: {
    status: number;
    data: {
      message: string;
    };
  };
};
