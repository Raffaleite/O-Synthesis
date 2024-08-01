import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import '../../public/css/style2.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import NextAuthSessionProvider from "@/providers/sessionProvider";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: "O-Synthesis"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/x-icon" href="/Media/favicon.ico"/>
      </head>
      <body className="backgroundGeral">
        <NextIntlClientProvider messages={messages}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
