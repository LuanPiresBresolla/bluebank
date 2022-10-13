import { Avatar, Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/Auth';

interface HeaderProfileProps {
  showProfile?: boolean;
}

export function HeaderProfile({ showProfile = true }: HeaderProfileProps) {
  const { signOut, user } = useAuth();
  
  return (
    <Flex align="center">
      {showProfile && (
        <Box mr="4" textAlign="right">
          <Text width="180px">{user.name}</Text>
          <Text width="180px" color="gray.500" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}

      <Menu>
        <MenuButton>
          <Avatar size={showProfile ? "md" : "sm"} name="Luan Bresolla" bg="#3182CE" color="white" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={signOut}>Sair</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}