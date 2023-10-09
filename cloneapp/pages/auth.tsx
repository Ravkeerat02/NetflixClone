
import Input from "components/input";
import { useCallback, useState } from "react";
import axios from "axios";

const Auth = () => {

  // set and effect setup 
  const[email , setEmail] = useState('');
  const[name , setName] = useState('');
  const[password , setPassword] = useState('');

  //toggle creation 
  const [variant , setVariant] = useState('login');
  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'register' : 'login'));
  },[]);

  // register - used in on click
  const register = useCallback(async() => {
    try{
      await axios.post('/api/register' , {
        email , name , password
      })
    }catch(error){
      console.log(error);
    }
  },[email , name , password])


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-x-wd rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
            {/* conditional rendering depending on whats being selectted */}
            {variant === 'login' ? 'Sign in' : 'Register'}   
            </h2>
            <div className="flex flex-col">
              {variant == 'register' && (
                <Input
                  label="Username"
                  onChange={(ev:any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev:any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev:any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button onClick={register}  className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 trasition ">{variant === 'login' ? 'Login' :'Sign up'}</button>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix ?' : 'Already have an account'} 
              <span  onClick={toggleVariant} 
              className="text-white ml-1 font-bold hover:underline cursor-pointer">
              {variant=== 'login' ? 'Create an Account' :'login'} </span>
              </p>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
