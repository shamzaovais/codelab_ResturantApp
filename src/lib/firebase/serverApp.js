// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { cookies } from "next/headers";
import { getApps, initializeApp, initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import firebaseConfig from "./config";
import { isLocalDemoMode } from "@/src/lib/firebase/localMode.js";

const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true";

function createDemoUser() {
  return {
    uid: "demo-user",
    displayName: "Demo User",
    email: "demo@localhost",
    photoURL: "",
    toJSON() {
      return {
        uid: this.uid,
        displayName: this.displayName,
        email: this.email,
        photoURL: this.photoURL,
      };
    },
  };
}

// Returns an authenticated client SDK instance for use in Server Side Rendering
// and Static Site Generation
export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;
  if (isLocalDemoMode) {
    return {
      firebaseServerApp: null,
      currentUser: authIdToken === "demo-user" ? createDemoUser() : null,
    };
  }

  const baseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const firebaseServerApp = initializeServerApp(baseApp, {
    authIdToken,
  });

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}

export function getServerFirestore(firebaseServerApp) {
  if (isLocalDemoMode || !firebaseServerApp) {
    return null;
  }

  const firestore = getFirestore(firebaseServerApp);

  if (useEmulator) {
    connectFirestoreEmulator(firestore, "localhost", 8080);
  }

  return firestore;
}
