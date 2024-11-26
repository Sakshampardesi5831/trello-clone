import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
// export default clerkMiddleware((auth, req) => {
//   if (!isPublicRoute(req)) {
//       if(auth().userId){
//         let path="/select-org"
//         if(auth().orgId){
//           path=`/organization/${auth().orgId}`
//         }
//         const orgSelection=new URL(path,req.url);
//         return NextResponse.redirect(orgSelection);
//       }
//     if(!auth().userId){
//       return auth().redirectToSignIn({returnBackUrl:req.url});
//     }
//     if(auth().userId && !auth().orgId && req.nextUrl.pathname!=="/select-org"){
//       const orgSelection=new URL("/select-org",req.url);
//         return NextResponse.redirect(orgSelection);
//     }
//   }
// });
export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
     auth().protect(); 
  }
   return NextResponse.next();
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
/**
 * import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
 */