import CardCatalog from "./ui/card-catalog";

export const quizMap = [
  {
    id: 1,
    name: "Frontend Basics",
    description: "Quiz on basic HTML, CSS, and JavaScript concepts.",
    questionsCount: 15,
    completions: 120,
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Questions on Node.js, NestJS, and databases.",
    questionsCount: 20,
    completions: 85,
  },
  {
    id: 3,
    name: "Software Architecture",
    description: "Understanding of microservices and design patterns.",
    questionsCount: 25,
    completions: 60,
  },
  {
    id: 3,
    name: "Software Architecture",
    description: "Understanding of microservices and design patterns.",
    questionsCount: 25,
    completions: 60,
  },
  {
    id: 3,
    name: "Software Architecture",
    description: "Understanding of microservices and design patterns.",
    questionsCount: 25,
    completions: 60,
  },
  {
    id: 3,
    name: "Software Architecture",
    description: "Understanding of microservices and design patterns.",
    questionsCount: 25,
    completions: 60,
  },
];

export default function QuizCatalog() {
  return (
    <div className="m-3">
    <h1 className="text-3xl mb-6">Quiz Catalog</h1>
    <CardCatalog card={quizMap}/> 
  </div>
  );
}
