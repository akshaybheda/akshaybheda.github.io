import { ProjectInfo } from "../types/ProjectInfo";

export const ProjectsData: ProjectInfo[] = [
  {
    Title: "Migrating From Qlik to PowerBI Embed (Saved $1 Million+)",
    Description: "Led a migration from Qlik Sense to Power BI Embedded, saving the company over $1 Million in licensing and operational costs while ensuring a smooth transition.",
    AdditionalText1: "I was responsible for migrating the existing Qlik Sense reports to Power BI Embedded. This involved understanding the existing reports, designing new reports in Power BI, and ensuring that the new reports met the same requirements as the old ones.",
    AdditionalText2: "The migration process included thorough testing and validation to ensure data integrity and report accuracy. The project was completed in a 1-month time span, migrating 12 reports with a total data volume of around 10 GB.",
    AdditionalText3: "It involved setting up Row-Level Security (RLS) for those reports and ensuring improved performance compared to the previous Qlik Sense reports. The migration was completed successfully, with minimal disruption to users. The new Power BI reports provided enhanced functionality and improved performance.",
  },
  {
    Title: "BUDDI WebService",
    Description: "Redesigned the mission-critical URL Discovery Service into .NET Core, enabling seamless access to URLs for all applications and services in my company. Handling 60 million requests daily with a blazing-fast 1–2 ms response time, this service is the backbone of our ecosystem—if it goes down, all applications and services go down.",
    AdditionalText1: "This service is based on a microservices architecture, with a RESTful API and a Azure Table Service. It’s hosted on Azure, with a CI/CD pipeline in Azure DevOps.",
    AdditionalText2: "This service supports SOAP and Rest Protocols",
    AdditionalText3: "Interesting thing to know about this service, During the first deployment of the URL Discovery Service, performance lagged behind our benchmarks. After deep investigation, I traced the issue to the SoapCore NuGet package—essential for SOAP support in .NET Core. I fixed the problem in its codebase, upgraded our version, and successfully deployed the service at peak efficiency. This not only resolved a critical bottleneck but also marked my first impactful contribution to open source.",
  },
  {
    Title: "Bentley Admin Portal",
    Description: "Leading the development of a new, unified admin portal to streamline user management, reporting, and license assignments. Architected the system with future scalability in mind, ensuring a seamless transition to microservices when needed. Implemented Onion Architecture in C# for a clean, maintainable backend and adopted the Bulletproof React structure with TypeScript for a robust, scalable frontend—prioritizing performance, security, and long-term adaptability.",
    AdditionalText1: "To ensure a future-proof architecture, I conducted extensive research on clean code principles, micro-frontend, and microservices.",
    AdditionalText2: "While exploring new technologies is valuable, practicality is key—we must balance innovation with development efficiency. It's crucial to weigh the benefits of emerging frameworks against the time required for implementation and maintenance. My approach ensures we adopt the right mix of proven solutions and modern advancements, optimizing both long-term scalability and immediate productivity.",
    AdditionalText3: "",
  },
  {
    Title: "Licensing Service",
    Description: "Took on the challenge of modernizing a 10-year-old SOAP service—critical for company billing—without prior knowledge of its implementation. The service was running on a costly, soon-to-be-retired classic cloud service, so I single-handedly migrated it to an Azure Web App. Successfully deployed and switched the DNS, ensuring seamless continuity while reducing costs and securing long-term stability.",
    AdditionalText1: "It saved the company at-least 15k USD per year",
    AdditionalText2: "Now the service was running on a modern platform, I refactored the codebase to improve performance and maintainability. I also implemented a CI/CD pipeline in Azure DevOps, enabling automated testing and deployment for future updates.",
    AdditionalText3: "",
  },
];
