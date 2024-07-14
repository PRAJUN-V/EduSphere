import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';
import HeroSection from './common/HeroSection';
import Footer from './common/Footer';
import { jwtDecode } from 'jwt-decode';
import { setUser, clearUser } from '../../redux/user';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  

  return (
    <>
      <Header />
      <SubHeader />
      <HeroSection />
      <Footer />
    </>
  );
}
