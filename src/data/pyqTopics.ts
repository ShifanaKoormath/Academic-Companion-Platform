export const PYQ_TOPICS: Record<
  string,
  { topic: string; frequency: number }[]
> = {
  /* -------- Semester 7 -------- */
  AI: [
    { topic: "Search Algorithms", frequency: 4 },
    { topic: "Knowledge Representation", frequency: 3 },
    { topic: "Heuristic Functions", frequency: 2 },
  ],

  ML: [
    { topic: "Regression Models", frequency: 4 },
    { topic: "Classification Algorithms", frequency: 3 },
    { topic: "Overfitting", frequency: 2 },
  ],

  SE: [
    { topic: "SDLC Models", frequency: 4 },
    { topic: "Testing Strategies", frequency: 3 },
    { topic: "Software Metrics", frequency: 2 },
  ],

  /* -------- Semester 3 -------- */
  DS: [
    { topic: "Stacks & Queues", frequency: 4 },
    { topic: "Trees", frequency: 3 },
    { topic: "Graphs", frequency: 2 },
  ],

  OOP: [
    { topic: "Inheritance", frequency: 4 },
    { topic: "Polymorphism", frequency: 3 },
    { topic: "Encapsulation", frequency: 2 },
  ],

  CO: [
    { topic: "CPU Scheduling", frequency: 4 },
    { topic: "Memory Hierarchy", frequency: 3 },
    { topic: "Pipelining", frequency: 2 },
  ],

  /* -------- Semester 5 -------- */
  CN: [
    { topic: "OSI Model", frequency: 4 },
    { topic: "TCP Congestion Control", frequency: 3 },
    { topic: "Routing Algorithms", frequency: 2 },
  ],

  OS: [
    { topic: "Deadlocks", frequency: 4 },
    { topic: "Paging", frequency: 3 },
    { topic: "Process Scheduling", frequency: 2 },
  ],

  DBMS: [
    { topic: "Normalization", frequency: 4 },
    { topic: "Indexing", frequency: 3 },
    { topic: "Transactions", frequency: 2 },
  ],
};
