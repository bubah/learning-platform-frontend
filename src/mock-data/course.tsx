// import { Course } from "../types/types";

// export const mockCourse: Course = {
//   id: "1",
//   description: "Learn the basics of Full Stack Development",
//   title: "Full Stack Developer",
//   lectures: [
//     {
//       id: "1",
//       title: "Introduction to React",
//       description: "Learn the basics of React",
//       sections: [
//         {
//           id: "1",
//           title: "Lesson 1",
//           description: "Introduction to JSX",
//         },
//         {
//           id: "2",
//           title: "Lesson 2",
//           description: "Components",
//         },
//         {
//           id: "3",
//           title: "Lesson 3",
//           description: "Props",
//         },
//         {
//           id: "4",
//           title: "Lesson 4",
//           description: "State",
//         },
//       ],
//     },
//     {
//       id: "2",
//       title: "Introduction to TypeScript",
//       description: "Learn the basics of TypeScript",
//       sections: [
//         {
//           id: "5",
//           title: "Lesson 1",
//           description: "Introduction to TypeScript",
//         },
//         {
//           id: "6",
//           title: "Lesson 2",
//           description: "Type Annotations",
//         },
//         {
//           id: "7",
//           title: "Lesson 3",
//           description: "Interfaces",
//         },
//         {
//           id: "8",
//           title: "Lesson 4",
//           description: "Classes",
//         },
//       ],
//     },
//     {
//       id: "3",
//       title: "Introduction to GraphQL",
//       description: "Learn the basics of GraphQL",
//       sections: [
//         {
//           id: "9",
//           title: "Lesson 1",
//           description: "Introduction to GraphQL",
//         },
//         {
//           id: "10",
//           title: "Lesson 2",
//           description: "Queries",
//         },
//         {
//           id: "11",
//           title: "Lesson 3",
//           description: "Mutations",
//         },
//         {
//           id: "12",
//           title: "Lesson 4",
//           description: "Subscriptions",
//         },
//       ],
//     },
//     {
//       id: "4",
//       title: "Introduction to Node.js",
//       description: "Learn the basics of Node.js",
//       sections: [
//         {
//           id: "13",
//           title: "Lesson 1",
//           description: "Introduction to Node.js",
//         },
//         {
//           id: "14",
//           title: "Lesson 2",
//           description: "Modules",
//         },
//         {
//           id: "15",
//           title: "Lesson 3",
//           description: "NPM",
//         },
//         {
//           id: "16",
//           title: "Lesson 4",
//           description: "Express",
//         },
//       ],
//     },
//     {
//       id: "5",
//       title: "Introduction to MongoDB",
//       description: "Learn the basics of MongoDB",
//       sections: [
//         {
//           id: "13",
//           title: "Lesson 1",
//           description: "Introduction to MongoDB",
//         },
//         {
//           id: "14",
//           title: "Lesson 2",
//           description: "CRUD Operations",
//         },
//         {
//           id: "15",
//           title: "Lesson 3",
//           description: "Indexes",
//         },
//         {
//           id: "16",
//           title: "Lesson 4",
//           description: "Aggregation",
//         },
//       ],
//     },
//     {
//       id: "6",
//       title: "Introduction to Docker",
//       description: "Learn the basics of Docker",
//       sections: [
//         {
//           id: "17",
//           title: "Lesson 1",
//           description: "Introduction to Docker",
//         },
//         {
//           id: "18",
//           title: "Lesson 2",
//           description: "Containers",
//         },
//         {
//           id: "19",
//           title: "Lesson 3",
//           description: "Images",
//         },
//         {
//           id: "20",
//           title: "Lesson 4",
//           description: "Docker Compose",
//         },
//       ],
//     },
//     {
//       id: "7",
//       title: "Introduction to Kubernetes",
//       description: "Learn the basics of Kubernetes",
//       sections: [
//         {
//           id: "21",
//           title: "Lesson 1",
//           description: "Introduction to Kubernetes",
//         },
//         {
//           id: "22",
//           title: "Lesson 2",
//           description: "Pods",
//         },
//         {
//           id: "23",
//           title: "Lesson 3",
//           description: "Deployments",
//         },
//         {
//           id: "24",
//           title: "Lesson 4",
//           description: "Services",
//         },
//       ],
//     },
//     {
//       id: "8",
//       title: "Introduction to AWS",
//       description: "Learn the basics of AWS",
//       sections: [
//         {
//           id: "25",
//           title: "Lesson 1",
//           description: "Introduction to AWS",
//         },
//         {
//           id: "26",
//           title: "Lesson 2",
//           description: "EC2",
//         },
//         {
//           id: "27",
//           title: "Lesson 3",
//           description: "S3", 
//         }
//       ]
//     },
//     {
//       id: "9",
//       title: "Introduction to CI/CD",
//       description: "Learn the basics of CI/CD",
//       sections: [
//         {
//           id: "28",
//           title: "Lesson 1",
//           description: "Introduction to CI/CD",
//         },
//         {
//           id: "29",
//           title: "Lesson 2",
//           description: "Jenkins",
//         },
//         {
//           id: "30",
//           title: "Lesson 3",
//           description: "GitHub Actions",
//         },
//         {
//           id: "31",
//           title: "Lesson 4",
//           description: "CircleCI",
//         },
//       ],
//     },
//     {
//       id: "10",
//       title: "Introduction to Testing",
//       description: "Learn the basics of Testing",
//       sections: [
//         {
//           id: "32",
//           title: "Lesson 1",
//           description: "Introduction to Testing",
//         },
//         {
//           id: "33",
//           title: "Lesson 2",
//           description: "Unit Testing",
//         },
//         {
//           id: "34",
//           title: "Lesson 3",
//           description: "Integration Testing",
//         },
//         {
//           id: "35",
//           title: "Lesson 4",
//           description: "End-to-End Testing",
//         },
//       ],
//     },
//     {
//       id: "11",
//       title: "Introduction to Security",
//       description: "Learn the basics of Security",
//       sections: [
//         {
//           id: "36",
//           title: "Lesson 1",
//           description: "Introduction to Security",
//         },
//         {
//           id: "37",
//           title: "Lesson 2",
//           description: "OWASP Top 10",
//         },
//         {
//           id: "38",
//           title: "Lesson 3",
//           description: "CORS",
//         },
//         {
//           id: "39",
//           title: "Lesson 4",
//           description: "JWT",
//         },
//       ],
//     },
//     {
//       id: "12",
//       title: "Introduction to Performance",
//       description: "Learn the basics of Performance",
//       sections: [
//         {
//           id: "40",
//           title: "Lesson 1",
//           description: "Introduction to Performance",
//         },
//         {
//           id: "41",
//           title: "Lesson 2",
//           description: "CDN",
//         },
//       ]
//     }
//   ],
// };
