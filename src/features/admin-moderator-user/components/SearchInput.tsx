import React, { ChangeEvent } from 'react'


interface ISearchInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    searchTerm: string;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: ISearchInputProps) => {
    const { searchTerm, type = "text", placeholder, handleOnChange, ...restProps } = props
    return (
        <>
            <input
                type={type}
                className='text-sm w-full py-2 px-3 border border-borderColor rounded-md'
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleOnChange}
                {...restProps}
            />
        </>
    )
}

export default SearchInput


