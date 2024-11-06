// Import statements remain the same
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import { auth, db } from "../../firebaseConfig"; // Import Firebase auth and db
import { collection, query, where, getDocs } from "firebase/firestore";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: AdminLogin,
  },
  {
    path: "/admin-dashboard",
    name: "admin-dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Helper function to check if the user is an authorized admin
async function checkIfAuthorizedAdmin(user) {
  const q = query(
    collection(db, "adminUsers"),
    where("email", "==", user.email)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

// Add a navigation guard to check for authentication
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    // Wait for Firebase to confirm the auth state
    const user = await new Promise((resolve) => {
      auth.onAuthStateChanged(resolve);
    });

    if (user) {
      const isAuthorizedAdmin = await checkIfAuthorizedAdmin(user);
      if (isAuthorizedAdmin) {
        next(); // Proceed to the admin dashboard if user is authorized
      } else {
        next("/"); // Redirect unauthorized users to the home page
      }
    } else {
      next("/login"); // Redirect to login if not authenticated
    }
  } else {
    next(); // Allow access to routes that don't require authentication
  }
});

export default router;
