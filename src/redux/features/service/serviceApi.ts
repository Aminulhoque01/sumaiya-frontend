import { baseApi } from "../api/baseApi";

 
export interface Service {
  isActive: boolean;
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: {
    alt: string;
    url: string;
    publicId: string;
  };
  features?:string[];
  order?: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceResponse {
  success: boolean;
  message: string;
  data: Service[];
}

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => "/services",

      transformResponse: (
        response: ServiceResponse
      ) => response.data,

      providesTags: ["Service"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetServicesQuery,
} = serviceApi;
 
