import { baseApi } from "../api/baseApi";

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  rating?: number;
  avatar?: {
    url: string;
    publicId: string;
  };
  isPublished?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface TestimonialResponse {
  success: boolean;
  message: string;
  data: Testimonial[];
}

export const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query<
      Testimonial[],
      void
    >({
      query: () => "/testimonials",

      transformResponse: (
        response: TestimonialResponse
      ) => response.data,

      providesTags: ["Testimonial"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetTestimonialsQuery,
} = testimonialApi;