import { HttpResponse } from "msw";
// import { verifyTokenOrThrow } from "../session";
import type { ApiSchemas } from "../../schema";
import { http } from "../http";

// Пример мок-данных — можно заменить на импорт из JSON
const questionnaires: ApiSchemas["Questionnaire"][] = Array.from({ length: 30 }, (_, index) => {
  const createdAt = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString();
  const updatedAt = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 10).toISOString();

  return {
    id: crypto.randomUUID(),
    title: `Опрос №${index + 1}`,
    description: "Автоматически сгенерированный опрос",
    createdAt,
    updatedAt,
    completionsCount: Math.floor(Math.random() * 300),
    questions: [
      {
        id: crypto.randomUUID(),
        type: "text",
        text: "Ваш любимый язык программирования?",
      },
      {
        id: crypto.randomUUID(),
        type: "single-choice",
        text: "Какой фреймворк вы используете?",
        options: ["React", "Vue", "Angular"],
      },
    ],
  };
});

export const questionnairesHandlers = [
  // Получить список опросов
  http.get("/questionnaires", async ({ request }) => {
   // await verifyTokenOrThrow(request);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 10);
    const search = url.searchParams.get("search");
    const sort = url.searchParams.get("sort");

    let filtered = [...questionnaires];

    // Поиск
    if (search) {
      filtered = filtered.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Сортировка
    if (sort) {
      filtered.sort((a, b) => {
        if (sort === "title") {
          return a.title.localeCompare(b.title);
        } else {
          return (
            new Date(b[sort as keyof typeof b]!.toString()).getTime() -
            new Date(a[sort as keyof typeof a]!.toString()).getTime()
          );
        }
      });
    }

    // Пагинация
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const list = filtered.slice(startIndex, endIndex);

    return HttpResponse.json({ list, total, totalPages });
  }),

  // Получить опрос по ID
//   http.get("/questionnaires/:questionnaireId", async ({ params, request }) => {
//    // await verifyTokenOrThrow(request);
//     const { questionnaireId } = params;
//     const questionnaire = questionnaires.find((q) => q.id === questionnaireId);

//     if (!questionnaire) {
//       return HttpResponse.json(
//         { message: "Questionnaire not found", code: "NOT_FOUND" },
//         { status: 404 },
//       );
//     }

//     return HttpResponse.json(questionnaire);
//   }),

  // Создать новый опрос
  http.post("/questionnaires", async ({ request }) => {
  //  await verifyTokenOrThrow(request);

    const now = new Date().toISOString();
    const data = (await request.json()) as ApiSchemas["Questionnaire"];

    const newQuestionnaire: ApiSchemas["Questionnaire"] = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      completionsCount: 0,
    };

    questionnaires.push(newQuestionnaire);
    return HttpResponse.json(newQuestionnaire, { status: 201 });
  }),

  // Удалить опрос
//   http.delete("/questionnaires/:questionnaireId", async ({ params, request }) => {
//     //await verifyTokenOrThrow(request);
//     const { questionnaireId } = params;
//     const index = questionnaires.findIndex((q) => q.id === questionnaireId);

//     if (index === -1) {
//       return HttpResponse.json(
//         { message: "Questionnaire not found", code: "NOT_FOUND" },
//         { status: 404 },
//       );
//     }

//     questionnaires.splice(index, 1);
//     await delay(500);
//     return new HttpResponse(null, { status: 204 });
//   }),
 ];
