import React from 'react';
import SectionHeader from './SectionHeader';

const ContactUs = () => {
  return (
    <section className='text-center my-8'>
      <SectionHeader mainHeader='Contact us' subHeader='Dont hesitate' />
      <div className='mt-8'>
        <a className='text-4xl' href='tel:+919038503258'>
          +91 9038503258
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
