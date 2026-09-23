import { baseApi } from "../api/baseApi";

export interface ExperienceItem {
  _id: string;
  company: string;
  position: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ExperienceResponse {
  success: boolean;
  message: string;
  data: ExperienceItem[];
}

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query<
      ExperienceItem[],
      void
    >({
      query: () => "/experiences",

      transformResponse: (
        response: ExperienceResponse
      ) => response.data,

      providesTags: ["Experience"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetExperiencesQuery,
} = experienceApi;