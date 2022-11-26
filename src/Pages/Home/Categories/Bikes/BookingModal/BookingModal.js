import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import toast from "react-hot-toast";

const BookingModal = ({ bikeData, setBikeData }) => {
  const { user } = useContext(AuthContext);
  const { _id, Bike, price, img } = bikeData;

  const handleModal = (event) => {
    event.preventDefault();
    const form = event.target;
    const phone = form.phone.value;
    const location = form.location.value;

    const booking = {
      name: user?.displayName,
      email: user?.email,
      bikeId: _id,
      bikeModel: Bike,
      price: price,
      img: img,
      phone,
      location,
    };
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Your booking has been success");
          form.reset();
          setBikeData(null);
        }
      });

    console.log(booking);
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{bikeData.Bike}</h3>
          <form onSubmit={handleModal}>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                disabled
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                defaultValue={user?.email}
                disabled
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text">Bike</span>
              </label>
              <input
                type="text"
                defaultValue={Bike}
                disabled
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                defaultValue={price}
                disabled
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter meeting location"
                className="input input-bordered w-full"
                required
              />
            </div>
            <input
              type="submit"
              value="Add Booking"
              className="btn btn-accent w-full my-4"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
