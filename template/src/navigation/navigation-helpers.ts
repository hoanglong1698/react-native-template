import { CommonActions, StackActions } from '@react-navigation/native';
import { navigationRef } from './navigation-ref';
import { NavStackParams } from './AppNavigation.types';

// Navigate to a route
export function navigate<RouteName extends keyof NavStackParams>(
  name: RouteName,
  params?: NavStackParams[RouteName],
  options?: {
    merge?: boolean;
    pop?: boolean;
  },
) {
  navigationRef.current?.dispatch(CommonActions.navigate(name, params, options));
}

// Reset navigation state to a single route
export function reset<RouteName extends keyof NavStackParams>(name: RouteName, params?: NavStackParams[RouteName]) {
  // Prefer resetRoot when available
  if (navigationRef.current?.resetRoot) {
    navigationRef.current.resetRoot({
      index: 0,
      routes: [{ name: name as string, params: params as object | undefined }],
    });
    return;
  }

  // Fallback via dispatch
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: name as string, params: params as object | undefined }],
    }),
  );
}

// Go back
export function goBack() {
  navigationRef.current?.goBack();
}

// Replace current route
export function replace<RouteName extends keyof NavStackParams>(name: RouteName, params?: NavStackParams[RouteName]) {
  navigationRef.current?.dispatch(StackActions.replace(name as string, params as object | undefined));
}

// Push a new route onto stack
export function push<RouteName extends keyof NavStackParams>(name: RouteName, params?: NavStackParams[RouteName]) {
  navigationRef.current?.dispatch(StackActions.push(name as string, params as object | undefined));
}

// Pop N routes (default 1)
export function pop(count: number = 1) {
  navigationRef.current?.dispatch(StackActions.pop(count));
}

// Pop to top of the stack
export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

// Get the current route
export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}
