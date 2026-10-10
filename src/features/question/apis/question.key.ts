export const QUESTION_KEY = {
    all: ["questions"] as const,
    detail: (id: string) => [...QUESTION_KEY.all, id] as const,
}