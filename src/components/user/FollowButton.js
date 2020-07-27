import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  followUser,
  unFollowUser,
} from "../../redux/actions/get-user";

const FollowButton = () => {
  const dispatch = useDispatch();
  const following = useSelector(
    (state) => state.userReducer.following,
    shallowEqual
  );
  // Logged In user id
  const { id } = useSelector((state) => state.authReducer.user);
  // Follow User Id
  const { _id } = useSelector((state) => state.userReducer.user);
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const [isFollowed, setFollowed] = useState(false);

  useEffect(() => {
    const result = following.find((user) => user._id === _id);
    if (result) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
 
  }, [following, _id]);

  const handleFollow = (e) => {
    if (!isFollowed) {
      dispatch(followUser(id, _id));
    } else {
      dispatch(unFollowUser(id, _id));
      setFollowed(false);
    }
  };

  return (
    <>
      <button
        type="button"
        style={
          isFollowed
            ? { backgroundColor: "#007bff" }
            : { backgroundColor: "#fff", color: "#007bff" }
        }
        className="btn btn-success btn-block"
        onClick={handleFollow}
        disabled={!loggedIn}
      >
        Follow
      </button>
    </>
  );
};
export default FollowButton;
