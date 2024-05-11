"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { ConfigurationForm } from "./configuration-form";

type ChatConfigDialogProps = {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
};

function ChatConfigDialog({ open, close }: ChatConfigDialogProps) {
  
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        close(open);
      }}
      modal={true}
    >
      <DialogContent className="sm:max-w-auto h-auto bg-inherit">
        <DialogHeader>
          <DialogTitle>Customize OpenAI Integration</DialogTitle>
          <DialogDescription>
            Customize your OpenAI integration by configuring key settings such
            as API credentials, base path, and response temperature.
          </DialogDescription>
        </DialogHeader>
        <ConfigurationForm close={close} />
      </DialogContent>
    </Dialog>
  );
}

export { ChatConfigDialog };
