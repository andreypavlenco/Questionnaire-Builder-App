import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { CardType } from "@/types";
import QuizCardSelect from "./quiz-card-select";

export default function QuizCardItem({ card }: { card: CardType }) {
  return (
    <Card className="w-full max-w-[450px] mx-auto bg-[#2e3856]">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle className="text-xl font-medium">{card.title}</CardTitle>
          <CardDescription className="text-[14px] text-white">{card.description}</CardDescription>
        </div>
        <QuizCardSelect quizId={card.id} />
      </CardHeader>
      <CardContent>
        <p className="text-[14px] text-white cursor-pointer">Questions: {card.questionCount}</p>
      </CardContent>
    </Card>
  );
}
