'use client';

import { useState } from "react";

export default function Home() {
    // create state variable to hold a counter
    const [counter, setCounter] = useState<number>(0);

    // event handler for button
    const handleClick = () => {
        setCounter(counter + 1);
    }

    const handleReset = () => {
        setCounter(0);
    }

  return (
      <main>
        <h1>React Blog</h1>
        <p>We&apos;re building this site using Next.js in COMP2112.</p>
        <section>
            <p>The button has been clicked {counter} times.</p>
            <button onClick={handleClick}>Click Me!</button>
            <button onClick={handleReset}>Reset</button>
        </section>
      </main>
   );
}
