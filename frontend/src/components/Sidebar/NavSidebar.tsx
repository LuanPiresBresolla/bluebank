import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { RiCurrencyLine, RiDashboardLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";

export function NavSidebar() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard" active>Dashboard</NavLink>
        <NavLink icon={RiCurrencyLine} href="/balance">Saque Eletrônico</NavLink>
        <NavLink icon={GiCash} href="/transactions">Transações</NavLink>
      </NavSection>
    </Stack>
  );
}