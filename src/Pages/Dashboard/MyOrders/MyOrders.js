import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Sheared/ConfirmationModal";

const MyOrders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [deletingItem, setDeletingItem] = useState(null);
  const closeModal = () => {
    setDeletingItem(null);
  };

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("bikeTraderToken")}`,
          },
        }
      );
      if (res.status === 401 || res.status === 403) {
        return logOut();
      }
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (booking) => {
    fetch(`http://localhost:5000/bookings/${booking._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("bikeTraderToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${booking.bikeModel} has been deleted successfully`);
          refetch();
        }
      });
  };

  if (bookings.length === 0) {
    return (
      <p className="text-2xl text-center font-semibold text-blue-400 flex justify-center items-center h-full">
        Please buy or booked some bike. Go to{" "}
        <Link to="/category" className="text-blue-600">
          {" "}
          Category
        </Link>
      </p>
    );
  }
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
                <th>Delete</th>
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
                  <td>
                    <label
                      onClick={() => setDeletingItem(booking)}
                      htmlFor="confirmation-modal"
                      className="btn btn-outline"
                    >
                      Delete
                    </label>
                  </td>
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
      {deletingItem && (
        <ConfirmationModal
          title={`Are you sure you want to delete order ${deletingItem.bikeModel}`}
          message={`If you delete order ${deletingItem.bikeModel}, Never back again!!!`}
          closeModal={closeModal}
          deletingItem={deletingItem}
          handleDelete={handleDelete}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyOrders;
