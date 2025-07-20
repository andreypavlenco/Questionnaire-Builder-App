import 'react-router-dom';

export const ROUTES = {
  HOME: "/",
  QUESTIONNAIRES: "/questionnaires",
} as const;

export type PathParams = {
    [ROUTES.QUESTIONNAIRES]: {
        questionnaireId: string;
    }
}

declare module "react-router-dom" {
    interface Register {
      params: PathParams
    }
}