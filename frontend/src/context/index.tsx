import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { SidebarDrawerProvider } from "./SidebarDrawer";
import { BalanceProvider } from "./Balance";
import { AlertDialogProvider } from "./AlertDialog";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <AlertDialogProvider>
        <SidebarDrawerProvider>
          <BalanceProvider>
            {children}
          </BalanceProvider>
        </SidebarDrawerProvider>
      </AlertDialogProvider>
    </AuthProvider>
  );
}