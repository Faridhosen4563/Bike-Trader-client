import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Sheared/ConfirmationModal";

const Allseller = () => {
  const [deletingItem, setDeletingItem] = useState(null);
  const closeModal = () => {
    setDeletingItem(null);
  };
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users/seller");
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (seller) => {
    fetch(`http://localhost:5000/users/buyer/${seller._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${seller.name} has been deleted successfully`);
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
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.type}</td>
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