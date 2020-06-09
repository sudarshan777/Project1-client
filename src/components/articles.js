import React, { Component } from "react";
import axios from "axios";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      user: "",
      comment: [],
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
          comment: response.data.comment,
        });
      })
      .catch((error) => console.log(error));
  }

  //   onSubmit = (e) => {
  //     e.preventDefault();

  //     const exercise = {
  //       username: this.state.username,
  //       description: this.state.description,
  //       duration: this.state.duration,
  //       date: this.state.date,
  //     };

  //     axios
  //       .post(
  //         "https://quiet-brushlands-94117.herokuapp.com/exercises/update/" +
  //           this.props.match.params.id,
  //         exercise
  //       )
  //       .then((res) => console.log(res.data));
  //     console.log(exercise);

  //     window.location = "/";
  //   };

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Comment: </label>

            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
