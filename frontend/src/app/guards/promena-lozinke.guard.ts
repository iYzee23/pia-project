import { CanActivateFn } from '@angular/router';

export const promenaLozinkeGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem("ulogovani") != null) return true;
  else if (localStorage.getItem("promenaInit") != null && localStorage.getItem("promenaApproved") != null) return true;
  else {
    alert("Ne mozete pristupiti ovoj stranici.");
    return false;
  }
};
