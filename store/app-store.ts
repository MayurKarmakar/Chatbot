import { appStoreSchema } from "@/schemas/zod-schemas";
import z from "zod";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useAppStore = create<z.infer<typeof appStoreSchema>>()(
  devtools(
    persist(
      (set) => ({
        openAIConfig: null,
        messages: [],
        setOpenAIConfig: ({
          openAIKey: secretKey,
          temparature,
          baseUrl,
          openAIModel,
        }) => {
          set({
            openAIConfig: {
              openAIKey: secretKey,
              temparature: temparature,
              baseUrl: baseUrl,
              openAIModel: openAIModel,
            },
          });
        },
        setMessages: (messages) => {
          set({
            messages: [...messages],
          });
        },
        createNewSession: () => {
          set({ messages: [] });
        },
      }),
      { name: "useAppStore" }
    )
  )
);

export { useAppStore };

