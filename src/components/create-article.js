import React, { Component } from "react";
import { connect } from "react-redux";
import { createArticleDetailsSubmit } from "../redux/actions/articlesActions";

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      user: "",
    };
  }

  componentDidMount() {
    console.log(this.props.user);
  }
  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onChangeBody = (e) => {
    this.setState({
      body: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));

    const article = {
      title: this.state.title,
      body: this.state.body,
      user: this.props.user.id,
    };

    // axios
    //   .post("http://localhost:5000/articles/add", article)
    //   .then((res) => console.log(res.data));
    console.log(article);

    this.props.dispatch(createArticleDetailsSubmit(article));

    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h3>Create New Article</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Body: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.body}
              onChange={this.onChangeBody}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Article"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  // console.log("Article" + JSON.stringify(state.articleDetails));
  return {
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(CreateArticle);
