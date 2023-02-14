import { screen, render, /*fireEvent,*/ cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { ComboBox } from './combo-box'

afterEach(cleanup)

// const comboBoxTestId = 'combo-box'

/* FIXME: 
  fix errors: 
    ts-jest config: Cannot use import statement outside a module
    babel-jest: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. 
        You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports. 
*/

describe('Test ComboBox component', () => {
  const mockedOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
    { label: 'Option 6', value: 'option6' },
    { label: 'Option 7', value: 'option7' },
    { label: 'Option 8', value: 'option8' },
    { label: 'Option 9', value: 'option9' },
    { label: 'Option 10', value: 'option10' },
  ]

  it('should render without errors', async () => {
    const placeholderText = 'Выберите значение'
    render(
      <ComboBox
        options={mockedOptions}
        onChange={jest.fn()}
        value=""
        placeholder={placeholderText}
      />,
    )

    const placeholder = screen.getByText(placeholderText)

    expect(placeholder).toBeTruthy()
  })
  /* it('should call onChange when the first option is selected', async () => {
    const mockedOnChange = jest.fn()
    const { getByText, queryByTestId } = render(
      <ComboBox options={mockedOptions} onChange={mockedOnChange} value="" />,
    )

    const ComboBoxComponent = queryByTestId(comboBoxTestId)

    expect(ComboBoxComponent).toBeDefined()
    expect(ComboBoxComponent).not.toBeNull()
    expect(mockedOnChange).toHaveBeenCalledTimes(0)

    if (ComboBoxComponent?.firstChild) {
      fireEvent.click(ComboBoxComponent.firstChild)
      fireEvent.click(getByText('Option 1'))
    }

    expect(mockedOnChange).toHaveBeenCalledTimes(1)
    expect(mockedOnChange).toHaveBeenCalledWith({
      label: 'Option 1',
      value: 'option1',
    })
  })
  it('should call onChange when the first option is selected then second option then the 9th one', async () => {
    const mockedOnChange = jest.fn()
    const { getByText, queryByTestId } = render(
      <ComboBox options={mockedOptions} onChange={mockedOnChange} value="" />,
    )

    const ComboBoxComponent = queryByTestId(comboBoxTestId)

    expect(ComboBoxComponent).toBeDefined()
    expect(ComboBoxComponent).not.toBeNull()
    expect(mockedOnChange).toHaveBeenCalledTimes(0)

    if (ComboBoxComponent?.firstChild) {
      fireEvent.click(ComboBoxComponent.firstChild)
      fireEvent.click(getByText('Option 1'))

      fireEvent.click(ComboBoxComponent.firstChild)
      fireEvent.click(getByText('Option 9'))
    }

    expect(mockedOnChange).toHaveBeenCalledTimes(3)
    expect(mockedOnChange).toHaveBeenCalledWith({
      label: 'Option 9',
      value: 'option9',
    })
  })
  it('should call onChange when filtering by input value', async () => {
    const mockedOnChange = jest.fn()
    const { getByText, queryByTestId, container } = render(
      <ComboBox options={mockedOptions} onChange={mockedOnChange} value="" />,
    )
    const ComboBoxComponent = queryByTestId(comboBoxTestId)
    const input = container.querySelector('input')

    if (!!input) {
      fireEvent.change(input, {
        target: { value: 'option 1' },
      })
    }

    if (ComboBoxComponent?.firstChild) {
      fireEvent.click(ComboBoxComponent.firstChild)
      fireEvent.click(getByText('Option 1'))

      fireEvent.click(ComboBoxComponent.firstChild)
      fireEvent.click(getByText('Option 10'))
    }

    expect(mockedOnChange).toHaveBeenCalledTimes(1)
    expect(mockedOnChange).toHaveBeenCalledWith({
      label: 'Option 10',
      value: 'option10',
    })
  })*/
})
