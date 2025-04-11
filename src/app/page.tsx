"use client";

import { useState } from "react";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  return (
    <div>
      <div>
        <h1>Enter the Web Page URL:</h1>
      </div>
      <form>
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
