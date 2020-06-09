import React, { Component } from "react";
import axios from "axios";

export default class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      user: "",
    };
  }

  //   componentDidMount() {
  //     axios.get("http://localhost:5000/users/").then((response) => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map((user) => user.username),
  //           username: response.data[0].username,
  //         });
  //       }
  //     });
  //   }
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
    const user = JSON.parse(localStorage.getItem("user"));

    const article = {
      title: this.state.title,
      body: this.state.body,
      user: user.id,
    };

    axios
      .post("http://localhost:5000/articles/add", article)
      .then((res) => console.log(res.data));
    console.log(article);

    window.location = "/article-list";
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
