import { FaBookOpen } from "react-icons/fa";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface Props {
  title: string;
  cover_image: string;
  due_date: string;
}

const BorrowBookCard = (props: Props) => {
  return (
    <Card className="bg-muted rounded-lg overflow-hidden">
      <CardContent className="grid gap-2 pt-6 justify-center">
        <img src={props.cover_image} width={200} height={300} alt="Book Cover" className="aspect-[2/3] object-cover" />
        <div className="font-semibold text-center">{props.title}</div>
      </CardContent>
      <CardFooter className="bg-background/50 px-4 py-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Due: {props.due_date}</div>
        <Button variant="ghost" size="sm">
          <FaBookOpen className="w-4 h-4 mr-2" />
          Return
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BorrowBookCard;
