import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useSidebarDrawer } from "../../context/SidebarDrawer";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
  active?: boolean;
} 

export function NavLink({ icon, children, active, href, ...rest }: NavLinkProps) {
  const navigate = useNavigate();
  const { onClose } = useSidebarDrawer();
  const resolved = useResolvedPath(href);
  const match = useMatch({ path: resolved.pathname, end: true });

  function handleNavigate() {
    navigate(href);
    onClose();
  }

  return (
    <ChakraLink
      display="flex"
      alignItems="center"
      color={match ? "blue.500" : undefined}
      onClick={handleNavigate}
      {...rest}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </ChakraLink>
  );
}