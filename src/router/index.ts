import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LogIn from "../views/LogIn.vue";
import LandingPage from "../views/LandingPage.vue";
import NewPost from "@/views/NewPost.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LogIn,
  },
  {
    path: "/landingpage",
    name: "landingpage",
    component: LandingPage,
  },
  {
    path: "/newpost",
    name: "newpost",
    component: NewPost,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
