"use strict";

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return "You liked this!";
  }

  return (
    <button className="btn btn-primary" onClick={() => setLiked(true)}>
      Like
    </button>
  );
}

const rootNode = document.getElementById("like-button-root");
const root = ReactDOM.createRoot(rootNode);
root.render(<LikeButton />);
