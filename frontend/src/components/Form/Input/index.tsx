import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
};

const InputControlled: ForwardRefRenderFunction<HTMLInputElement, InputProps>
= ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name} fontSize="md">{label}</FormLabel>}      

      <ChakraInput
        id={name}
        name={name}
        bg="blackAlpha.200"
        _placeholder={{ color: 'gray.700' }}
        size="md"
        focusBorderColor="blue.400"        
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export const Input = forwardRef(InputControlled);