// import { NextResponse } from "next/server";
// import { redirect } from "next/navigation";

// export function middleware(req) {
//     var userVerified = req.cookies.get("authenticated");
//     var adminVerified = req.cookies.get("admin-authenticated");
//     console.log(userVerified, adminVerified)
//     var url = req.url;
//     var domain = url.split('/').slice(0, 3).join('/') + '/';
//     var isLoginPage = url.includes('login');

//     if (!userVerified && !url.includes('admin') && !isLoginPage) {
//         // Redirect to the login page if the user is not authenticated
//         return NextResponse.redirect(new URL('/login', req.url))
//     } else if (!adminVerified && url.includes('admin') && !isLoginPage) {
//         // Redirect to the admin login page if the admin is not authenticated
//         return redirect(domain + 'admin/login');
//     }
// }
