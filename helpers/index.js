import cookie from "cookie";

export function parserCookies(req){
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}