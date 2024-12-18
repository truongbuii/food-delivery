'use client';

import { useOnboarding } from '@/hooks/useOnboarding';
import SliderOnboarding from '../slide-onboarding';
import Welcome from '../welcome';

const StepOnboarding = () => {
  const { onNextStep, activeStep } = useOnboarding();

  if (activeStep === 'started') {
    return <Welcome onNext={() => onNextStep('step1')} />;
  }

  return <SliderOnboarding />;
};

export default StepOnboarding;
