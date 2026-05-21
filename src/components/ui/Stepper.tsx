import React, {
  Children,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";
import "./Stepper.css";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  completedText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
}

interface RenderStepIndicatorProps {
  step: number;
  currentStep: number;
  onStepClick: (clicked: number) => void;
}

type TransitionState =
  | {
      from: number;
      to: number;
      direction: 1 | -1;
      phase: "prepare" | "run";
    }
  | null;

const TRANSITION_MS = 400;

export default function Stepper({
  children,
  className,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  completeButtonText = "Complete",
  completedText = "Completed",
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const stepsArray = useMemo(() => Children.toArray(children), [children]);
  const totalSteps = stepsArray.length;
  const clampStep = (step: number) => Math.min(Math.max(step, 1), Math.max(totalSteps, 1));

  const [currentStep, setCurrentStep] = useState<number>(clampStep(initialStep));
  const [transition, setTransition] = useState<TransitionState>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);

  const fromPanelRef = useRef<HTMLDivElement | null>(null);
  const toPanelRef = useRef<HTMLDivElement | null>(null);

  const visibleStep = transition ? transition.to : currentStep;
  const isLastStep = visibleStep === totalSteps;

  const {
    onClick: onBackClick,
    className: backButtonClassName,
    ...backButtonRest
  } = backButtonProps;
  const {
    onClick: onNextClick,
    className: nextButtonClassName,
    ...nextButtonRest
  } = nextButtonProps;

  useEffect(() => {
    setCurrentStep(clampStep(initialStep));
  }, [initialStep, totalSteps]);

  useLayoutEffect(() => {
    if (!transition || transition.phase !== "prepare") return;

    const fromHeight = fromPanelRef.current?.offsetHeight ?? 0;
    const toHeight = toPanelRef.current?.offsetHeight ?? fromHeight;
    const nextHeight = toHeight || fromHeight;

    setContentHeight(fromHeight || nextHeight);

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setContentHeight(nextHeight);
        setTransition((previous) =>
          previous ? { ...previous, phase: "run" } : previous
        );
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [transition]);

  useEffect(() => {
    if (!transition || transition.phase !== "run") return;

    const timeout = window.setTimeout(() => {
      setCurrentStep(transition.to);
      setTransition(null);
      setContentHeight(null);
    }, TRANSITION_MS);

    return () => window.clearTimeout(timeout);
  }, [transition]);

  useEffect(() => {
    if (!justCompleted) return;

    const timeout = window.setTimeout(() => {
      setJustCompleted(false);
    }, 1200);

    return () => window.clearTimeout(timeout);
  }, [justCompleted]);

  if (!totalSteps) return null;

  const goToStep = (targetStep: number) => {
    if (
      transition ||
      targetStep < 1 ||
      targetStep > totalSteps ||
      targetStep === visibleStep
    ) {
      return;
    }

    setJustCompleted(false);
    const direction: 1 | -1 = targetStep > visibleStep ? 1 : -1;

    setTransition({
      from: currentStep,
      to: targetStep,
      direction,
      phase: "prepare",
    });

    onStepChange(targetStep);
  };

  const handleBack = () => {
    if (visibleStep > 1) {
      goToStep(visibleStep - 1);
    }
  };

  const handleNext = () => {
    if (visibleStep < totalSteps) {
      goToStep(visibleStep + 1);
      return;
    }

    setJustCompleted(true);
    onFinalStepCompleted();
  };

  return (
    <div className={cn("outer-container", className)} {...rest}>
      <div
        className={cn(
          "step-circle-container",
          justCompleted && "step-circle-container--completed",
          stepCircleContainerClassName
        )}
      >
        <div className={cn("step-indicator-row", stepContainerClassName)}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;

            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep: visibleStep,
                    onStepClick: goToStep,
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={visibleStep}
                    onClickStep={goToStep}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={visibleStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          currentStep={currentStep}
          steps={stepsArray}
          transition={transition}
          contentHeight={contentHeight}
          className={cn("step-content-default", contentClassName)}
          fromPanelRef={fromPanelRef}
          toPanelRef={toPanelRef}
        />

        <div className={cn("footer-container", footerClassName)}>
          <div className={cn("footer-nav", visibleStep !== 1 ? "spread" : "end")}>
            {visibleStep !== 1 && (
              <button
                type="button"
                onClick={(event) => {
                  onBackClick?.(event);
                  if (!event.defaultPrevented) {
                    handleBack();
                  }
                }}
                className={cn("back-button", backButtonClassName)}
                {...backButtonRest}
              >
                {backButtonText}
              </button>
            )}
            <button
              type="button"
              onClick={(event) => {
                onNextClick?.(event);
                if (!event.defaultPrevented) {
                  handleNext();
                }
              }}
              className={cn(
                "next-button",
                justCompleted && "next-button--completed",
                nextButtonClassName
              )}
              {...nextButtonRest}
            >
              {isLastStep
                ? justCompleted
                  ? completedText
                  : completeButtonText
                : nextButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  currentStep: number;
  steps: ReactNode[];
  transition: TransitionState;
  contentHeight: number | null;
  className?: string;
  fromPanelRef: React.RefObject<HTMLDivElement | null>;
  toPanelRef: React.RefObject<HTMLDivElement | null>;
}

function StepContentWrapper({
  currentStep,
  steps,
  transition,
  contentHeight,
  className,
  fromPanelRef,
  toPanelRef,
}: StepContentWrapperProps) {
  const style = contentHeight === null ? undefined : { height: `${contentHeight}px` };

  if (!transition) {
    return (
      <div className={className} style={style}>
        <div className="step-panel step-panel--static">{steps[currentStep - 1]}</div>
      </div>
    );
  }

  const isForward = transition.direction > 0;

  return (
    <div className={cn(className, "step-content-default--animating")} style={style}>
      <div
        ref={fromPanelRef}
        className={cn(
          "step-panel",
          "step-panel--absolute",
          "step-panel--transition",
          transition.phase === "prepare"
            ? "step-panel--center"
            : isForward
              ? "step-panel--run-exit-forward"
              : "step-panel--run-exit-backward"
        )}
      >
        {steps[transition.from - 1]}
      </div>
      <div
        ref={toPanelRef}
        className={cn(
          "step-panel",
          "step-panel--absolute",
          "step-panel--transition",
          transition.phase === "prepare"
            ? isForward
              ? "step-panel--prepare-enter-forward"
              : "step-panel--prepare-enter-backward"
            : "step-panel--center"
        )}
      >
        {steps[transition.to - 1]}
      </div>
    </div>
  );
}

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="step-default">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (step: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}: StepIndicatorProps) {
  const status =
    currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "step-indicator",
        disableStepIndicators && "step-indicator--disabled"
      )}
      aria-current={status === "active" ? "step" : undefined}
      aria-label={`Go to education step ${step}`}
    >
      <div className={cn("step-indicator-inner", `step-indicator-inner--${status}`)}>
        {status === "complete" ? (
          <CheckIcon className="check-icon" />
        ) : status === "active" ? (
          <div className="active-dot" />
        ) : (
          <span className="step-number">{step}</span>
        )}
      </div>
    </button>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  return (
    <div className="step-connector" aria-hidden="true">
      <div
        className={cn(
          "step-connector-inner",
          isComplete && "step-connector-inner--complete"
        )}
      />
    </div>
  );
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

function CheckIcon(props: CheckIconProps) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path className="check-icon-path" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
