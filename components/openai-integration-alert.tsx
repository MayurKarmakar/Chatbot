import { Wrench } from "lucide-react";
import { useState } from "react";
import { ChatConfigDialog } from "./chat-config-dialog";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

function OpenAIIntegrationAlert() {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div className="w-full md:w-3/5">
      <Alert className="bg-inherit md:border border-[#3c3e42] md:rounded-md">
        <Wrench className="h-4 w-4" />
        <AlertTitle>OpenAI Credentials Required</AlertTitle>
        <AlertDescription>
          To enhance your chatting experience, we require your OpenAI
          credentials. Please provide your API key and customize the necessary
          settings to continue using our services seamlessly.
        </AlertDescription>
        <AlertDescription className="mt-2">
          To customize your OpenAI integration, click the &quot;Customize OpenAI
          Integration&quot; button below.
        </AlertDescription>
        <AlertDescription className="mt-2">
          <Button size={"sm"} onClick={() => setOpenForm(true)}>
            Customize OpenAI Integration
          </Button>
        </AlertDescription>
      </Alert>
      <ChatConfigDialog open={openForm} close={setOpenForm} />
    </div>
  );
}

export { OpenAIIntegrationAlert };
