"use client";

import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const { push } = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <h1>Enter the Web Page URL:</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Type or Paste the URL here..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button type="submit">Get HTML Stat</button>
      </form>
    </div>
  );
}
