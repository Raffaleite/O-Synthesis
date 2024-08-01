"use server"
import React from 'react';
import CheckEmail from '../../../components/checkEmail'
import Navs from '../../../components/navbar'
import { signIn } from '@/auth';

export default async function Verifyrequest() {
  return (
    <>
        <Navs />
        <video id="background-video" autoPlay loop muted>
          <source src='/Media/background.mp4' type="video/mp4" />
        </video>
        <CheckEmail />
    </>
  );
}
