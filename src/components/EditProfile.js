import React, { Component } from "react";

class EditProfile extends Component {
  state = {};
  render() {
    return (
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputFirstName">First Name</label>
            <input
              type="text"
              class="form-control"
              id="inputFirstName"
              placeholder="First Name"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputLastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="inputLastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputRole">Role</label>
            <input
              type="text"
              class="form-control"
              id="inputRole"
              placeholder="Web Developer"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputAddress2">Hobbies</label>
            <input
              type="text"
              class="form-control"
              id="inputHobbies"
              placeholder="Dancing, Hiking or Reading"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect2">Skills</label>
          <select multiple class="form-control" id="SkillSelect">
            <option>HTML</option>
            <option>CSS</option>
            <option>Javascript</option>
            <option>Java</option>
            <option>C++</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </div>
        <div class="form-group col-md-2">
          <button class="btn btn-primary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default EditProfile;
