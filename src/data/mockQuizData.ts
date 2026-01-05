export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
};

export type QuizData = {
  [subjectCode: string]: {
    [moduleName: string]: {
      [topicName: string]: QuizQuestion[];
    };
  };
};

export const QUIZ_DATA: QuizData = {
  CS101: {
    "Module 1": {
      "Introduction to Computing": [
        {
          question: "What does CPU stand for?",
          options: [
            "Central Processing Unit",
            "Computer Primary Unit",
            "Central Program Utility",
            "Control Processing Unit",
          ],
          answer: 0,
        },
      ],
    },
  },
};
