import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { NavStackParams } from './AppNavigation.types';

export const navigationRef = React.createRef<NavigationContainerRef<NavStackParams>>();
