import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { NavStackParams } from './AppNavigation.types';

export const navigationRef = React.createRef<NavigationContainerRef<NavStackParams>>();
