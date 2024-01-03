import React from 'react';

const MenuItem = () => {
  return (
    <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 cursor-pointer transition-all ease-in-out duration-300'>
      <div className='text-center'>
        <img src='/pizza.png' alt='pizza' className='max-h-24 mx-auto block' />
      </div>
      <h4 className='font-semibold my-2 text-xl'>Pepperoni Pizza</h4>
      <p className='text-gray-500 text-sm'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.{' '}
      </p>
      <button className='bg-primary text-white rounded-lg px-6 py-2 mt-4'>
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItem;
