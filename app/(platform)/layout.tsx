import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ModelProvider from "@/components/models/providers/model-provider";
import QueryProvider from "@/components/models/providers/query-provider";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModelProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};
export default PlatformLayout;
