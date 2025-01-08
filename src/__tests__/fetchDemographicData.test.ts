import { fetchDemographicData } from "@/api/fetchDemographicData";
import { DemographicsData } from "@/types";
import { describe, expect, it, jest } from "@jest/globals";
import axios from "axios";

jest.mock("axios");

describe("fetchDemographicData", () => {
    it("fetches demographic data for a zip code", async () => {
        const mockData: DemographicsData = {
            population: 20000,
        };
        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        const result = await fetchDemographicData("10001");
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(
            `https://api.census.gov/data/{endpoint}?zip=10001`
        );
    });
});
