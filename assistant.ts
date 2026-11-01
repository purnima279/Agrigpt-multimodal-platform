import { api } from "@/lib/axios";
import type {
  AssistantAskRequest,
  AssistantAskResponse,
  AssistantMessage,
} from "@/types/api";

export async function askAssistant(
  farmId: string,
  payload: AssistantAskRequest
): Promise<AssistantAskResponse> {
  const res = await api.post<AssistantAskResponse>(
    `/farms/${farmId}/assistant/ask`,
    payload
  );
  return res.data;
}

export async function getAssistantHistory(
  farmId: string
): Promise<AssistantMessage[]> {
  const res = await api.get<AssistantMessage[]>(
    `/farms/${farmId}/assistant/history`
  );
  return res.data;
}
