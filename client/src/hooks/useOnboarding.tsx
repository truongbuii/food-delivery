import { ONBOARDING_STORAGE_KEY } from "@/configs";
import { PATHNAME } from "@/configs";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { clientStorage } from "@/stores";

export const StepKey = {
  started: "started",
  step1: "step1",
  step2: "step2",
  step3: "step3",
  done: "done",
};

export const useOnboarding = () => {
  const [activeStep, setActiveStep] = useState<keyof typeof StepKey>("started");
  const router = useRouter();

  const onNextStep = useCallback(
    (stepKey: keyof typeof StepKey) => {
      if (stepKey === "done") {
        clientStorage.set(ONBOARDING_STORAGE_KEY, true);
        router.push(PATHNAME.SIGN_IN);
        return;
      }
      setActiveStep(stepKey);
    },
    [router]
  );

  return {
    onNextStep,
    activeStep,
  };
};
