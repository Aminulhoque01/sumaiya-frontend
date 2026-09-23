import { baseApi } from "../api/baseApi";

export interface CloudinaryImage {
  url: string;
  publicId: string;
}

export interface Profile {
  _id: string;
  name: string;
  title?: string;
  shortBio?: string;
  bio?: string;

  profileImage?: CloudinaryImage;
  coverImage?: CloudinaryImage;

  email?: string;
  phone?: string;
  location?: string;
  website?: string;

  availability?: string;
  yearsOfExperience?: number;
  resumeUrl?: string;

  socialLinks?: Record<string, string>;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: Profile | null;
}

export const profileApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getProfile: builder.query<
        Profile | null,
        void
      >({
        query: () => "/profile",

        transformResponse: (
          response: ProfileResponse
        ) => response.data,

        providesTags: ["Profile"],
      }),
    }),

    overrideExisting: false,
  });

export const {
  useGetProfileQuery,
} = profileApi;