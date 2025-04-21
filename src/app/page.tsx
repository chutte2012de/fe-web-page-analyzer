"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const { push } = useRouter();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputUrl.trim() !== "") {
      setProcessing(true);
      setShowSuggestion(false);
      push("/htmlstat" + "?" + createQueryString("inputUrl", inputUrl));
    } else {
      setShowSuggestion(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-4 shadow-md bg-white rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Enter the Web Page URL:
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="url"
            disabled={processing}
            placeholder="Type or Paste the URL here..."
            value={inputUrl}
            className="w-full p-2 border border-gray-300 rounded text-black"
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button
            disabled={processing}
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Get HTML Stat
          </button>
        </form>
      </div>
      <br></br>
      <br></br>
      {processing ? (
        <div className="rounded-xl bg-red-200 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-sans text-lg">
          PROCESSSING... wait please
        </div>
      ) : showSuggestion ? (
        <div className="rounded-xl bg-red-200 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-sans text-lg">
          PLEASE... enter valid url and click
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
