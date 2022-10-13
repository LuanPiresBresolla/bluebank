import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useMediaQuery } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../context/SidebarDrawer";
import { NavSidebar } from "./NavSidebar";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const [isDrawerSidebar] = useMediaQuery('(max-width: 960px)');

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton mt="2" _focus={{ border: 'none' }} />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <NavSidebar />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  
  return (
    <Box as="aside" w="64" mr="8">
      <NavSidebar />
    </Box>
  );
}