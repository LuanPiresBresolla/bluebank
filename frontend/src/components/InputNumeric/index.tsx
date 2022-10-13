import { forwardRef, ForwardRefRenderFunction } from 'react';
import { InputProps as ChakraInputProps } from '@chakra-ui/react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Input } from '../Form/Input';

interface InputProps extends ChakraInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
};

const InputControlled: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ name, label, error, control, ...rest }, ref) => {
    return (
      <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              fixedDecimalScale={true}
              allowLeadingZeros={true}
              allowNegative={false}
              decimalScale={2}
              placeholder="0,00"
              value={value}
              name={name}
              label={label}
              error={error}
              onValueChange={v => onChange(v.floatValue)}
              customInput={Input}
            />
          )}
        />
    );
  }

export const InputNumeric = forwardRef(InputControlled);
