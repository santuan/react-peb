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
      <div className="fixed bottom-0 right-0 z-10 p-2 overflow-hidden rounded-lg">
        <iframe
          width="200"
          height="200"
          className="m-0 aspect-square"
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
