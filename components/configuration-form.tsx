import { openAIAPIConfigSchema } from "@/schemas/zod-schemas";
import { useAppStore } from "@/store/app-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

type ConfigurationFormProps = {
  close: Dispatch<SetStateAction<boolean>>;
};

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ close }) => {
  const { setOpenAIConfig: setOpenAICreds, openAIConfig: openAICreds } =
    useAppStore((state) => state);

  const form = useForm<z.infer<typeof openAIAPIConfigSchema>>({
    resolver: zodResolver(openAIAPIConfigSchema),
    defaultValues: {
      openAIKey: openAICreds ? openAICreds.openAIKey : "",
      temparature: openAICreds ? openAICreds.temparature : [0.6],
      baseUrl: openAICreds ? openAICreds.baseUrl : "",
      openAIModel: openAICreds ? openAICreds.openAIModel : "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  function handleFormData(formData: z.infer<typeof openAIAPIConfigSchema>) {
    setOpenAICreds(formData);
    close(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormData)}
        onReset={() => {
          form.resetField("baseUrl", {
            defaultValue: "",
          });
          form.resetField("openAIKey", {
            defaultValue: "",
          });
          form.resetField("temparature", {
            defaultValue: [0.6],
          });
          form.resetField("openAIModel", {
            defaultValue: "",
          });
        }}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="openAIKey"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>OpenAI API Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********************"
                    {...field}
                    className="bg-inherit focus:border-none"
                  />
                </FormControl>
                <FormDescription>
                  Enter your unique API key provided by OpenAI to authenticate
                  requests.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="openAIModel"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>OpenAI API Model</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your OpenAI model name.</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="baseUrl"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>OpenAI API Base URL</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the base URL endpoint for making API requests to
                  OpenAI.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="temparature"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Temprature</FormLabel>
                <FormDescription>
                  Ranges between 0 to 1. Temprature ~ [
                  {form.getValues("temparature")}]
                </FormDescription>
                <FormControl>
                  <Slider
                    defaultValue={[0]}
                    max={1}
                    step={0.1}
                    value={form.getValues("temparature")}
                    onValueChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormDescription>
                  Defines the randomness of generated text responses
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-row w-full justify-end gap-5">
          <Button type="reset" size={"sm"}>
            Reset
          </Button>
          <Button type="submit" size={"sm"}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { ConfigurationForm };
