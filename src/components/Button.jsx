import React from 'react'

const Button = ({
    children,
    type = 'button',
    textColor = 'text-black',
    bgColor = 'blue',
    className = '',
    onClick,
    ...props
}) => {
    
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`}{...props}>{children}</button>
  )
}

export default Button