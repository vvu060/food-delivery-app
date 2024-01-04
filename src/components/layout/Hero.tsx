import Image from 'next/image';
import Right from '../icons/Right';

const Hero = () => {
  return (
    <section className='hero mt-6'>
      <div className='py-12'>
        <h1 className='text-4xl font-semibold'>
          Everything <br /> is better <br /> with a{' '}
          <span className='text-primary'>Pizza</span>
        </h1>
        <p className='my-6 text-gray-500'>
          Pizza is the missing piece that makes everyday complete, a simple yet
          delicious joy in life
        </p>
        <div className='flex gap-4 text-sm'>
          <button className='bg-primary flex gap-2 items-center text-white px-4 py-2 rounded-lg uppercase'>
            Order Now
            <Right />
          </button>
          <button className='text-gray-600 flex gap-2 font-semibold px-4 py-2 rounded-lg'>
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className='relative'>
        <Image src='/pizza.png' alt='pizza' layout='fill' objectFit='contain' />
      </div>
    </section>
  );
};

export default Hero;
