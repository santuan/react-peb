import { Container, TopLeft } from "./styles";

export default function Overlay() {
  return (
    <Container>
      <TopLeft>
        <h1>
          PINTA EL
          <br />
          BARCO —
        </h1>
      </TopLeft>
      <div className="fixed bottom-0 left-0 right-0 z-10 w-full p-2 overflow-hidden scale-75 rounded-lg md:w-auto md:left-auto opacity-80">
        <iframe
          width="300"
          height="300"
          className="w-full h-56 m-0 aspect-video md:aspect-square" 
          src="https://www.youtube.com/embed/15QXm7w_j7M"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </Container>
  );
}
