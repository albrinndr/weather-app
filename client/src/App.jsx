import { useEffect, useState } from 'react';
import BackgroundImg from './assets/bgImg.jpg';
import NavBar from './components/NavBar';
import Weather from './components/Weather';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('wLoggedIn');
    if (user) setIsLoggedIn(true);
  }, [loginModal, isLoggedIn]);

  const divStyle = {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <>
      <div><Toaster reverseOrder={false} /></div>
      <div style={divStyle} className='flex flex-col justify-center items-center'>
        {loginModal && <Login hideModal={() => setLoginModal(!loginModal)} />}
        <div className='mb-10'>
          <NavBar openLogin={() => setLoginModal(!loginModal)} isLoggedIn={isLoggedIn} logoutFn={() => setIsLoggedIn(false)} />
          <Weather isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </>
  );
}

export default App;
