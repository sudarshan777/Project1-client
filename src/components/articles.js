import React, { Component } from "react";
import axios from "axios";

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      user: "",
      comments: [],
      newComment: {
        body: "",
        user: "",
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/articles/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          body: response.data.body,
          user: response.data.user,
          comments: response.data.comments,
        });
      })
      .catch((error) => console.log(error));

    setTimeout(console.log(this.state), 5000);
  }
  onChange = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));

    this.setState({
      newComment: { body: e.target.value, user: user.id },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newComment = this.state.newComment;

    axios
      .post(
        "http://localhost:5000/articles/comment/" + this.props.match.params.id,
        newComment
      )
      .then((res) => console.log(res.data));
    console.log(newComment);
    // window.location = "/";
  };

  commentsList = () => {
    if (this.state.comments.length > 0) {
      return (
        <div>
          <h6>
            {" "}
            <b>Comments</b>
          </h6>
          <p>
            {this.state.comments.map((comment, index) => {
              return (
                <li key={index}>
                  {comment.body} by {comment.user.name}
                </li>
              );
            })}
          </p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <p>{this.state.body}</p>
        <h6>
          <b>Author - </b> {this.state.user.name}
        </h6>
        <hr />
        {this.commentsList()}
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Add Comments </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.newComment.body}
              onChange={this.onChange}
            />

            <input
              type="submit"
              value="Add comment"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
