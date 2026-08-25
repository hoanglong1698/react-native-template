import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-family': ['font-regular', 'font-medium', 'font-semibold', 'font-bold', 'font-italic'],
      'font-size': [
        'text-8',
        'text-9',
        'text-10',
        'text-12',
        'text-14',
        'text-16',
        'text-18',
        'text-20',
        'text-24',
        'text-32',
        'text-40',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
