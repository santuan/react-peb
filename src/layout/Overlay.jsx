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
        <iframe
          className="fixed bottom-0 right-0 z-20 m-2 overflow-hidden bg-red-600 rounded-lg"
          width="250"
          height="250"
          src="https://www.youtube.com/embed/15QXm7w_j7M"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </TopLeft>
    </Container>
  );
}
