import { DemographicsData } from "@/types";
import axios from "axios";

export async function fetchDemographicData(
    zip: string
): Promise<DemographicsData> {
    const response = await axios.get(
        `https://api.census.gov/data/{endpoint}?zip=${zip}`
    );
    return response.data;
}
