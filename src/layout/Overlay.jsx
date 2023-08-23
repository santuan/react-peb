import { Container, TopLeft } from "./styles";

import { useState } from "react";

export default function Overlay() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <Container>
      <TopLeft>
        <h1>
          PINTA EL
          <br />
          BARCO —
        </h1>
      </TopLeft>
      <div
        className={`fixed inset-0  bg-black/80 backdrop-blur-md duration-1000 overflow-hidden flex justify-center items-center rounded-lg ${
          isOpen ? "opacity-100 z-[200]" : "opacity-0 z-0"
        }`}
      >
        <button
          type="button"
          onClick={closeModal}
          className="fixed inset-0 z-0"
        />

        <iframe
          width="600"
          height="600"
          className="relative z-30 w-80 h-80 md:w-auto md:h-full aspect-square"
          src="https://www.youtube.com/embed/15QXm7w_j7M"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <button
          type="button"
          onClick={closeModal}
          className="fixed top-0 right-0 z-50 m-3 outline-none "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="#888888"
              d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
            />
          </svg>
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center">
        <button type="button" onClick={openModal} className="mb-3 duration-300 hover:opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            className="w-12 h-12 "
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 14.67V9.33c0-.79.88-1.27 1.54-.84l4.15 2.67a1 1 0 0 1 0 1.68l-4.15 2.67c-.66.43-1.54-.05-1.54-.84z"
            />
          </svg>
        </button>
      </div>
    </Container>
  );
}
