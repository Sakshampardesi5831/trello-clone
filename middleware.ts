import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
export default clerkMiddleware((auth, request) => {
  const { userId, orgId } = auth();
  const { pathname } = request.nextUrl;
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }
  if (!userId) {
    return auth().redirectToSignIn({ returnBackUrl: request.url });
  }
  if (!orgId && pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", request.url));
  }
  if (orgId && pathname === "/select-org") {
    return NextResponse.redirect(new URL(`/organization/${orgId}`, request.url));
  }
  if(pathname==="/" && orgId){
    return NextResponse.redirect(new URL("/select-org", request.url));
  }
  return NextResponse.next();
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};

