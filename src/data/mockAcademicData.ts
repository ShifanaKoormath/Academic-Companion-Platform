import { STUDENTS } from "./students";

export const getStudentById = (id: string) =>
  STUDENTS.find((s) => s.id === id)!;
