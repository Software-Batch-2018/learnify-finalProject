import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { loginUser } from '../utils/queryfn/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { mutate: loginMutate, data: mutateData } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await loginUser(payload);
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully logged in user!');
      }
      return data;
    },
  });
  const onSubmit = async (data: any) => {
    loginMutate(data);
  };

  React.useEffect(() => {
    if (mutateData && !mutateData.error) {
      // localStorage.setItem('user', mutateData);
      Cookies.set('user', JSON.stringify(mutateData));
      router.push('/');
    }
  }, [mutateData, router]);
  return (
    <>
      <Head>
        <title>E-Library | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/3124958/pexels-photo-3124958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Learnify</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-lg px-6 mx-auto lg:w-2/6  bg-gray-100">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                  Learnify Admin SSO
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your dashboard
                </p>
              </div>

              <div className="mt-8 ">
                <form onSubmit={handleSubmit(onSubmit)} className="other">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label>Email</label>
                      <input
                        type="email"
                        {...register('email')}
                        className="input-field"
                        required
                        placeholder="Email"
                      />
                    </div>
                    <div className="space-y-1">
                      <label>Password</label>
                      <input
                        type="password"
                        className="input-field"
                        required
                        placeholder="Password"
                        {...register('password')}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg bg-green-600 w-full flex items-center justify-center text-gray-50"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
