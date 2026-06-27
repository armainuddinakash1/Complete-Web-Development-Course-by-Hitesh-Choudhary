import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  await Promise.all([
    getOrCreateDB(),
    getOrCreateStorage()
  ])
    return NextResponse.next()
}

// the matching paths will not run the proxy
export const config = {
    /*
  match all the request paths except for the ones that starts with:
  - api 
  - _next/static
  - _next/image
  - favicon.ico
  */
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
