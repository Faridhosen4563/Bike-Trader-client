import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOut = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { price, email, name, _id, bikeModel, bikeId } = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`http://localhost:5000/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [booking]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);

      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        bikeModel: bikeModel,
        email,
        name,
        bikeId,
        bookingId: _id,
        transactionId: paymentIntent.id,
      };
      fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congrats!!! Your payment was successful");
            setTransactionId(paymentIntent.id);
            setProcessing(false);
          }
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {cardError && <p className="text-red-300 mt-4">{cardError}</p>}
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="my-4 btn btn-sm btn-primary"
        >
          Pay
        </button>
        {success && (
          <>
            <p className="text-xl text-green-500">{success}</p>
            <p className="text-xl my-2">
              Transaction Id :{" "}
              <span className="font-bold">{transactionId}</span>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default CheckOut;
