import React from 'react';
import SectionHeader from './SectionHeader';

const AboutUs = () => {
  return (
    <section className='text-center my-16'>
      <SectionHeader mainHeader='About us' subHeader='Our story' />
      <div className='text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          ducimus, molestias, libero architecto repellat, error eos voluptatibus
          et quis accusantium ipsum vero. Harum, repudiandae. Atque suscipit
          saepe ab error reprehenderit.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur
          dolore consequatur temporibus iure. Provident, quod
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur
          dolore consequatur temporibus iure. Provident, quod
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
