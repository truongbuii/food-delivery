import { OptionsObject, useSnackbar } from "notistack";
import React, { ReactNode } from "react";

interface IMessageContent {
  content: ReactNode | string;
}
export const MessageContent = ({ content }: IMessageContent) => {
  return <>{content}</>;
};

export const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const popMessage = React.useCallback(
    (
        variant: "default" | "error" | "success" | "warning" | "info",
        placement?: "top-center" | "top-left"
      ) =>
      (
        content: ReactNode | string,
        options?: OptionsObject<typeof variant>
      ) => {
        enqueueSnackbar(<MessageContent content={content} />, {
          ...options,
          variant,
          transitionDuration: 500,
          autoHideDuration: 2500,
          preventDuplicate: true,
          anchorOrigin: {
            vertical: placement ? (placement.split("-")[0] as any) : "top",
            horizontal: placement ? (placement.split("-")[1] as any) : "center",
          },
        });
      },
    [enqueueSnackbar]
  );

  return React.useMemo(() => {
    return {
      error: popMessage("error"),
      info: popMessage("info"),
      success: popMessage("success"),
      warning: popMessage("warning"),
      message: popMessage,
    };
  }, [popMessage]);
};
