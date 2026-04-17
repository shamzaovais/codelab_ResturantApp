import { getReviewsByRestaurantId } from "@/src/lib/firebase/firestore.js";
import {
  getAuthenticatedAppForUser,
  getServerFirestore,
} from "@/src/lib/firebase/serverApp";

export async function GeminiSummary({ restaurantId }) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const reviews = await getReviewsByRestaurantId(
    getServerFirestore(firebaseServerApp),
    restaurantId
  );

  if (!reviews.length) {
    return (
      <div className="restaurant__review_summary">
        <p>No reviews yet. Add one to get a summary.</p>
      </div>
    );
  }

  const average =
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  const positive = reviews.filter((review) => review.rating >= 4).length;
  const commonLine =
    reviews[0]?.text || "Customers are still building the story for this place.";

  return (
    <div className="restaurant__review_summary">
      <p>
        {positive} of {reviews.length} reviewers rated this place 4 stars or
        higher, with an average of {average.toFixed(1)} stars.
      </p>
      <p>Recent feedback: &quot;{commonLine}&quot;</p>
    </div>
  );
}

export function GeminiSummarySkeleton() {
  return (
    <div className="restaurant__review_summary">
      <p>✨ Summarizing reviews with Gemini...</p>
    </div>
  );
}
