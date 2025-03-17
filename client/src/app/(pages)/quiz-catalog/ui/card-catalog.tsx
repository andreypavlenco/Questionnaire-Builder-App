import { CardType } from "@/types/CardType";
import CardItem from "./card-catalog-item";

export default function CardCatalog({ card }: { card: CardType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {card.map((item) => (
        <div key={item.id}>
        <CardItem card={item}/>
        </div>
      ))}
    </div>
  );
}
