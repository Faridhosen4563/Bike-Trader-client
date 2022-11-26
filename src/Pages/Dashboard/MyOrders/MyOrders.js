import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="mx-5 my-8">
      <h1 className="text-center text-3xl font-bold my-4">
        Here your all order
      </h1>
      <div>
        <div className="overflow-x-auto my-8">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Photo</th>
                <th>Title</th>
                <th>Price</th>
                <th>Job</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => (
                <tr key={booking._id} className="hover">
                  <th>{i + 1}</th>
                  <td>
                    {
                      <div className="avatar">
                        <div className="w-16 rounded-full border-2">
                          <img src={booking.img} alt={booking.bikeModel} />
                        </div>
                      </div>
                    }
                  </td>
                  <td>{booking.bikeModel}</td>
                  <td>${booking.price}</td>
                  <td>{booking.type}</td>
                  <td>
                    {booking?.paid ? (
                      <span className="text-green-400">Paid</span>
                    ) : (
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <label className="btn btn-success">Pay</label>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
