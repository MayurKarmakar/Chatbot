"use client";

import { messageSchema } from "@/schemas/zod-schemas";
import { useAppStore } from "@/store/app-store";
import dayjs from "dayjs";
import { EventEmitter } from "events";
import { OpenAIChatApi } from "llm-api";
import { useEffect, useRef, useState } from "react";
import z from "zod";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";

function Chatbox() {
  const { messages, openAIConfig, setMessages } = useAppStore((state) => state);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [partialAssistantMessage, setPartialAssistantMessage] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [isResponsePending, setIsResponsePending] = useState<boolean>(false);
  const [error, setError] = useState("");

  function scrollToBottomOfMessages() {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }

  async function generateAssistantResponse(
    userMessage: z.infer<typeof messageSchema>
  ) {
    let localLoading = true;

    setError("");
    setInputDisabled(true);
    setLoading(localLoading);
    setPartialAssistantMessage("");

    const tokenEvents = new EventEmitter();

    tokenEvents.addListener("data", (token) => {
      scrollToBottomOfMessages();
      if (localLoading) {
        setLoading(false);
        localLoading = false;
      }
      setPartialAssistantMessage(
        (partialAssistantMessage) => partialAssistantMessage + token
      );
    });

    try {
      const openAI = new OpenAIChatApi(
        {
          apiKey: openAIConfig?.openAIKey,
          baseURL: openAIConfig?.baseUrl,
          dangerouslyAllowBrowser: true,
        },
        {
          model: openAIConfig?.openAIModel,
          temperature: openAIConfig?.temparature[0],
          stream: true,
        }
      );

      const assistantResponse = await openAI.chatCompletion(
        [...messages, userMessage],
        {
          events: tokenEvents,
        }
      );

      const content = assistantResponse.content;

      if (!content) {
        console.log("content is undefined");
        throw new Error("content is undefined");
      }

      const botMessage: z.infer<typeof messageSchema> = {
        role: "assistant",
        content: content,
        timestamp: dayjs().unix(),
      };

      setPartialAssistantMessage(null);
      setMessages([...messages, botMessage]);
      setIsResponsePending(false);
      setInputDisabled(false);
    } catch (e: any) {
      console.error(e);
      scrollToBottomOfMessages();
      setError(e.error.message);
      setLoading(false);
      setInputDisabled(false);
    }
  }

  async function handleUserMessage(message: string) {
    const userMessage: z.infer<typeof messageSchema> = {
      timestamp: dayjs().unix(),
      role: "user",
      content: message,
    };

    setMessages([...messages, userMessage]);
    setIsResponsePending(true);
  }

  function handleRetryResponseGeneration() {
    const message = messages[messages.length - 1];
    generateAssistantResponse(message);
  }

  useEffect(() => {
    if (messages.length > 0 && isResponsePending) {
      setError("");
      const message = messages[messages.length - 1];
      generateAssistantResponse(message);
    }
  }, [messages, isResponsePending]);

  useEffect(() => {
    setTimeout(scrollToBottomOfMessages, 100);
  }, [messages]);

  return (
    <div className="flex flex-col h-full md:border md:border-[#3c3e42] md:rounded-md">
      <ChatHeader handleResetError={setError} />
      <ChatMessages
        messages={messages}
        ref={messageContainerRef}
        partialAssistantMessage={partialAssistantMessage}
        loading={loading}
        errorMessage={error}
        retryResponseGeneration={handleRetryResponseGeneration}
      />
      <ChatInput onMessage={handleUserMessage} inputDisabled={inputDisabled} />
    </div>
  );
}

export { Chatbox };

