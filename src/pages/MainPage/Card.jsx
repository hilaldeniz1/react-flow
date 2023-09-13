const Card = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <div>
        <div>
          <img src={post.author.image} />
          <div>
            <p>{post.author.name}</p>
            <p>3 gün önce</p>
          </div>
        </div>
        <div>{post.category}</div>
      </div>
    </div>
  );
};

export default Card;
