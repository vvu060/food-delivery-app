import React from 'react';

interface SectionHeaderProps {
  subHeader: string;
  mainHeader: string;
}

const SectionHeader = ({ subHeader, mainHeader }: SectionHeaderProps) => {
  return (
    <>
      <h3 className='uppercase text-gray-600 font-semibold leading-4'>
        {subHeader}
      </h3>
      <h2 className='text-primary font-bold text-4xl italic'>{mainHeader}</h2>
    </>
  );
};

export default SectionHeader;
