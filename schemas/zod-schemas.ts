import { OpenAIChatApi } from "llm-api";
import z from "zod";

const messageSchema = z.object({
  content: z.string(),
  role: z.enum(["assistant", "user"]),
  timestamp: z.number(),
});

const messagesSchema = z.array(messageSchema);

const openAIAPIConfigSchema = z.object({
  openAIKey: z.string().min(1, "OpenAI API Key can't be empty"),
  temparature: z.number().array().min(0).max(1),
  baseUrl: z.string().min(1, "OpenAI API Base url can't be empty").url(),
  openAIModel: z.string().min(1, "Model name can't be empty"),
});

const appStoreSchema = z.object({
  openAIConfig: openAIAPIConfigSchema.or(z.null()),
  messages: messagesSchema,
  setOpenAIConfig: z.function().args(openAIAPIConfigSchema),
  setMessages: z.function().args(messagesSchema),
  createNewSession: z.function(),
});

const OpenAiClientHook = z.array(z.instanceof(OpenAIChatApi));

export type Message = z.infer<typeof messageSchema>;
export type MessagesArray = z.infer<typeof messageSchema>[];

export {
  OpenAiClientHook,
  appStoreSchema,
  messageSchema,
  messagesSchema,
  openAIAPIConfigSchema
};

