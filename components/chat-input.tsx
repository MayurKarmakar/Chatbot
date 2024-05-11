import { useAppStore } from "@/store/app-store";
import { useState } from "react";
import { ArrowRightButton } from "./arrow-button";

type ChatInputProps = {
  onMessage: (message: string) => void;
  inputDisabled: boolean;
};

function ChatInput({ onMessage, inputDisabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [rowCount, setRowCount] = useState(3);
  const openAIConfig = useAppStore((state) => state.openAIConfig);

  function handleNewMessage() {
    onMessage(message);
    setMessage("");

    if (rowCount > 3) {
      setRowCount(3);
    }
  }

  function handleRowCount(type: "INCREASE" | "DECREASE") {
    if (type === "INCREASE") {
      if (rowCount < 10) {
        setRowCount((prevCount) => prevCount + 1);
      }
    }

    if (type === "DECREASE") {
      if (rowCount > 3) {
        setRowCount((prevCount) => prevCount - 1);
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!openAIConfig) return;

    const isEnter = event.code === "Enter" || event.code === "NumpadEnter";
    if (isEnter && !event.shiftKey) {
      event.preventDefault();
      handleNewMessage();
      return;
    }
    if (isEnter && event.shiftKey) {
      handleRowCount("INCREASE");
      return;
    }

    if (
      (event.code === "Backspace" && event.shiftKey) ||
      event.code === "Backspace"
    ) {
      handleRowCount("DECREASE");
      return;
    }
  }

  return (
    <div className="dark:border-[#565856] border rounded-md p-2 md:p-3 dark:bg-[#222529] focus:border-[#818385] m-1 md:m-3">
      <textarea
        value={message}
        className="w-full bg-inherit dark:text-[#c7c8c9] focus:outline-none placeholder-[#7a7c7e] overflow-hidden resize-none disabled:cursor-not-allowed"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        rows={rowCount}
        disabled={inputDisabled || !openAIConfig}
        cols={5}
        placeholder="Message"
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <div className="flex w-full">
        <button
          disabled={message.length === 0 || !openAIConfig}
          type="button"
          onClick={handleNewMessage}
          className="h-[28px] w-9 dark:text-gray-300 bg-[#007a5a] border-[#66af9c] hover:bg-[#148567] rounded-md p-1 ml-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <ArrowRightButton />
        </button>
      </div>
    </div>
  );
}

export { ChatInput };
