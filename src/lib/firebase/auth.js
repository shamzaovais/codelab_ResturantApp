import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { auth } from "@/src/lib/firebase/clientApp";
import { isLocalDemoMode } from "@/src/lib/firebase/localMode.js";

const AUTH_EVENT = "friendly-eats:auth-change";
const LOCAL_USER_KEY = "friendly-eats-demo-user";

function createDemoUser() {
  return {
    uid: "demo-user",
    displayName: "Demo User",
    email: "demo@localhost",
    photoURL: "",
    async getIdToken() {
      return "demo-user";
    },
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

function getLocalUser() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(LOCAL_USER_KEY) ? createDemoUser() : null;
}

export function onAuthStateChanged(cb) {
  if (isLocalDemoMode) {
    if (typeof window !== "undefined") {
      cb(getLocalUser());
      const handler = () => cb(getLocalUser());
      window.addEventListener(AUTH_EVENT, handler);
      window.addEventListener("storage", handler);
      return () => {
        window.removeEventListener(AUTH_EVENT, handler);
        window.removeEventListener("storage", handler);
      };
    }
    return () => {};
  }

  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  if (isLocalDemoMode) {
    return onAuthStateChanged(cb);
  }

  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  if (isLocalDemoMode) {
    localStorage.setItem(LOCAL_USER_KEY, "demo-user");
    window.dispatchEvent(new Event(AUTH_EVENT));
    return createDemoUser();
  }

  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
}

export async function signOut() {
  if (isLocalDemoMode) {
    localStorage.removeItem(LOCAL_USER_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
    return;
  }

  try {
    return await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out with Google: ", error);
  }
}
