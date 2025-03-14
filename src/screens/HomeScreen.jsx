import React from 'react';
import Header from '../componenet/Header/Header';
import LoginPage from './loginscreen/LoginPage'; // Consider removing if not used

import EventCard from '../componenet/Event/EventCard';
import CarsouelComp from '../componenet/extraComponent/CarsouelComp';
import EventList from '../componenet/EventList';
import TrendingData from '../componenet/extraComponent/TrendingData';
import Navbar from '../componenet/Navbar/Navbar';
import Footer from '../componenet/Footer/Footer';

function HomeScreen() {
  return (
    <>
      <Header />
      <CarsouelComp></CarsouelComp>
        <EventList></EventList>
        <TrendingData></TrendingData>
        <Navbar>

        </Navbar>
        <Footer></Footer>
    </>
  );
}

export default HomeScreen;
