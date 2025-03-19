import { CardType } from "@/types";
import QuizCardItem from "./quiz-card-item";

export default function QuizCard({ card }: { card: CardType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {card.map((item) => (
        <div key={item.id}>
          <QuizCardItem card={item} />
        </div>
      ))}
    </div>
  );
}
