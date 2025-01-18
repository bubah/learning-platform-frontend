export type Course = {
    title: string;
    lectures: Lecture[];
}

export type Lecture = {
    title: string;
    description: string;
    sections: Section[];
}

export type Section = {
    id?: string;
    lectureId?: string;
    title: string;
    description: string;
    content?: {
      path?: string;
      type?: string;
    }
}

export const mockCourse: Course = {
  title: "Full Stack Developer",
  lectures: [
    {
      title: "Introduction to React",
      description: "Learn the basics of React",
      sections: [
        {
          title: "Lesson 1",
          description: "Introduction to JSX",
        },
        {
          title: "Lesson 2",
          description: "Components",
        },
        {
          title: "Lesson 3",
          description: "Props",
        },
        {
          title: "Lesson 4",
          description: "State",
        },
      ],
    },
    {
      title: "Introduction to TypeScript",
      description: "Learn the basics of TypeScript",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to TypeScript",
        },
        {
          title: "Lesson 2",
          description: "Type Annotations",
        },
        {
          title: "Lesson 3",
          description: "Interfaces",
        },
        {
          title: "Lesson 4",
          description: "Classes",
        },
      ],
    },
    {
      title: "Introduction to GraphQL",
      description: "Learn the basics of GraphQL",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to GraphQL",
        },
        {
          title: "Lesson 2",
          description: "Queries",
        },
        {
          title: "Lesson 3",
          description: "Mutations",
        },
        {
          title: "Lesson 4",
          description: "Subscriptions",
        },
      ],
    },
    {
      title: "Introduction to Node.js",
      description: "Learn the basics of Node.js",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to Node.js",
        },
        {
          title: "Lesson 2",
          description: "Modules",
        },
        {
          title: "Lesson 3",
          description: "NPM",
        },
        {
          title: "Lesson 4",
          description: "Express",
        },
      ],
    },
    {
      title: "Introduction to MongoDB",
      description: "Learn the basics of MongoDB",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to MongoDB",
        },
        {
          title: "Lesson 2",
          description: "CRUD Operations",
        },
        {
          title: "Lesson 3",
          description: "Indexes",
        },
        {
          title: "Lesson 4",
          description: "Aggregation",
        },
      ],
    },
    {
      title: "Introduction to Docker",
      description: "Learn the basics of Docker",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to Docker",
        },
        {
          title: "Lesson 2",
          description: "Containers",
        },
        {
          title: "Lesson 3",
          description: "Images",
        },
        {
          title: "Lesson 4",
          description: "Docker Compose",
        },
      ],
    },
    {
      title: "Introduction to Kubernetes",
      description: "Learn the basics of Kubernetes",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to Kubernetes",
        },
        {
          title: "Lesson 2",
          description: "Pods",
        },
        {
          title: "Lesson 3",
          description: "Deployments",
        },
        {
          title: "Lesson 4",
          description: "Services",
        },
      ],
    },
    {
      title: "Introduction to AWS",
      description: "Learn the basics of AWS",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to AWS",
        },
        {
          title: "Lesson 2",
          description: "EC2",
        },
        {
          title: "Lesson 3",
          description: "S3",
        },
      ],
    },
    {
      title: "Introduction to GCP",
      description: "Learn the basics of GCP",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to GCP",
        },
        {
          title: "Lesson 2",
          description: "Compute Engine",
        },
        {
          title: "Lesson 3",
          description: "Cloud Storage",
        },
      ],
    },
    {
      title: "Introduction to Azure",
      description: "Learn the basics of Azure",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to Azure",
        },
        {
          title: "Lesson 2",
          description: "Virtual Machines",
        },
        {
          title: "Lesson 3",
          description: "Blob Storage",
        },
      ],
    },
    {
      title: "Introduction to CI/CD",
      description: "Learn the basics of CI/CD",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to CI/CD",
        },
        {
          title: "Lesson 2",
          description: "Jenkins",
        },
        {
          title: "Lesson 3",
          description: "GitHub Actions",
        },
      ],
    },
    {
      title: "Introduction to Testing",
      description: "Learn the basics of Testing",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to Testing",
        },
        {
          title: "Lesson 2",
          description: "Unit Testing",
        },
        {
          title: "Lesson 3",
          description: "Integration Testing",
        },
      ],
    },
    {
      title: "Introduction to Security",
      description: "Learn the basics of Security",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to Security",
        },
        {
          title: "Lesson 2",
          description: "OWASP Top 10",
        },
        {
          title: "Lesson 3",
          description: "CORS",
        },
      ],
    },
    {
      title: "Introduction to Microservices",
      description: "Learn the basics of Microservices",
      lessons: [
        {
          title: "Lesson 1",
          description: "Introduction to Microservices",
        },
        {
          title: "Lesson 2",
          description: "Service Discovery",
        },
      ],
    },
  ],
};
