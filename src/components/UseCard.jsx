function UseCard({ user }) {
    const { firstName, lastName, photoUrl, age, gender, about } = user
  console.log("user in UseCard", user);
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://i.pravatar.cc/300"}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}
export default UseCard;
