import { NumericFormat, NumericFormatProps } from 'react-number-format';

type INumberFormat = NumericFormatProps & {
  value: number | string;
}

export function NumberFormat({ value = 0, ...props }: INumberFormat) {
  return (
    <NumericFormat
      value={value}
      className="dinheiro"
      displayType={'text'}
      fixedDecimalScale={true}
      allowLeadingZeros={true}
      decimalScale={2}
      decimalSeparator=','
      thousandSeparator={'.'}
      prefix={' '}
      {...props}
    />
  )
}