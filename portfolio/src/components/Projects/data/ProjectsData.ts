import { ProjectInfo } from "../types/ProjectInfo";

export const ProjectsData: ProjectInfo[] = [
  {
    Title: "BUDDI WebService",
    Description: "Redesigned the mission-critical URL Discovery Service into .NET Core, enabling seamless access to URLs for all applications and services in my company. Handling 60 million requests daily with a blazing-fast 1–2 ms response time, this service is the backbone of our ecosystem—if it goes down, everything else goes down.",
    AdditionalText1: "This service is based on a microservices architecture, with a RESTful API and a Azure Table Service. It’s hosted on Azure, with a CI/CD pipeline in Azure DevOps.",
    AdditionalText2: "This service supports SOAP and Rest Protocols",
    AdditionalText3: "Interesting thing to know about this service, During the first deployment of the URL Discovery Service, performance lagged behind our benchmarks. After deep investigation, I traced the issue to the SoapCore NuGet package—essential for SOAP support in .NET Core. I fixed the problem in its codebase, upgraded our version, and successfully deployed the service at peak efficiency. This not only resolved a critical bottleneck but also marked my first impactful contribution to open source.",
  },
  {
    Title: "Project 2",
    Description: "Description 2",
    AdditionalText1: "Additional Text 1",
    AdditionalText2: "Additional Text 2",
    AdditionalText3: "Additional Text 3",
  },
  {
    Title: "Project 3",
    Description: "Description 3",
    AdditionalText1: "Additional Text 1",
    AdditionalText2: "Additional Text 2",
    AdditionalText3: "Additional Text 3",
  },
  {
    Title: "Project 4",
    Description: "Description 4",
    AdditionalText1: "Additional Text 1",
    AdditionalText2: "Additional Text 2",
    AdditionalText3: "Additional Text 3",
  },
  {
    Title: "Project 5",
    Description: "Description 5",
    AdditionalText1: "Additional Text 1",
    AdditionalText2: "Additional Text 2",
    AdditionalText3: "Additional Text 3",
  },
  {
    Title: "Project 6",
    Description: "Description 6",
    AdditionalText1: "Additional Text 1",
    AdditionalText2: "Additional Text 2",
    AdditionalText3: "Additional Text 3",
  },
  {
    Title: "Project 7",
    Description: "Description 7",
    AdditionalText1: "Additional Text 1",
    AdditionalText2: "Additional Text 2",
    AdditionalText3: "Additional Text 3",
  },
];
