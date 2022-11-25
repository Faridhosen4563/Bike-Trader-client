import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useRole = (email) => {
  const [roleLoading, setRoleLoading] = useState(true);
  const {
    data: role = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users/role/${email}`);
      const data = await res.json();
      return data;
    },
  });
  console.log(role.role);
  return [role, isLoading, refetch];
};

export default useRole;
