import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Container } from '@/styles/pages/app'

import Image from 'next/image';
import Link from 'next/link';

import logoImg from '../assets/logo.png'
import { Header } from '@/styles/pages/Home';

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <Container>

    <Header href={`../`} />
    <Component {...pageProps} />

    </Container>
  )
}
