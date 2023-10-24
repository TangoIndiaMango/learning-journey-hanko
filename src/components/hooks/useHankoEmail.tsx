// "use client"
// import { useEffect, useState } from 'react';
// import { Hanko } from '@teamhanko/hanko-elements';


// const hankoApi = process.env.NEXT_HANKO_API as string;
// const hanko = new Hanko(hankoApi);

// export function useHankoEmail() {
//     const [email, setEmail] = useState<string>("");
//     const [id, setID] = useState<string>("");
//     const [initialLoad, setInitialLoad] = useState(false);

//     useEffect(() => {
//         if (!initialLoad) {
//             const fetchEmail = async () => {
//                 try {
//                     const { id, email } = await hanko.user.getCurrent();
//                     setID(id);
//                     setEmail(email);
//                 } catch (error) {
//                     console.error("Failed to fetch the user's email:", error);
//                 }
//             };

//             fetchEmail();
//             setInitialLoad(true);
//         }
//     }, [initialLoad]);

//     return {
//         id,
//         email,
//     };
// }
