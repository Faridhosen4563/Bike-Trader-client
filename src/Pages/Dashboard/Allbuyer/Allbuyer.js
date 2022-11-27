import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Sheared/ConfirmationModal";

const Allbuyer = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingItem, setDeletingItem] = useState(null);
  const closeModal = () => {
    setDeletingItem(null);
  };
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(
        "https://used-car-assigment-server.vercel.app/users/buyer",
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

  const handleDelete = (buyer) => {
    fetch(
      `https://used-car-assigment-server.vercel.app/users/buyer/${buyer._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("bikeTraderToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${buyer.name} has been deleted successfully`);
          refetch();
        }
      });
  };

  const handleAdmin = (buyer) => {
    fetch(
      `https://used-car-assigment-server.vercel.app/makeAdmin/${buyer._id}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("bikeTraderToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${buyer.name} admin successfully updated`);
          refetch();
        }
      });
  };

  return (
    <div className="mx-5 my-8">
      <h1 className="text-center text-3xl font-bold my-4">ALL Buyer</h1>
      <div>
        <div className="overflow-x-auto my-8">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job</th>
                <th>Make Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, i) => (
                <tr key={buyer._id} className="hover">
                  <th>{i + 1}</th>
                  <td>
                    {
                      <div className="avatar">
                        <div className="w-16 rounded-full border-2">
                          <img src={buyer.img} alt={buyer.name} />
                        </div>
                      </div>
                    }
                  </td>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.type}</td>
                  <td>
                    <button
                      onClick={() => handleAdmin(buyer)}
                      className="btn btn-outline"
                    >
                      Make Admin
                    </button>
                  </td>
                  <td>
                    <label
                      onClick={() => setDeletingItem(buyer)}
                      htmlFor="confirmation-modal"
                      className="btn btn-outline"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deletingItem && (
        <ConfirmationModal
          title={`Are you sure you want to delete buyer ${deletingItem.name}`}
          message={`If you delete buyer ${deletingItem.name}, Never back again!!!`}
          closeModal={closeModal}
          deletingItem={deletingItem}
          handleDelete={handleDelete}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Allbuyer;
