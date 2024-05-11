import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

function ChatDisabledAlert() {
  return (
    <div className="w-full md:w-3/5">
      <Alert className="bg-inherit md:border border-[#3c3e42] md:rounded-md">
        <Info className="h-4 w-4" />
        <AlertTitle>Chat Disabled</AlertTitle>
        <AlertDescription>
          Oops! Chat is disabled until you provide the required OpenAI API
          details. Please fill out the Customize OpenAI Integration form with
          your OpenAI API Key, API Base URL, Model Name, and Response
          Temperature to enable chatting.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export { ChatDisabledAlert };

