import React, { Component, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/editProfile.sass";

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
  const skillRef = useRef();

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
    if(hobbyRef.current.value!= ""){
    prevHobbies.push(hobbyRef.current.value);
    }
    setHobbies([...prevHobbies]);
    // let hobs = [...profile.hobbies];
    // setProfile((hobs) => [...hobs, hobbyRef.current.value]);
    console.log("his hobby is:", hobbies);
    hobbyRef.current.value = "";
  };

  const addSkills = (e) => {
    e.preventDefault();
    let prevSkills = skills;
    if(skillRef.current.value!=""){
    prevSkills.push(skillRef.current.value);}
    setSkills([...prevSkills]);
    skillRef.current.value = "";
    console.log(EditedProfile)
  };

  useEffect(() => {
    document.title = `You clicked times`;
    console.log("This is USeEffect");
    const array = ["1", "2"];
  });

  const EditedProfile = {
    name: name,
    role: role,
    hobbies: hobbies,
    skills: skills
  }

  return (
    <form>
      <div className="form-group">
        <label for="inputFirstName">Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="inputFullName"
          placeholder="Full Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="inputRole">Role</label>
          <input
            type="text"
            name="role"
            className="form-control"
            id="inputRole"
            placeholder="Web Developer"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
        </div>
        <div className="form-group col-md-4">
          <label for="inputAddress2">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            className="form-control"
            id="inputHobbies"
            placeholder="Dancing, Hiking or Reading"
            ref={hobbyRef}
          />
        </div>
        <div className="form-group col-md-2">
          <button className="btn btn-primary" onClick={addHobby}>
            Add Hobbies
          </button>
        </div>
      </div>
      <div className="form-group">
        {hobbies.length > 0 ? hobbies.map(h => {console.log({h}); return <span id='hobbyTag' className="tags"> {h}</span>}
        ): null}
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="exampleFormControlSelect2">Skills</label>
          <input
            type="text"
            name="skills"
            className="form-control"
            id="inputSkills"
            placeholder="HTML, Javascript..."
            ref={skillRef}
          />
        </div>
        <div className="form-group col-md-2">
          <button className="btn btn-primary" onClick={addSkills}>
            Add Skills
          </button>
        </div>
      </div>
      <div className="form-group">
        {skills.map((s) => {
          return skills.length >= 1 ? (
            <span id='skillTag' className="tags"> {s} </span>
          ) : null;
        })}
      </div>
      <div className="form-row">
      <div className="form-group col-md-1">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
      <div className="form-group col-md-1">
        <button className="btn btn-primary">Cancel</button>
      </div>
      </div>
    </form>
  );
};

export default EditProfile;
