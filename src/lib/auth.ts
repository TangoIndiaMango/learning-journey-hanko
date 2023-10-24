import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";
import { cache } from "react";


// export const runtime = "edge";
export const dynamic = "force-dynamic"
export const revalidate = 3600

export const getuserID = cache(async () => {

  try {
    const token = cookies().get("hanko")?.value;
    const payload = jose.decodeJwt(token ?? "");
    // console.log(payload)
    return payload.sub;
  } catch (error) {
    console.log(error)
    redirect("/login")
  }
})

//const userID = await userId();


// const hanko = new Hanko(hankoApi);

// const { id, email } = await hanko.user.getCurrent();
// console.log(`user-id: ${id}, email: ${email}`);
// if (!id) {
//     redirect("/login")
// }