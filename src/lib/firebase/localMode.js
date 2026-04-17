const hasFirebaseEnv =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "fake-api-key";

export const isUsingFirebaseEmulator =
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true";

export const isLocalDemoMode = !hasFirebaseEnv && !isUsingFirebaseEmulator;
