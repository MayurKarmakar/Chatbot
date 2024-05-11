import { Chatbox } from "@/components/chatbox";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Chatbox />
    </ThemeProvider>
  );
}
export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
