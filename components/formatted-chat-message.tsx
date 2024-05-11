import { messageSchema } from "@/schemas/zod-schemas";
import { formatDate } from "@/utils/helpers";
import z from "zod";
import { ChatMessage } from "./chat-message";

function FormattedChatMessage({
  message,
  loading,
}: {
  message: z.infer<typeof messageSchema>;
  loading?: boolean;
}) {
  
  return (
    <div className="flex flex-col">
      <div className="relative md:my-2">
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <button className="absolute top-1/2 left-1/2 transform font-normal -translate-x-1/2 -translate-y-1/2 px-4 bg-[#1a1d21] text-[13px] border border-[#3c3e42] text-white rounded-full h-[28px] dark:text-gray-300 leading-[27px]">
          {formatDate(message.timestamp, "dddd, MMMM Do", true)}
        </button>
      </div>
      <ChatMessage message={message} loading={loading} />
    </div>
  );
}

export { FormattedChatMessage };
