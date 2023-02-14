import clsx from 'clsx'
import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  option: {
    boxSizing: 'border-box',
    padding: 8,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(202, 205, 207, 0.3)',
    },
  },
  selected: {
    backgroundColor: 'rgba(136, 200, 235, 0.6)',
  },
})

interface Props {
  onClick?: () => void
  className?: string
  selected?: boolean
  children: React.ReactNode
}

export const Option = ({ onClick, className, selected, children }: Props) => {
  const styles = useStyles()

  return (
    <div
      className={clsx(styles.option, className, {
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
