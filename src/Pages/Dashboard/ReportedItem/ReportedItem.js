import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Sheared/ConfirmationModal";

const ReportedItem = () => {
  const { logOut } = useContext(AuthContext);
  const [deletingItem, setDeletingItem] = useState(null);
  const closeModal = () => {
    setDeletingItem(null);
  };
  const {
    data: reportItems = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reportItems"],
    queryFn: async () => {
      const res = await fetch(
        "https://used-car-assigment-server.vercel.app/reports",
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

  const handleDelete = (deleteItem) => {
    console.log(deleteItem._id);
    fetch(
      `https://used-car-assigment-server.vercel.app/reports/${deleteItem._id}`,
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
          toast.success(`${deleteItem.Bike} has been deleted successfully`);
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (reportItems.length === 0) {
    return (
      <p className="flex justify-center items-center text-3xl font-bold text-green-400 h-full">
        You have reported item 0
      </p>
    );
  }

  return (
    <div className="mx-5 my-8">
      <h1 className="text-2xl font-bold text-center my-4">
        Reported Items :{" "}
        <span className="text-red-400 text-3xl">{reportItems.length}</span>
      </h1>
      <div>
        <div className="overflow-x-auto my-8">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Photo</th>
                <th>Item Name</th>
                <th>Reporter Name</th>
                <th>Reporter Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportItems.map((reportItem, i) => (
                <tr key={reportItem._id} className="hover">
                  <th>{i + 1}</th>
                  <td>
                    {
                      <div className="avatar">
                        <div className="w-16 rounded-full border-2">
                          <img src={reportItem.img} alt={reportItem.Bike} />
                        </div>
                      </div>
                    }
                  </td>
                  <td>{reportItem.Bike}</td>
                  <td>{reportItem.reporterName}</td>
                  <td>{reportItem.reporterEmail}</td>
                  <td>
                    <label
                      onClick={() => setDeletingItem(reportItem)}
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
          title={`Are you sure you want to delete buyer ${deletingItem.Bike}`}
          message={`If you delete buyer ${deletingItem.Bike}, Never back again!!!`}
          closeModal={closeModal}
          deletingItem={deletingItem}
          handleDelete={handleDelete}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ReportedItem;
