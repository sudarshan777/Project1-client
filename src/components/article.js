import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Article extends Component {
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
    this.setState({
      newComment: { body: e.target.value },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      newComment: {
        body: this.state.newComment.body,
        user: this.props.user.id,
      },
    });
    const newComment = this.state.newComment;
    if (this.props.loggedIn) {
      axios
        .post(
          "http://localhost:5000/articles/comment/" +
            this.props.match.params.id,
          newComment
        )
        .then((res) => console.log(res.data));
      console.log(newComment);
      this.setState({
        newComment: { body: "" },
      });
    }

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

          <ul className="list-group">
            {this.state.comments.map((comment, index) => {
              return (
                <li className="list-group-item" key={index}>
                  {comment.body} {/*by {comment.user.name} */}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container-fluid">
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
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(Article);
