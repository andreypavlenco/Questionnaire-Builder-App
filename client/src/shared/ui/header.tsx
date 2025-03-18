import Link from "next/link";

export default function Header() {
  return (
    <div className="text-2xl w-full h-15 bg-[#5780f159] flex gap-8 p-2">
      <Link className="self-center" href="/quiz-catalog">
        Quiz Catalog
      </Link>
      <Link className="self-center" href="/create-quiz">
        Create Quiz
      </Link>
    </div>
  );
}
