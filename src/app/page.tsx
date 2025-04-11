"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const { push } = useRouter();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    push("/htmlstat" + "?" + createQueryString("inputUrl", inputUrl));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 shadow-md bg-white rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Enter the Web Page URL:
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="url"
            placeholder="Type or Paste the URL here..."
            value={inputUrl}
            className="w-full p-2 border border-gray-300 rounded text-black"
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Get HTML Stat
          </button>
        </form>
      </div>
    </div>
  );
}
