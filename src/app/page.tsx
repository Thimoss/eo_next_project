import ClientSide from "@/components/dashboard/ClientSide";
import Master from "@/components/global/Master";
// import ClientSide from "@/components/dashboard/ClientSide";

// import { useAppSelector } from "../../service/store";

export default function Home() {
  // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // const token = useAppSelector((state) => state.auth.token);
  // const user = useAppSelector((state) => state.auth.user);

  // console.log(user);
  // console.log(token);

  return (
    <Master>
      <ClientSide />
    </Master>
  );

  // return (
  //   <div>
  //     <h1>Session Status</h1>
  //     {isAuthenticated ? (
  //       <>
  //         <p>User is authenticated</p>
  //         <p>Token: {token}</p>
  //         <p>User Info: {JSON.stringify(user)}</p>
  //       </>
  //     ) : (
  //       <p>User is not authenticated</p>
  //     )}
  //   </div>
  // );
}
