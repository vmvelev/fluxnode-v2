'use client';

import { useRouter } from 'next/navigation'
import { useRef } from "react";

const SearchHome = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = inputRef.current.value;
    if (search) {
      router.push(`/wallet/${search}`);
    }
  }
  return (
    <div className="mt-10 flex justify-center">
      <form className="w-1/3" onSubmit={handleSubmit}>
        <div className="relative">
          <input type="search" ref={inputRef} id="default-search" className="block w-full p-4 pl-3 text-black text-sm border border-sky-500 focus:border-sky-500 rounded-lg"
            placeholder="Enter wallet address" required />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-sky-500 rounded-lg text-sm px-4 py-2">Search</button>
        </div>
      </form>
    </div>
  )
}

export default SearchHome;