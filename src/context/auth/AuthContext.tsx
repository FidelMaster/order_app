import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { signIn, getUserData } from '../../services/api/auth-service';

export const AuthContext = createContext();

interface UserData {
  UserId: string,
  Name: string, 
  Email:string,
  IdAssistant?: string,
  IdDriver?:string
}

export const AuthProvider = ({ children }) => {
  const initialUserData = {
    UserId: '',
    Name: '', 
    Email:''
  }

  const [isSuccess, setIsSuccess] = useState(true);
  const [userInfo, setUserInfo] : any = useState({});
  const [userDataProfile, setUserDataProfile] = useState<UserData | null | string>();
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    console.log('here')
    signIn({ email: email, password: password }).then(
      res => {

        if (res.success) {
          let userInfo = res.data;
          console.log(userInfo);
          setUserInfo(userInfo);
          setIsSuccess(true);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('userData', JSON.stringify({
            UserId: '1',
            Name: 'Fidel Hernandez', 
            Email:'admin@gmail.com'
          }));

         /* getUserData().then(
            response => {
              console.log('data')
              console.log(response)
              setUserDataProfile(response.data)
              AsyncStorage.setItem('userData', JSON.stringify(response.data));

            }
          )*/
        }else{
          setIsSuccess(false);
        }

        setIsLoading(false);
      }
    ).catch(()=>{
      setIsSuccess(false);
      setIsLoading(false);
    })
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    setUserDataProfile(initialUserData)
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      let userData =  await AsyncStorage.getItem('userData');

      if (userInfo && userData) {
        userInfo = JSON.parse(userInfo);
        setUserInfo(userInfo);
       
        userData =   JSON.parse(userData) ;
        setUserDataProfile(userData)
        
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isSuccess,
        userInfo,
        userDataProfile,
        splashLoading,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};