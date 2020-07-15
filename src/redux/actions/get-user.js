import * as Types from "./types";

export const getUser = (_id) => ({
  type: Types.GET_USER,
  _id,
});
export const getBookmarks = (_id) => ({
  type: Types.GET_BOOKMARKS,
  _id,
});

export const getFollowers = (_id) => ({
  type: Types.GET_FOLLOWERS,
  _id,
});

export const getFollowing = (_id) => ({
  type: Types.GET_FOLLOWING,
  _id,
});

export const followUser = (user_id, follow_id) => ({
  type: Types.FOLLOW_USER,
  user_id,
  follow_id,
});

export const unFollowUser = (user_id, unfollow_id) => ({
  type: Types.UN_FOLLOW_USER,
  user_id,
  unfollow_id,
});
