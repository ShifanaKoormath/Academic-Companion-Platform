export const SUBJECT_SYLLABUS: Record<
  string,
  {
    subjectName: string;
    modules: {
      module: string;
      topics: string[];
    }[];
  }
> = {
  /* ================= SEM 7 ================= */

  AI: {
    subjectName: "Artificial Intelligence",
    modules: [
      {
        module: "Module 1: Introduction",
        topics: [
          "Introduction to Artificial Intelligence",
          "Intelligent Agents",
          "Problem Solving and Search",
        ],
      },
      {
        module: "Module 2: Search Techniques",
        topics: [
          "Uninformed Search Strategies",
          "Informed Search Strategies",
          "Heuristic Functions",
        ],
      },
      {
        module: "Module 3: Knowledge Representation",
        topics: [
          "Propositional Logic",
          "First Order Logic",
          "Inference Mechanisms",
        ],
      },
      {
        module: "Module 4: Planning",
        topics: [
          "Classical Planning",
          "Planning Graphs",
          "STRIPS Representation",
        ],
      },
      {
        module: "Module 5: Learning",
        topics: [
          "Introduction to Machine Learning",
          "Supervised vs Unsupervised Learning",
        ],
      },
    ],
  },

  ML: {
    subjectName: "Machine Learning",
    modules: [
      {
        module: "Module 1: Foundations",
        topics: [
          "Introduction to Machine Learning",
          "Types of Learning",
          "Applications of ML",
        ],
      },
      {
        module: "Module 2: Regression",
        topics: [
          "Linear Regression",
          "Multiple Regression",
          "Gradient Descent",
        ],
      },
      {
        module: "Module 3: Classification",
        topics: [
          "Logistic Regression",
          "Decision Trees",
          "k-Nearest Neighbors",
        ],
      },
      {
        module: "Module 4: Clustering",
        topics: [
          "K-Means Clustering",
          "Hierarchical Clustering",
        ],
      },
      {
        module: "Module 5: Model Evaluation",
        topics: [
          "Bias-Variance Tradeoff",
          "Cross Validation",
          "Performance Metrics",
        ],
      },
    ],
  },

  SE: {
    subjectName: "Software Engineering",
    modules: [
      {
        module: "Module 1: Software Process",
        topics: [
          "Software Engineering Fundamentals",
          "Software Process Models",
        ],
      },
      {
        module: "Module 2: Requirements",
        topics: [
          "Requirement Analysis",
          "SRS Documentation",
        ],
      },
      {
        module: "Module 3: Design",
        topics: [
          "Software Design Principles",
          "UML Diagrams",
        ],
      },
      {
        module: "Module 4: Testing",
        topics: [
          "Software Testing Strategies",
          "Verification and Validation",
        ],
      },
      {
        module: "Module 5: Maintenance",
        topics: [
          "Software Maintenance",
          "Software Reengineering",
        ],
      },
    ],
  },

  /* ================= SEM 3 ================= */

  DS: {
    subjectName: "Data Structures",
    modules: [
      {
        module: "Module 1: Basics",
        topics: [
          "Data Structure Concepts",
          "Algorithm Analysis",
        ],
      },
      {
        module: "Module 2: Linear Structures",
        topics: [
          "Arrays",
          "Stacks",
          "Queues",
        ],
      },
      {
        module: "Module 3: Trees",
        topics: [
          "Binary Trees",
          "Binary Search Trees",
          "Tree Traversals",
        ],
      },
      {
        module: "Module 4: Graphs",
        topics: [
          "Graph Representation",
          "Graph Traversal Algorithms",
        ],
      },
      {
        module: "Module 5: Hashing",
        topics: [
          "Hash Tables",
          "Collision Resolution Techniques",
        ],
      },
    ],
  },

  OOP: {
    subjectName: "Object Oriented Programming",
    modules: [
      {
        module: "Module 1: OOP Basics",
        topics: [
          "OOP Concepts",
          "Classes and Objects",
        ],
      },
      {
        module: "Module 2: Inheritance",
        topics: [
          "Inheritance Types",
          "Method Overriding",
        ],
      },
      {
        module: "Module 3: Polymorphism",
        topics: [
          "Compile Time Polymorphism",
          "Runtime Polymorphism",
        ],
      },
      {
        module: "Module 4: Abstraction",
        topics: [
          "Abstract Classes",
          "Interfaces",
        ],
      },
      {
        module: "Module 5: Exception Handling",
        topics: [
          "Exception Handling Mechanism",
          "Custom Exceptions",
        ],
      },
    ],
  },

  CO: {
    subjectName: "Computer Organization",
    modules: [
      {
        module: "Module 1: Basics",
        topics: [
          "Computer Organization Overview",
          "Instruction Set Architecture",
        ],
      },
      {
        module: "Module 2: CPU Design",
        topics: [
          "CPU Organization",
          "Instruction Cycle",
        ],
      },
      {
        module: "Module 3: Pipelining",
        topics: [
          "Instruction Pipelining",
          "Pipeline Hazards",
        ],
      },
      {
        module: "Module 4: Memory",
        topics: [
          "Memory Hierarchy",
          "Cache Memory",
        ],
      },
      {
        module: "Module 5: I/O",
        topics: [
          "Input Output Organization",
          "Interrupts",
        ],
      },
    ],
  },

  /* ================= SEM 5 ================= */

  CN: {
    subjectName: "Computer Networks",
    modules: [
      {
        module: "Module 1: Network Basics",
        topics: [
          "Network Types",
          "OSI Model",
        ],
      },
      {
        module: "Module 2: TCP/IP",
        topics: [
          "TCP/IP Architecture",
          "IP Addressing",
        ],
      },
      {
        module: "Module 3: Transport Layer",
        topics: [
          "TCP",
          "UDP",
          "Congestion Control",
        ],
      },
      {
        module: "Module 4: Routing",
        topics: [
          "Routing Algorithms",
          "Distance Vector and Link State",
        ],
      },
      {
        module: "Module 5: Application Layer",
        topics: [
          "HTTP",
          "FTP",
          "DNS",
        ],
      },
    ],
  },

  OS: {
    subjectName: "Operating Systems",
    modules: [
      {
        module: "Module 1: OS Overview",
        topics: [
          "Operating System Concepts",
          "System Calls",
        ],
      },
      {
        module: "Module 2: Processes",
        topics: [
          "Process Management",
          "CPU Scheduling",
        ],
      },
      {
        module: "Module 3: Deadlocks",
        topics: [
          "Deadlock Conditions",
          "Deadlock Prevention and Avoidance",
        ],
      },
      {
        module: "Module 4: Memory Management",
        topics: [
          "Paging",
          "Virtual Memory",
        ],
      },
      {
        module: "Module 5: File Systems",
        topics: [
          "File System Structure",
          "Disk Scheduling",
        ],
      },
    ],
  },

  DBMS: {
    subjectName: "Database Management Systems",
    modules: [
      {
        module: "Module 1: Database Basics",
        topics: [
          "Database Concepts",
          "DBMS Architecture",
        ],
      },
      {
        module: "Module 2: Data Models",
        topics: [
          "ER Model",
          "Relational Model",
        ],
      },
      {
        module: "Module 3: SQL",
        topics: [
          "SQL Basics",
          "Joins and Subqueries",
        ],
      },
      {
        module: "Module 4: Normalization",
        topics: [
          "Functional Dependencies",
          "Normalization Techniques",
        ],
      },
      {
        module: "Module 5: Indexing",
        topics: [
          "Indexing Techniques",
          "Transaction Management",
        ],
      },
    ],
  },
};
