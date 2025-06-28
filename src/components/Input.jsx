import React, { useId } from 'react'
import { forwardRef } from 'react'

const Input =forwardRef(({
    label,
    type = 'text',
    className = "",
    ...props
} , ref )=>{
    const id = useId();
    return(
        <div>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}

            <input type={type} className={`${className}`} ref={ref} {...props} id = {id} />
        </div>
    )

})

export default Input