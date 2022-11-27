import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Sheared/ConfirmationModal";
import { FcApproval } from "react-icons/fc";

const Allseller = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingItem, setDeletingItem] = useState(null);
  const closeModal = () => {
    setDeletingItem(null);
  };
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users/seller", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("bikeTraderToken")}`,
        },
      });
      if (res.status === 401 || res.status === 403) {
        return logOut();
      }
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (seller) => {
    fetch(`http://localhost:5000/users/buyer/${seller._id}`, {
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
          toast.success(`${seller.name} has been deleted successfully`);
          refetch();
        }
      });
  };

  const handleVerify = (seller) => {
    fetch(`http://localhost:5000/users/sellerVerify/${seller._id}`, {
      method: "PUT",
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
        if (data.acknowledged) {
          toast.success(`${seller.name} is verify successfully`);
          refetch();
        }
      });
  };

  const handleAdmin = (seller) => {
    console.log(seller);
    fetch(`http://localhost:5000/makeAdmin/${seller._id}`, {
      method: "PUT",
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
        if (data.modifiedCount > 0) {
          toast.success(`${seller.name} admin successfully updated`);
          refetch();
        }
      });
  };

  return (
    <div className="mx-5 my-8">
      <h1 className="text-center text-3xl font-bold my-4">All Seller</h1>
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
                <th>Verify</th>
                <th>Make Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, i) => (
                <tr key={seller._id} className="hover">
                  <th>{i + 1}</th>
                  <td>
                    {
                      <div className="avatar">
                        <div className="w-16 rounded-full border-2">
                          <img src={seller.img} alt={seller.name} />
                        </div>
                      </div>
                    }
                  </td>
                  <td>
                    <p className="flex items-center">
                      {seller.name}
                      {seller.verify && (
                        <FcApproval className="ml-2"></FcApproval>
                      )}
                    </p>
                  </td>
                  <td>{seller.email}</td>
                  <td>{seller.type}</td>
                  <td>
                    {seller.verify ? (
                      <span className="text-green-400 flex items-center">
                        Verified <FcApproval className="ml-2"></FcApproval>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleVerify(seller)}
                        className="btn btn-primary"
                      >
                        make verify
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleAdmin(seller)}
                      className="btn btn-outline"
                    >
                      Make Admin
                    </button>
                  </td>
                  <td>
                    <label
                      onClick={() => setDeletingItem(seller)}
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
          title={`Are you sure you want to delete seller ${deletingItem.name}`}
          message={`If you delete seller ${deletingItem.name}, Never back again!!!`}
          closeModal={closeModal}
          deletingItem={deletingItem}
          handleDelete={handleDelete}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Allseller;
