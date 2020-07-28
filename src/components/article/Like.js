import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  postLikeArticle,
  deleteLikeArticle,
} from "../../redux/actions/articlesActions";

const Like = () => {
  const likes = useSelector(
    (state) => state.articlesReducer.likes,
    shallowEqual
  );
  const { _id } = useSelector(
    (state) => state.articlesReducer.article,
    shallowEqual
  );
  const { id } = useSelector((state) => state.authReducer.user);
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const dispatch = useDispatch();

  const [isLiked, setLike] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [showLikes, setShowLikes] = useState(false);
  useEffect(() => {
    const result = likes.find(({ user }) => user._id === id);
    if (result) {
      setLike(true);
      setLikeId(result._id);
    } else {
      setLike(false);
      setLikeId("");
    }
  }, [likes, _id]);

  const handleLike = () => {
    //_id  article id
    // id current user id
    if (!isLiked) {
      dispatch(postLikeArticle(_id, id));
    } else {
      dispatch(deleteLikeArticle(likeId));
      setLike(false);
      setLikeId("");
    }
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Likes {likes.length}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {likes.map(({ user }) => {
            return (
              <Link
                className="dropdown-item"
                key={user._id}
                to={"/user/" + user._id}
              >
                {user.name}
              </Link>
            );
          })}
        </div>
      </div>
      <button
        style={
          isLiked
            ? { backgroundColor: "#007bff" }
            : { backgroundColor: "#fff", color: "#007bff" }
        }
        className="btn btn-primary"
        onClick={handleLike}
        disabled={!loggedIn}
      >
        Like
      </button>
    </>
  );
};

export default Like;
