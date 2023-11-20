
const Select = ({ Label, placeholder, options, value, onChange, error, globalError, outline = true }: any) => {
    return (
        <div className="mt-[1em]">
            <label className={`${error || globalError ? 'text-danger' : 'text-black/[.62] '} block text-sm font-semibold leading-6 mb-2 `}>{Label}</label>
            <select
                className={`${error || globalError ? 'border-danger' : ' border-neutral-400'} block w-full flex-1 ${outline && 'border  rounded-md'}  bg-transparent py-4 px-4 text-gray-900 placeholder:text-gray-400 text-[14px] font-regular outline-none  sm:text-sm sm:leading-6`}
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                <option value="">{placeholder}</option>
                {options.map((data: any) =>
                    <option
                        className="text-sm text-secondaryColor"
                        value={data.id}
                        key={data.id}
                    >{data.name}
                    </option>
                )}
            </select>
            <p className='text-danger font-medium text-xs mt-3'>{error}</p>
        </div>

    )
}

export default Select