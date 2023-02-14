import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useOutsideClickListener } from '../../hooks'
import { ReactComponent as SelectIcon } from './caret-down.svg'
import { Option } from './option'

const useStyles = createUseStyles({
  comboBox: {
    boxSizing: 'border-box',
    minWidth: 200,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    fontFamily: 'system-ui',
  },
  inputBox: {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    top: 8,
    margin: 0,
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'gray',
  },
  rotateIcon: {
    transform: 'rotate(180deg)',
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '8px',
    width: '100%',
    padding: '8px 16px 8px 8px',
    fontSize: '1rem',

    '&:focus': {
      borderColor: 'rgba(136, 200, 235, 0.6)',
      outline: 'none',
    },
  },
  popup: {
    boxSizing: 'border-box',
    borderRadius: '8px',
    maxHeight: '30vh',
    overflow: 'auto',
    boxShadow:
      '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
  },
  popupClose: {
    transitionDuration: '0.5s',
    transform: 'translateY(-100%)',
    display: 'none',
  },
  popupOpen: {
    transitionDuration: '0.5s',
    transform: 'translateY(0%)',
    display: 'block',
  },
})

interface ComboBoxProps<OptionType = string> {
  value: string
  defaultValue?: string
  onChange: (value: string) => void
  options: OptionType[]
  getValue?: (option: OptionType) => string
  getLabel?: (option: OptionType) => string
  disabled?: boolean
  placeholder?: string
}

export function ComboBox<OptionType = string>({
  value,
  onChange,
  defaultValue = '',
  options,
  getValue = (option) => String(option),
  getLabel = (option) => String(option),
  disabled,
  ...props
}: ComboBoxProps<OptionType>) {
  const styles = useStyles()
  const ref = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState(value ?? defaultValue)
  const [open, setOpen] = useState(false)

  const togglePopup = () => setOpen((v) => !v)

  useOutsideClickListener(ref, () => {
    handleClearInput()
    setOpen(false)
  })

  const filteredOption = options.filter((o) => getLabel(o).includes(inputValue))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleClearInput = () =>
    setInputValue((v) => {
      const option = options.find((o) => getLabel(o) === v)
      return option ? getLabel(option) : defaultValue
    })

  const handleClickOnOption = (option: OptionType) => {
    setInputValue(getLabel(option))
    onChange(getValue(option))
    togglePopup()
  }

  const handleClickOnSelectButton = () => {
    if (!disabled) {
      if (!open) inputRef?.current?.focus()
      togglePopup()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleClearInput()
  }

  return (
    <div className={styles.comboBox} data-testid="combo-box" ref={ref}>
      <div
        className={styles.inputBox}
        onClick={handleClickOnSelectButton}
        onKeyDown={handleKeyDown}
      >
        <input
          tabIndex={0}
          value={inputValue}
          onChange={handleInputChange}
          className={styles.input}
          ref={inputRef}
          disabled={disabled}
          {...props}
        />
        <button
          disabled={disabled}
          className={clsx(styles.iconButton, { [styles.rotateIcon]: open })}
        >
          <SelectIcon width={15} height={15} />
        </button>
      </div>
      <div
        className={clsx(styles.popup, {
          [styles.popupOpen]: open,
          [styles.popupClose]: !open,
        })}
      >
        {!!filteredOption.length ? (
          filteredOption.map((option) => (
            <Option
              selected={value === getValue(option)}
              key={getValue(option)}
              onClick={() => handleClickOnOption(option)}
            >
              {getLabel(option)}
            </Option>
          ))
        ) : (
          <Option>Нет опций для отображения</Option>
        )}
      </div>
    </div>
  )
}
