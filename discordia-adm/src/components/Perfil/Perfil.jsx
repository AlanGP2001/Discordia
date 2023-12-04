import React from 'react';
import { useAuth } from '../../public/Auth/auth';

export function Perfil() {
  const auth = useAuth();

  return (
    <>
     
          <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                  src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png'
                  className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                  alt=""
                />
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <img
                    className="h-full w-full rounded-full"
                    src='https://wallpapercave.com/wp/wp8608440.jpg'
                    //src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png'
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                 ¡Bienvenido!
                </h4>
                <p className="text-base font-normal text-gray-600"> @{auth.user?.nombre}</p>
              </div>
              <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
                  <p className="text-sm font-normal text-gray-600">Posts</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">
                    9.7K
                  </p>
                  <p className="text-sm font-normal text-gray-600">Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">
                    434
                  </p>
                  <p className="text-sm font-normal text-gray-600">Following</p>
                </div>
              </div>
            </div>
            
          </div>
     
    </>
  );
}
