import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,          
});

export const userDataState = atom({
    key: 'userDataState',
    default: {},          
  });
  
export const filterState = atom({
    key: 'filterState',
    default: {
      risk: [],
      status: [],
      category: [],
      page: 1,   
      limit: 10,
    },
});
  