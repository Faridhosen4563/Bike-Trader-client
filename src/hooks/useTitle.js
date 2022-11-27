import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `BikeTrader- ${title}`;
  }, [title]);
};

export default useTitle;
