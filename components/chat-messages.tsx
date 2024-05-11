import { Message, MessagesArray } from "@/schemas/zod-schemas";
import dayjs from "dayjs";
import { MessageSquareWarning } from "lucide-react";
import { forwardRef } from "react";
import { FormattedChatMessage } from "./formatted-chat-message";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import WelcomeMessage from "./welcome-message";

interface ChatMessagesProps {
  messages: Message[];
  partialAssistantMessage: string | null;
  loading: boolean;
  errorMessage: string;
  retryResponseGeneration: VoidFunction;
}

function RenderMessages({ messages }: { messages: MessagesArray }) {
  return messages.map((message, index) => (
    <FormattedChatMessage key={index} message={message} />
  ));
}

function RenderLoadingMessage({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <FormattedChatMessage
        loading={loading}
        message={{
          role: "assistant",
          content: "",
          timestamp: dayjs().unix(),
        }}
      />
    );
  }
  return null;
}

function RenderPartialAssistantMessage({
  partialAssistantMessage,
  loading,
}: {
  partialAssistantMessage: string | null;
  loading: boolean;
}) {
  if (partialAssistantMessage) {
    return (
      <FormattedChatMessage
        loading={loading}
        message={{
          role: "assistant",
          content: partialAssistantMessage,
          timestamp: dayjs().unix(),
        }}
      />
    );
  }
  return null;
}

function RenderErrorMessage({
  errorMessage,
  handleRetryResponseGeneration,
}: {
  errorMessage: string;
  handleRetryResponseGeneration: VoidFunction;
}) {
  if (errorMessage) {
    return (
      <div className="flex w-full justify-center">
        <div className="w-full md:w-3/5">
          <Alert variant={"destructive"} className="w-full">
            <MessageSquareWarning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
            <AlertDescription className="mt-1 w-full">
              Please update your OpenAI API integration configuration and then retry.
            </AlertDescription>
            <AlertDescription className="flex w-full justify-end">
              <Button size="sm" onClick={handleRetryResponseGeneration}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
  return null;
}

const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  function ChatMessages(
    {
      messages,
      partialAssistantMessage,
      loading,
      errorMessage,
      retryResponseGeneration,
    },
    ref
  ) {
    return (
      <div className="flex flex-col grow overflow-y-auto" ref={ref}>
        <WelcomeMessage />
        <div className="mt-auto">
          <RenderMessages messages={messages} />
          <RenderLoadingMessage loading={loading} />
          <RenderPartialAssistantMessage
            partialAssistantMessage={partialAssistantMessage}
            loading={loading}
          />
          <RenderErrorMessage
            errorMessage={errorMessage}
            handleRetryResponseGeneration={retryResponseGeneration}
          />
        </div>
      </div>
    );
  }
);

export { ChatMessages };

