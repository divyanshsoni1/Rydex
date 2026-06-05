import Nav from '@/components/Nav'
import AboutHero from '@/components/AboutHero'
import React from 'react'
import CompanyIntroductionSection from '@/components/CompanyIntroductionSection';
import MissionSection from '@/components/MissionSection';
import VisionSection from '@/components/VisionSection';
import WhyChooseRydexSection from '@/components/WhyChooseRydexSection';
import CoreValuesSection from '@/components/CoreValuesSection';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';

function page() {
  return (
    <>
     <Nav/>
     <AboutHero/>
     <CompanyIntroductionSection/>
     <MissionSection/>
     <VisionSection/>
     <WhyChooseRydexSection/>
     <CoreValuesSection/>
     <FounderSection/>
     <Footer/>
    </>
  )
}

export default page;