import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { privateRoute } from "./routes"

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    //   console.log("Middleware triggered", req.nextUrl.pathname)
    //   console.log(req.auth)
    const isLoggedIn = !!req.auth?.user;
    const { nextUrl } = req;
    const url = "http://localhost:3000";

    const isPrivateRoute = privateRoute.includes(nextUrl.pathname);
    const isAuthRoute = nextUrl.pathname.includes("/auth");
    const isApiRoute = nextUrl.pathname.startsWith("/api");

    if (isApiRoute) {
        return;
    }
    if (isLoggedIn && isAuthRoute) {
        return Response.redirect(`${url}/dashboard`);
    }
    if (isAuthRoute && !isLoggedIn) {
        return;
    }
    if (isPrivateRoute && !isLoggedIn) {
        return Response.redirect(`${url}/auth/login`);
    }

})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/" , "/(api|trpc)(.*)"],
}