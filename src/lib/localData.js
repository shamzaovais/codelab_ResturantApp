import { generateFakeRestaurantsAndReviews } from "@/src/lib/fakeRestaurants.js";

const STORAGE_KEY = "friendly-eats-local-data";
const DATA_EVENT = "friendly-eats:data-change";

const seedData = {
  restaurants: [
    {
      id: "local-1",
      name: "Savory Bites",
      category: "Italian",
      city: "New York",
      price: 3,
      avgRating: 4.7,
      numRatings: 3,
      sumRating: 14,
      photo:
        "https://storage.googleapis.com/firestorequickstarts.appspot.com/food_1.png",
      timestamp: new Date("2026-03-03T10:00:00.000Z"),
    },
    {
      id: "local-2",
      name: "Taco Tango",
      category: "Mexican",
      city: "Los Angeles",
      price: 2,
      avgRating: 4.3,
      numRatings: 3,
      sumRating: 13,
      photo:
        "https://storage.googleapis.com/firestorequickstarts.appspot.com/food_8.png",
      timestamp: new Date("2026-03-06T10:00:00.000Z"),
    },
    {
      id: "local-3",
      name: "Sushi Sensation",
      category: "Japanese",
      city: "Tokyo",
      price: 4,
      avgRating: 5,
      numRatings: 2,
      sumRating: 10,
      photo:
        "https://storage.googleapis.com/firestorequickstarts.appspot.com/food_12.png",
      timestamp: new Date("2026-03-09T10:00:00.000Z"),
    },
    {
      id: "local-4",
      name: "Curry Corner",
      category: "Indian",
      city: "Mumbai",
      price: 2,
      avgRating: 4,
      numRatings: 2,
      sumRating: 8,
      photo:
        "https://storage.googleapis.com/firestorequickstarts.appspot.com/food_16.png",
      timestamp: new Date("2026-03-12T10:00:00.000Z"),
    },
    {
      id: "local-5",
      name: "Mediterranean Magic",
      category: "Mediterranean",
      city: "Dubai",
      price: 3,
      avgRating: 3.5,
      numRatings: 2,
      sumRating: 7,
      photo:
        "https://storage.googleapis.com/firestorequickstarts.appspot.com/food_20.png",
      timestamp: new Date("2026-03-15T10:00:00.000Z"),
    },
  ],
  reviews: {
    "local-1": [
      {
        id: "local-1-review-1",
        rating: 5,
        text: "Fresh pasta, warm service, and a cozy room.",
        userId: "demo-chef",
        timestamp: new Date("2026-03-04T10:00:00.000Z"),
      },
      {
        id: "local-1-review-2",
        rating: 4,
        text: "Excellent tiramisu and very generous portions.",
        userId: "demo-foodie",
        timestamp: new Date("2026-03-05T10:00:00.000Z"),
      },
      {
        id: "local-1-review-3",
        rating: 5,
        text: "Best date-night spot in the neighborhood.",
        userId: "demo-date",
        timestamp: new Date("2026-03-06T10:00:00.000Z"),
      },
    ],
    "local-2": [
      {
        id: "local-2-review-1",
        rating: 4,
        text: "Great tacos and quick service during lunch.",
        userId: "demo-lunch",
        timestamp: new Date("2026-03-07T10:00:00.000Z"),
      },
      {
        id: "local-2-review-2",
        rating: 5,
        text: "The salsa flight is worth the visit on its own.",
        userId: "demo-spicy",
        timestamp: new Date("2026-03-08T10:00:00.000Z"),
      },
      {
        id: "local-2-review-3",
        rating: 4,
        text: "Casual, loud, and reliably tasty.",
        userId: "demo-regular",
        timestamp: new Date("2026-03-09T10:00:00.000Z"),
      },
    ],
    "local-3": [
      {
        id: "local-3-review-1",
        rating: 5,
        text: "Impeccable fish quality and beautifully plated rolls.",
        userId: "demo-sushi",
        timestamp: new Date("2026-03-10T10:00:00.000Z"),
      },
      {
        id: "local-3-review-2",
        rating: 5,
        text: "Quiet atmosphere with standout omakase.",
        userId: "demo-zen",
        timestamp: new Date("2026-03-11T10:00:00.000Z"),
      },
    ],
    "local-4": [
      {
        id: "local-4-review-1",
        rating: 4,
        text: "Comforting curries with just the right spice level.",
        userId: "demo-curry",
        timestamp: new Date("2026-03-13T10:00:00.000Z"),
      },
      {
        id: "local-4-review-2",
        rating: 4,
        text: "Excellent naan and friendly staff.",
        userId: "demo-naan",
        timestamp: new Date("2026-03-14T10:00:00.000Z"),
      },
    ],
    "local-5": [
      {
        id: "local-5-review-1",
        rating: 4,
        text: "Fresh mezze platter and lovely patio seating.",
        userId: "demo-mezze",
        timestamp: new Date("2026-03-16T10:00:00.000Z"),
      },
      {
        id: "local-5-review-2",
        rating: 3,
        text: "Good food overall, though service was a little slow.",
        userId: "demo-wait",
        timestamp: new Date("2026-03-17T10:00:00.000Z"),
      },
    ],
  },
};

