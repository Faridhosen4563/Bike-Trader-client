import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Sheared/ConfirmationModal";

const MyProducts = () => {
  const { user, logOut } = useContext(AuthContext);
  const [deletingItem, setDeletingItem] = useState(null);
  const closeModal = () => {
    setDeletingItem(null);
  };

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://used-car-assigment-server.vercel.app/products?email=${user?.email}`,
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

  const handleDelete = (product) => {
    fetch(`https://used-car-assigment-server.vercel.app/bikes/${product._id}`, {
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
          toast.success(`${product.Bike} has been deleted successfully`);
          refetch();
        }
      });
  };

  const handleAdvertise = (advertise) => {
    const advertiseData = {
      advData: advertise._id,
      img: advertise.img,
      bike: advertise.Bike,
      price: advertise.price,
    };
    fetch("https://used-car-assigment-server.vercel.app/advertises", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bikeTraderToken")}`,
      },
      body: JSON.stringify(advertiseData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Your product successfully added in Advertise");
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="mx-5 my-8">
      <h1 className="text-center text-3xl font-bold my-4">My Products</h1>
      <div>
        <div className="overflow-x-auto my-8">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Photo</th>
                <th>Name</th>
                <th>Status</th>
                <th>Advertise</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product._id} className="hover">
                  <th>{i + 1}</th>
                  <td>
                    {
                      <div className="avatar">
                        <div className="w-16 rounded-full border-2">
                          <img src={product.img} alt={product.name} />
                        </div>
                      </div>
                    }
                  </td>
                  <td>{product.Bike}</td>
                  <td>{product.sold ? "sold" : "unsold"}</td>
                  <td>
                    <button
                      onClick={() => handleAdvertise(product)}
                      className="btn btn-outline"
                    >
                      Make Advertise
                    </button>
                  </td>
                  <td>
                    <label
                      onClick={() => setDeletingItem(product)}
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
          title={`Are you sure you want to delete  ${deletingItem.Bike}`}
          message={`If you delete  ${deletingItem.Bike}, Never back again!!!`}
          closeModal={closeModal}
          deletingItem={deletingItem}
          handleDelete={handleDelete}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;
