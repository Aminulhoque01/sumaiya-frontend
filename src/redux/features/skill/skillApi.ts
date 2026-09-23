import { baseApi } from "../api/baseApi";

export interface Skill {
  _id: string;
  name: string;
  slug?: string;
  category?: string;
  icon?: string;
  proficiency?: number;
  experience?: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface SkillResponse {
  success: boolean;
  message: string;
  data: Skill[];
}

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<Skill[], void>({
      query: () => "/skills",

      transformResponse: (
        response: SkillResponse
      ) => response.data,

      providesTags: ["Skill"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetSkillsQuery,
} = skillApi;