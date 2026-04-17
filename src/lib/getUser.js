"use client";

import { useEffect, useState } from "react";

import { onAuthStateChanged } from "@/src/lib/firebase/auth.js";

export function useUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
  }, []);

  return user;
}
