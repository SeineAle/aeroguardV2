import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,          
});

export const userDataState = atom({
    key: 'userDataState',
    default: {},          
  });
  