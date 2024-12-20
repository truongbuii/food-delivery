import { PageTransition } from '@/components/molecule';
import Image from 'next/image';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { useRef } from 'react';
import { IMAGES_CONST } from '@/configs';
import { StepKey, useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    step: 'step2',
    titleTop: 'Browse your menu',
    titleBottom: 'and order directly',
    description:
      'Our app can send you everywhere, even space. For only $2.99 per month',
    image: IMAGES_CONST.onboarding.onboard1
  },
  {
    id: 2,
    step: 'step3',
    titleTop: 'Even to space',
    titleBottom: 'with us! Together',
    description:
      'Our app can send you everywhere, even space. For only $2.99 per month',
    image: IMAGES_CONST.onboarding.onboard2
  },
  {
    id: 3,
    step: 'done',
    titleTop: 'Pick delivery at',
    titleBottom: 'your door',
    description:
      'Our app can send you everywhere, even space. For only $2.99 per month',
    image: IMAGES_CONST.onboarding.onboard3
  }
];

const SliderOnboarding = () => {
  const { onNextStep } = useOnboarding();
  const swiperRef = useRef<SwiperRef | null>(null);

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      if (swiper.activeIndex === slides.length - 1) {
        onNextStep(StepKey.done as keyof typeof StepKey);
      } else {
        swiper.slideNext();
      }
    }
  };

  return (
    <PageTransition>
      <div className="absolute inset-x-0 bottom-0 h-[100%] bg-gradient-to-t from-overlay to-transparent opacity-80 pointer-events-none z-0"></div>
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        pagination={{ clickable: true, el: '.custom-pagination' }}
        navigation
        spaceBetween={30}
        centeredSlides={true}
        loop={false}
        className="relative z-10"
        allowTouchMove={false}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="h-[100vh] w-full flex flex-col items-center justify-between ">
              <div className="w-full px-8 mt-8 flex flex-col items-center justify-center">
                <Image
                  src={slide.image}
                  alt={slide.image}
                  className="w-full object-cover z-10"
                />
              </div>
              <div className="flex flex-col gap-8 px-8 h-[38%]">
                <div className="flex flex-col gap-4 text-center">
                  <div className="flex flex-col gap-1">
                    <p className="text-4xl font-normal ">{slide.titleTop}</p>
                    <p className="text-4xl font-normal ">{slide.titleBottom}</p>
                  </div>
                  <span className="text-[17px] text-lightGray">
                    {slide.description}
                  </span>
                </div>
                <div className="flex justify-center">
                  <Button
                    size={'md'}
                    className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtn"
                    onClick={handleNextSlide}
                  >
                    {slide.step === 'done' ? 'Get Started' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute top-[58%] left-0 right-0 custom-pagination flex justify-center"></div>
      </Swiper>
    </PageTransition>
  );
};

export default SliderOnboarding;
