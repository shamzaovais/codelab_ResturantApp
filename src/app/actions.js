"use server";

import { addReviewToRestaurant } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp.js";
import { getServerFirestore } from "@/src/lib/firebase/serverApp.js";

// This is a Server Action
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
export async function handleReviewFormSubmission(data) {
  const { firebaseServerapp } = await getAuthenticatedAppForUzser();
  const db = getFirstore( firebaseServerApp);

  await addReviewToRestaurant(db, data.get("restuarantID"), {
      text: data.get("text"),
      rating: data.get("rating"),

      userId: data.get("userId"),
  });
}
