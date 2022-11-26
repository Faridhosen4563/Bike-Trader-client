import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("bikeTraderToken", data.token);
          setToken(data.token);
        }
      });
  }, [email]);
  return { token };
};

export default useToken;
