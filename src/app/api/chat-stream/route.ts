import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

interface InfactoryColumnSchema {
  column_name: string;
  type_t: string;
  col_kind_t: string | null;
  col_t: string;
  aliases: string[];
  description: string;
}

interface InfactoryScalarItem {
  attribution: string | null;
  title: string | null;
  description: string | null;
  typeT: string;
  value: string | number;
}

interface InfactoryDataframeItem {
  attribution: string | null;
  title: string | null;
  description: string | null;
  data_schema: InfactoryColumnSchema[];
  rows: (string | number | null)[][];
}

interface InfactoryListItem {
  attribution: string | null;
  title: string | null;
  description: string | null;
  items: InfactoryItem[];
}

interface InfactoryNoneItem {
  attribution: string | null;
  title: string | null;
  description: string | null;
}

type InfactoryItemContent =
  | InfactoryScalarItem
  | InfactoryDataframeItem
  | InfactoryListItem
  | InfactoryNoneItem;

interface InfactoryItem {
  item: InfactoryItemContent;
  item_t: string;
}

interface InfactoryResponse {
  items: {
    MAIN: InfactoryItem;
    [key: string]: InfactoryItem;
  };
  request: null;
  timestamp: string;
}

interface EndpointConfig {
  pattern: RegExp;
  endpoint: string;
  params: Record<string, string | number | boolean>;
}

const ENDPOINT_MAP: EndpointConfig[] = [
  {
    pattern:
      /average tip percentage|tip comparison|compare tips|tip rates|how much tip/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_and_compare_average_tip_percentages",
    params: { nf_api_key: process.env.INFACTORY_API_KEY || "" },
  },
  {
    pattern:
      /total rides with toll|total toll amount|rides with tolls|how many rides have tolls|toll information/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_total_rides_and_toll_amount",
    params: { nf_api_key: process.env.INFACTORY_API_KEY || "" },
  },
  {
    pattern:
      /percentage of rides.*duration|rides over.*minutes|what percentage.*30 minutes|how many rides.*longer than|duration statistics/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_percentage_of_rides_over_duration",
    params: { nf_api_key: process.env.INFACTORY_API_KEY || "" },
  },
  {
    pattern:
      /average trip duration.*passengers|rides with.*passengers|how long.*multiple passengers|trip length.*people/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_average_trip_duration_for_rides_with_minimum_passengers",
    params: {
      passenger_count_op: "ge",
      nf_api_key: process.env.INFACTORY_API_KEY || "",
    },
  },
  {
    pattern:
      /average base fare.*short rides|rides less than.*mile|short distance fares|base fare.*short trips/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_average_base_fare_for_short_rides",
    params: {
      distance_op: "lt",
      nf_api_key: process.env.INFACTORY_API_KEY || "",
    },
  },
  {
    pattern:
      /compare trip duration.*payment|average duration.*(cash|credit)|payment method.*trip length|how does payment affect duration/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_and_compare_average_trip_duration_for_payment_types",
    params: {
      payment_type_col: "nf:col/nyc_taxi_rides_1/payment_type",
      trip_duration_col: "nf:col/nyc_taxi_rides_1/trip_duration",
      cash_payment: "cash",
      credit_payment: "credit",
      nf_api_key: process.env.INFACTORY_API_KEY || "",
    },
  },
  {
    pattern:
      /total revenue.*credit|credit payment revenue|how much.*credit cards|earnings from credit/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_total_revenue_from_credit_payments",
    params: {
      payment_type: "credit",
      nf_api_key: process.env.INFACTORY_API_KEY || "",
    },
  },
  {
    pattern:
      /average tip.*long rides|rides over.*miles|tips for long distances|how much tip.*long trip/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_average_tip_for_long_rides",
    params: { nf_api_key: process.env.INFACTORY_API_KEY || "" },
  },
  {
    pattern:
      /rides with zero passengers|empty taxis|no passenger rides|zero passenger count/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_rides_with_zero_passenger_count",
    params: {
      passenger_count_col: "nf:col/nyc_taxi_rides_1/passenger_count",
      passenger_count_op: "eq",
      distance_col: "nf:col/nyc_taxi_rides_1/trip_distance_in_miles",
      nf_api_key: process.env.INFACTORY_API_KEY || "",
    },
  },
  {
    pattern:
      /average fare.*duration range|rides between.*minutes|trip duration 5 to 10 minutes/i,
    endpoint:
      "https://api.infactory.ai/live/average_tip_percentage_comparison/v1/calculate_average_total_fare_for_rides_with_trip_duration_between_specified_range",
    params: {
      duration_op: "is_between",
      nf_api_key: process.env.INFACTORY_API_KEY || "",
    },
  },
];
interface ChatRequest {
  messages: { content: string }[];
  sessionId: string;
}

function isScalarItem(item: InfactoryItemContent): item is InfactoryScalarItem {
  return (
    (item as InfactoryScalarItem).typeT !== undefined &&
    (item as InfactoryScalarItem).value !== undefined
  );
}

function isDataframeItem(
  item: InfactoryItemContent
): item is InfactoryDataframeItem {
  return (
    (item as InfactoryDataframeItem).rows !== undefined &&
    (item as InfactoryDataframeItem).data_schema !== undefined
  );
}

function isListItem(item: InfactoryItemContent): item is InfactoryListItem {
  return (item as InfactoryListItem).items !== undefined;
}

export async function POST(req: NextRequest) {
  const { messages, sessionId }: ChatRequest = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  const matchedEndpoint = ENDPOINT_MAP.find((item) =>
    item.pattern.test(lastMessage)
  );
  console.log("isMatch", matchedEndpoint);
  if (matchedEndpoint) {
    try {
      const url = new URL(matchedEndpoint.endpoint);
      Object.entries(matchedEndpoint.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Infactory API error: ${response.statusText}`);
      }

      const data: InfactoryResponse = await response.json();
      const formattedResponse = formatInfactoryResponse(data);

      return handleRagChat(
        `Please repeat the following text exactly as it is without adding anything extra:\n
        ${formattedResponse}`,
        sessionId
      );
    } catch (error) {
      console.error("Error calling Infactory API:", error);
      return handleRagChat(lastMessage, sessionId);
    }
  }

  return handleRagChat(lastMessage, sessionId);
}

async function handleRagChat(message: string, sessionId: string) {
  const response = await ragChat.chat(message, {
    streaming: true,
    sessionId,
  });
  console.log("response=> ", response);
  return aiUseChatAdapter(response);
}

function formatInfactoryResponse(data: InfactoryResponse): string {
  const mainItem = data.items.MAIN.item;

  if (isDataframeItem(mainItem)) {
    const description = mainItem.description || "Taxi data results:";
    const rows = mainItem.rows
      .map((row) => row.map((val) => (val === null ? "N/A" : val)).join(" - "))
      .join("\n");
    return `${description}\n${rows}`;
  }

  if (isScalarItem(mainItem)) {
    return `${mainItem.description || "Result"}: ${mainItem.value}`;
  }

  if (isListItem(mainItem)) {
    return mainItem.items
      .map((item) => {
        const desc = item.item.description || "Item";
        const value = isScalarItem(item.item) ? item.item.value : "N/A";
        return `${desc}: ${value}`;
      })
      .join("\n");
  }

  return "Here's the taxi data I found: " + JSON.stringify(mainItem, null, 2);
}
