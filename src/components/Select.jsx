import React from 'react'
import { forwardRef , useId } from 'react'
const Select = ({
    options,
    label,
    className = "",
    ...props
} , ref) => {
    const id = useId();
  return (
    <div  className='w-full'>

        {
            label && <label htmlFor={id} className = {`${className}`}></label>
        }

        <select {...props} id={id} ref = {ref} 
        className={`px-3 py-2 rounded-lg  text-black outline-none  duration-200 border border-gray-200 w-full ${className}`}>

        {
            options?.map((option)=>{
                
                return <option className='text-black' key={option} value={option}>{option}</option>
            })
        }
        </select>

    </div>
  )
}

export default forwardRef(Select)