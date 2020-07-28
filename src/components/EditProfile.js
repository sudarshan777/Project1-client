import React, { Component, useState, useRef } from "react";
import { Link } from "react-router-dom";

const EditProfile = (props) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [skills, setSkills] = useState([]);

  // const [profile, setProfile] = useState({
  //   name: "",
  //   role: "",
  //   hobbies: [],
  //   skills: [],
  // });

  const hobbyRef = useRef();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   console.log("Name:", profile.name);
  //   console.log("role:", profile.role);
  // };

  const addHobby = (e) => {
    e.preventDefault();
    console.log("hobby is:", hobbyRef.current.value);
    let prevHobbies = hobbies;
    prevHobbies.push(hobbyRef.current.value);
    setHobbies(prevHobbies);
    // let hobs = [...profile.hobbies];
    // setProfile((hobs) => [...hobs, hobbyRef.current.value]);
    console.log("his hobby is:", hobbies);
    hobbyRef.current.value = "";
  };

  return (
    <form>
      <div class="form-group">
        <label for="inputFirstName">Full Name</label>
        <input
          type="text"
          name="name"
          class="form-control"
          id="inputFullName"
          placeholder="Full Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputRole">Role</label>
          <input
            type="text"
            name="role"
            class="form-control"
            id="inputRole"
            placeholder="Web Developer"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
        </div>
        <div class="form-group col-md-4">
          <label for="inputAddress2">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            class="form-control"
            id="inputHobbies"
            placeholder="Dancing, Hiking or Reading"
            ref={hobbyRef}
          />
        </div>
        <div className="form-group col-md-2">
          <button className="btn btn-primary" onClick={addHobby}>
            Add
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">Skills</label>
        <input
          type="text"
          name="skills"
          class="form-control"
          id="inputSkills"
          placeholder="HTML, Javascript..."
        />
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
};

export default EditProfile;
