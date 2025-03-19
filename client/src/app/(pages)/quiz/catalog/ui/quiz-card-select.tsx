import { MoreVertical } from "lucide-react";
import { useDeleteQuizMutation } from "@/app/api/quizApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuizCardSelect({ quizId }: { quizId: string }) {
  const deleteQuizMutation = useDeleteQuizMutation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    deleteQuizMutation.mutate(quizId);
    setIsOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bg-gray-800 text-white shadow-lg rounded-md w-40 z-10">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => handleNavigate(`/quiz/${quizId}`)}
          >
            View Quiz
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => handleNavigate(`/quiz/${quizId}/edit`)}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700 hover:text-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
