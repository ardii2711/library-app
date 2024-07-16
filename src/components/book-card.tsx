import { Link } from "react-router-dom";

import { IBook } from "@/utils/types/books";

interface Props {
  data: IBook;
  navigate: string;
  "data-testid"?: string;
}

const BookCard = (props: Props) => {
  const { data, navigate } = props;

  return (
    <Link to={navigate} data-testid={props["data-testid"]} className="flex flex-col items-center">
      <img src={data.cover_image} alt="Book Cover" className="w-36 h-56 rounded-lg mb-2" />
      <h3 className="text-lg font-medium text-center">{data.title}</h3>
      <p className="text-muted-foreground">{data.author}</p>
    </Link>
  );
};

export default BookCard;
