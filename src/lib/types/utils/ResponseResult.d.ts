type ResponseWithResult<T> = {
  result: { [P in keyof T]: T[P] };
};
