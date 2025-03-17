import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { CardType } from "@/types/CardType";
import CardSelect from "./card-catalog-select";

export default function CardItem ({ card }: { card: CardType }) {
  return (
        <Card className="w-full max-w-[450px] mx-auto bg-[#2e3856]">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-medium">{card.name}</CardTitle>
              <CardDescription className="text-[14px] text-white">{card.description}</CardDescription>
            </div>
           <CardSelect/>
          </CardHeader>
          <CardContent>
            <p className="text-[14px] text-white cursor-pointer">Questions: {card.questionsCount}</p>
          </CardContent>
        </Card>
  );
}
