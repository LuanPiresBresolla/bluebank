import {  Avatar, Flex, IconButton, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { HeaderProfile } from "./HeaderProfile";
import { useSidebarDrawer } from "../../context/SidebarDrawer";
import { RiMenuLine } from "react-icons/ri";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

import logo from '../../assets/logo.svg';

export function Header() {
  const { width } = useWindowDimensions();
  const { onOpen } = useSidebarDrawer();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      w="100%"
      h="20"
      as="header"
      maxWidth={width}
      px="6"
      py={["2"]}
      align="center"
      bg="blackAlpha.300"
    >
      { !isDesktop && (
          <IconButton
            onClick={onOpen}
            icon={<RiMenuLine />}
            fontSize="24"
            variant="unstyled"
            aria-label="Abrir navageção"
            _focus={{ border: 'none' }}
          />
        )
      }

      <Image src={logo} width="15rem" />

      <Flex align="center" ml="auto">
        <HeaderProfile showProfile={isDesktop} />
      </Flex>
    </Flex>
  );
}