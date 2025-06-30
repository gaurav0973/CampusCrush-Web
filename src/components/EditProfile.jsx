/* eslint-disable no-unused-vars */
import { useState } from "react";
import UseCard from "./UseCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age ? Number(user.age) : "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age: age ? Number(age) : null,
          gender,
          about,
        },
        { withCredentials: true }
      );
      console.log("save profile called", res?.data?.data);
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError("Failed to save profile. Please try again.");
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-4 min-h-screen bg-base-200">
      {/* Form Section */}
      <div className="card bg-base-100 w-full max-w-sm shadow-md">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
          <form onSubmit={saveProfile} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value ? Number(e.target.value) : "")
                }
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered"
              ></textarea>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Live Preview Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <UseCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
    </div>
  );
}

export default EditProfile;
