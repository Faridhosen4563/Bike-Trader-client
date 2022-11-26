import React from "react";
import { useLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const bookingData = useLoaderData();
  return (
    <div className="mx-5 my-8">
      <h1 className="text-3xl">Please Payment for {bookingData.bikeModel}</h1>
      <p className="text-xl my-4">
        Please pay <strong>${bookingData.price}</strong> for your booking bike{" "}
        {bookingData.bikeModel}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOut booking={bookingData} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
