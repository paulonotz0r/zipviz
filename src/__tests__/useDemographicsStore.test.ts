import useDemographicsStore from "@/store/useDemographicsStore";
import { describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useDemographicsStore", () => {
    it("should store and retrieve demographic data", () => {
        const { result } = renderHook(() => useDemographicsStore());

        // Add demographic data
        act(() => {
            result.current.setDemographics("10001", {
                population: 20000,
            });
        });

        // Verify demographic data
        expect(result.current.demographics["10001"]).toEqual({
            population: 20000,
        });
    });
});
