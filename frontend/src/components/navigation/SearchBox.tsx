import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

const SearchBox = ({ categories }: any) => {
    return (
        <div className="text-base font-medium text-gray-500 hover:text-gray-900">

            <div>
                <div className="mt-1 flex rounded-md shadow-sm border border-gray-200">
                    <div className="mt-1 mx-1 px-2 py-1">
                        <select
                            // onChange={e => onChange(e)}
                            name='category_id'
                            className='rounded-full'
                        >
                            <option value={0}>All</option>
                            {
                                categories &&
                                categories !== null &&
                                categories !== undefined &&
                                categories.map((category: { id: string | number, name: string }, index: React.Key | null | undefined) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }

                        </select>
                    </div>
                    
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                            type="text"
                            name="text"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border-gray-300"
                            placeholder="Search"
                        />
                    </div>

                    <button
                        type="button"
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <ArrowLongRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBox
