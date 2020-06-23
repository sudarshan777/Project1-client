import * as Types from "./types";

export const getUser = (_id) => ({
  type: Types.GET_USER,
  _id,
});
