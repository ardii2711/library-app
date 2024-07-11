import { Card, CardContent } from './ui/card';

interface Props {
  title: string;
  cover_image: string;
  due_date: string;
  borrow_date: string;
}

const BorrowBookCard = (props: Props) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mt-4">
          <img src={props.cover_image} alt="Book Cover" width={300} height={450} className="w-full h-full object-cover" />
        </div>
        <div className="grid gap-1">
          <div className="text-base font-medium">{props.title}</div>
          <div className="text-sm text-muted-foreground">Borrowed: {props.borrow_date}</div>
          <div className="text-sm text-muted-foreground">Due: {props.due_date}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BorrowBookCard;
