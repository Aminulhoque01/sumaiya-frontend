import { baseApi } from "../api/baseApi";

 

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIChatRequest {
  message: string;
}

export interface AIChatResponse {
  success: boolean;
  message?: string;
  data?: {
    message?: string;
    reply?: string;
    answer?: string;
  };
  reply?: string;
  answer?: string;
}

export interface AIConfig {
  enabled: boolean;
  mode?: string;
  provider?: string;
}

export interface AIConfigResponse {
  success: boolean;
  message?: string;
  data?: AIConfig;
}

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendAIMessage: builder.mutation<
      AIChatResponse,
      AIChatRequest
    >({
      query: (body) => ({
        url: "/ai-chat",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AI"],
    }),

    getAIConfig: builder.query<
      AIConfig,
      void
    >({
      query: () => "/ai-chat/config",
      transformResponse: (
        response: AIConfigResponse
      ) => {
        return (
          response.data || {
            enabled: true,
          }
        );
      },
      providesTags: ["AI"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSendAIMessageMutation,
  useGetAIConfigQuery,
} = aiApi;