let serverData = cloneData(seedData);

function cloneRestaurant(restaurant) {
  return {
    ...restaurant,
    timestamp: new Date(restaurant.timestamp),
  };
}

function cloneReview(review) {
  return {
    ...review,
    timestamp: new Date(review.timestamp),
  };
}

function cloneData(data) {
  return {
    restaurants: data.restaurants.map(cloneRestaurant),
    reviews: Object.fromEntries(
      Object.entries(data.reviews).map(([restaurantId, reviews]) => [
        restaurantId,
        reviews.map(cloneReview),
      ])
    ),
  };
}

function serializeData(data) {
  return JSON.stringify({
    restaurants: data.restaurants.map((restaurant) => ({
      ...restaurant,
      timestamp: restaurant.timestamp.toISOString(),
    })),
    reviews: Object.fromEntries(
      Object.entries(data.reviews).map(([restaurantId, reviews]) => [
        restaurantId,
        reviews.map((review) => ({
          ...review,
          timestamp: review.timestamp.toISOString(),
        })),
      ])
    ),
  });
}

function deserializeData(data) {
  return {
    restaurants: data.restaurants.map((restaurant) => ({
      ...restaurant,
      timestamp: new Date(restaurant.timestamp),
    })),
    reviews: Object.fromEntries(
      Object.entries(data.reviews).map(([restaurantId, reviews]) => [
        restaurantId,
        reviews.map((review) => ({
          ...review,
          timestamp: new Date(review.timestamp),
        })),
      ])
    ),
  };
}

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function emitChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DATA_EVENT));
  }
}

function getStore() {
  if (!canUseBrowserStorage()) {
    return serverData;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, serializeData(seedData));
    return cloneData(seedData);
  }

  try {
    return deserializeData(JSON.parse(raw));
  } catch {
    localStorage.setItem(STORAGE_KEY, serializeData(seedData));
    return cloneData(seedData);
  }
}

function saveStore(data) {
  if (canUseBrowserStorage()) {
    localStorage.setItem(STORAGE_KEY, serializeData(data));
    emitChange();
    return;
  }

  serverData = cloneData(data);
}

function applyFilters(restaurants, { category, city, price, sort } = {}) {
  let filtered = [...restaurants];

  if (category) {
    filtered = filtered.filter((restaurant) => restaurant.category === category);
  }
  if (city) {
    filtered = filtered.filter((restaurant) => restaurant.city === city);
  }
  if (price) {
    filtered = filtered.filter(
      (restaurant) => restaurant.price === String(price).length
    );
  }

  filtered.sort((a, b) => {
    if (sort === "Review") {
      return b.avgRating - a.avgRating;
    }
    return b.numRatings - a.numRatings;
  });

  return filtered;
}

export function getLocalRestaurants(filters = {}) {
  const store = getStore();
  return applyFilters(store.restaurants, filters).map(cloneRestaurant);
}

export function getLocalRestaurantById(restaurantId) {
  const store = getStore();
  const restaurant = store.restaurants.find((item) => item.id === restaurantId);
  return restaurant ? cloneRestaurant(restaurant) : null;
}

export function getLocalReviewsByRestaurantId(restaurantId) {
  const store = getStore();
  return (store.reviews[restaurantId] || [])
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(cloneReview);
}

export function subscribeToLocalData(cb) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => cb();
  window.addEventListener(DATA_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(DATA_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function addLocalReview(restaurantId, review) {
  const store = getStore();
  const restaurant = store.restaurants.find((item) => item.id === restaurantId);

  if (!restaurant) {
    return null;
  }

  const nextReview = {
    id: `${restaurantId}-review-${Date.now()}`,
    rating: review.rating,
    text: review.text,
    userId: review.userId,
    timestamp: new Date(),
  };

  const reviews = store.reviews[restaurantId] || [];
  reviews.unshift(nextReview);
  store.reviews[restaurantId] = reviews;

  restaurant.numRatings += 1;
  restaurant.sumRating += review.rating;
  restaurant.avgRating = restaurant.sumRating / restaurant.numRatings;

  saveStore(store);
  return cloneReview(nextReview);
}

export function updateLocalRestaurantImage(restaurantId, photo) {
  const store = getStore();
  const restaurant = store.restaurants.find((item) => item.id === restaurantId);

  if (!restaurant) {
    return null;
  }

  restaurant.photo = photo;
  saveStore(store);
  return photo;
}

export async function addGeneratedLocalRestaurants() {
  const store = getStore();
  const generated = await generateFakeRestaurantsAndReviews();

  generated.forEach(({ restaurantData, ratingsData }, index) => {
    const restaurantId = `local-generated-${Date.now()}-${index}`;
    store.restaurants.unshift({
      id: restaurantId,
      ...restaurantData,
      timestamp: restaurantData.timestamp.toDate(),
    });

    store.reviews[restaurantId] = ratingsData.map((review, reviewIndex) => ({
      id: `${restaurantId}-review-${reviewIndex + 1}`,
      ...review,
      timestamp: review.timestamp.toDate(),
    }));
  });

  saveStore(store);
}
