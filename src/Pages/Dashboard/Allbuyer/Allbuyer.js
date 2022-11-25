import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Sheared/ConfirmationModal";

const Allbuyer = () => {
  const [deletingItem, setDeletingItem] = useState(null);
  const closeModal = () => {
    setDeletingItem(null);
  };
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users/buyer");
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (buyer) => {
    fetch(`http://localhost:5000/users/buyer/${buyer._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${buyer.name} has been deleted successfully`);
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