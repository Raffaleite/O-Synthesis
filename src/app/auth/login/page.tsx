"use server"
import React from 'react';
import FormLogin from '../../components/formLogin'
import Navs from '../../components/navbar'
import dynamic from 'next/dynamic'
import BackgroundVideo from "@/app/components/BackgroundVideo";

export default async function Login() {
  return (
    
    <>
        <Navs />
          <BackgroundVideo src="../Media/background.mp4" type=""></BackgroundVideo>
        <FormLogin />
    </>

  );
}
