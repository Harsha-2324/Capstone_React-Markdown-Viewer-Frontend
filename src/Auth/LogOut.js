export function LogOut(){                             
    localStorage.removeItem("token");
    window.location.href="/"
}
