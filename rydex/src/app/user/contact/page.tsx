import ContactCardsSection from '@/components/ContactCardsSection'
import ContactFormSection from '@/components/ContactFormSection'
import ContactHero from '@/components/ContactHero'
import CustomerMetricsSection from '@/components/CustomerMetricsSection'
import FinalCTASection from '@/components/FinalCTASection'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import SupportCategoriesSection from '@/components/SupportCategoriesSection'
import React from 'react'

function page() {
  return (
    <>
     <Nav/>
     <ContactHero/>
     <ContactCardsSection/>
     <SupportCategoriesSection/>
     <ContactFormSection/>
     <CustomerMetricsSection/>
     <FinalCTASection/>
     <Footer/>
    </>
  )
}

export default page;