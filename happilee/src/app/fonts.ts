import { Italiana, Playfair_Display, Tenor_Sans } from 'next/font/google'

export const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const tenor = Tenor_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tenor',
})
