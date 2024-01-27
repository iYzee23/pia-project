import { CanActivateFn } from '@angular/router';

export const noLoginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem("ulogovani") == null) return true;
  else {
    alert("Ne mozete pristupiti ovoj stranici.");
    return false;
  }
};
