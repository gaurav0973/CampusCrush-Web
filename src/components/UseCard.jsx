function UseCard({ user }) {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://i.pravatar.cc/300"}
          alt={`${firstName || "User"} ${lastName || ""}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName || "Unknown"} ${lastName || ""}`}</h2>
        <p>
          {age ? `${age}` : "Age not specified"} |{" "}
          {gender ? `${gender}` : "Gender not specified"}
        </p>
        <p>{about || "No description provided."}</p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}
export default UseCard;
