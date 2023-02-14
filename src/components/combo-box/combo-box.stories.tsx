import { useState } from 'react'
import { ComboBox } from './combo-box'

export default {
  title: 'ComboBox',
  argTypes: {
    disabled: { control: 'boolean', defaultValue: false },
    optionCount: {
      control: { type: 'number', min: 0, max: 30, step: 1 },
      defaultValue: 5,
    },
  },
}

interface Props {
  disabled: boolean
  optionCount: number
}

export const Default = ({ disabled, optionCount }: Props) => {
  const [value, setValue] = useState('')

  const handleChange = (v: string) => setValue(v)

  const options = Array.from({ length: optionCount }, (_v, i) => ({
    value: `Option${i}`,
    label: `Опция${i}`,
  }))

  return (
    <div style={{ width: 200 }}>
      <ComboBox
        value={value}
        disabled={disabled}
        onChange={handleChange}
        options={options}
        getValue={(option) => option.value}
        getLabel={(option) => option.label}
      />
    </div>
  )
}
