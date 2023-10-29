

const Search = () => {
    return (
        <>
            {/* FIXME: Search to seperate component */}
            <div className="flex justify-center items-center cursor-pointer lg:ms-[45px] md:!pt-3 !pt-4">
                <input
                    type="search"
                    className="relative bg-[#edf3f8] m-0 lg:block hidden flex-auto lg:flex-row rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primaryColor dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primaryColor"
                    placeholder="Search"
                    aria-label="Search"
                />

                <div className="hidden lg:flex w-full justify-center flex-wrap items-stretch gap-1">
                    {/* <!--Search icon--> */}
                    <span
                        className="text-[1.8em] input-group-text flex  items-center whitespace-nowrap rounded text-center font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </span>

                    <span className="hidden lg:inline-block md:block text-xs text-secondaryColor hover:text-primaryColor">Search</span>
                </div>
            </div>
        </>
    )
}

export default Search