export enum ScreenName {
  BottomTab = 'BottomTab',
  Home = 'Home',
  Login = 'Login',
  Profile = 'Profile',
}

export type NavStackParams = {
  [ScreenName.BottomTab]: undefined;
  [ScreenName.Home]: undefined;
  [ScreenName.Login]: undefined;
  [ScreenName.Profile]: undefined;
};
