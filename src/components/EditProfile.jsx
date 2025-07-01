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
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
      {/* Form Section */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-md mb-8 lg:mb-0">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-[#1F1F1F] border-b border-[rgba(0,0,0,0.06)] pb-3">
            Edit Your Profile
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={saveProfile} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91] text-[#1F1F1F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91] text-[#1F1F1F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91] text-[#1F1F1F]"
                placeholder="Enter image URL"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91] text-[#1F1F1F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91] bg-white text-[#1F1F1F]"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F1F1F] mb-1">
                About
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] focus:outline-none focus:border-[#FF6F91] resize-none text-[#1F1F1F]"
                placeholder="Write something about yourself..."
              ></textarea>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#FF6F91] hover:bg-[#FF3C69] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Live Preview Section */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-[#1F1F1F]">
          Profile Preview
        </h2>
        <UseCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
    </div>
  );
}

export default EditProfile;
