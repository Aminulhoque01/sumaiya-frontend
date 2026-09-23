import { baseApi } from "../api/baseApi";

 
export interface CloudinaryImage {
  url: string;
  publicId: string;
  alt?: string;
}

 

export interface ProjectCaseStudy {
  overview?: string;
  challenge?: string;
  solution?: string;
  process?: string;
  result?: string;
}

export interface Project {
  _id: string;

  title: string;
  slug?: string;

  shortDescription: string;
  description: string;

  category:
    | string
    | {
        _id: string;
        name: string;
        slug?: string;
      };

  tools?: string[];

  client?: string;
  projectDate?: string;

  featured?: boolean;
  isPublished?: boolean;
  order?: number;

  thumbnail?: CloudinaryImage;

  caseStudy?: ProjectCaseStudy;

  projectUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;

  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  createdAt?: string;
  updatedAt?: string;
}

interface ProjectResponse {
  success: boolean;
  message: string;
  data: Project[];
}

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",

      transformResponse: (
        response: ProjectResponse
      ) => response.data,

      providesTags: ["Project"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetProjectsQuery,
} = projectApi;