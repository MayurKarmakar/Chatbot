import { useAppStore } from "@/store/app-store";
import { Settings } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ChatConfigDialog } from "./chat-config-dialog";

interface ChatHeaderProps {
  handleResetError: Dispatch<SetStateAction<string>>;
}

function ChatHeader({ handleResetError }: ChatHeaderProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const createNewSession = useAppStore((state) => state.createNewSession);

  function handleNewSession() {
    handleResetError("");
    createNewSession();
  }

  return (
    <div className="flex flex-col md:flex-row h-auto items-center justify-center border-b-2 border-[#3c3e42] px-5 dark:text-gray-300 text-lg py-3 gap-5">
      <p className="text-[18px] font-[700] leading-[1.33334] tracking-normal">
        Chatbot
      </p>
      <button
        onClick={handleNewSession}
        className="md:ml-auto text-sm bg-gray-700 border-gray-700 hover:bg-gray-600 rounded-md px-3 dark:text-white p-2"
      >
        New Session
      </button>
      <Settings onClick={() => setOpenModal(true)} className="cursor-pointer" />
      <ChatConfigDialog open={openModal} close={setOpenModal} />
    </div>
  );
}

export { ChatHeader };

