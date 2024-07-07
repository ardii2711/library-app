interface Props {
  title: string;
  cover_image: string;
  author: string;
}

const BookCard = (props: Props) => {
  return (
    <a href="#" className="flex flex-col items-center">
      <img src={props.cover_image} alt="Book Cover" className="w-36 h-56 rounded-lg mb-2" />
      <h3 className="text-lg font-medium text-center">{props.title}</h3>
      <p className="text-muted-foreground">{props.author}</p>
    </a>
  );
};

export default BookCard;
