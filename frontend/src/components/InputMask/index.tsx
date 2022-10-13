import { forwardRef, ForwardRefRenderFunction } from 'react';
import { InputProps as ChakraInputProps } from '@chakra-ui/react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { Input } from '../Form/Input';

interface InputProps extends ChakraInputProps {
  name: string;
  control: Control<any>;
  mask: string;
  label?: string;
  error?: FieldError;
};

const InputControlled: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ name, label, w, flexDirection, error, control, mask, ...rest }, ref) => {
    return (
      <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <PatternFormat
              format={mask}
              value={value}
              name={name}
              label={label}
              error={error}
              valueIsNumericString
              isRequired={false}
              onValueChange={v => onChange(v.value)}
              w={w}
              flexDirection={flexDirection}
              customInput={Input}
            />
          )}
        />
    );
  }

export const InputMask = forwardRef(InputControlled);
