import { useQuery } from "@tanstack/react-query";

const useRole = (email) => {
  const { data: role = {}, isLoading } = useQuery({
    queryKey: ["role", email],
    queryFn: async () => {
      const res = await fetch(
        `https://used-car-assigment-server.vercel.app/users/role/${email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return [role, isLoading];
};

export default useRole;
