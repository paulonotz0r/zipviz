import { DemographicsData } from "@/types";
import { create } from "zustand";

interface DemographicsStore {
    demographics: Record<string, DemographicsData>;
    fetchStatus: Record<string, boolean>;
    setDemographics: (zip: string, data: DemographicsData) => void;
    isDataFetched: (zip: string) => boolean;
}

const useDemographicsStore = create<DemographicsStore>((set, get) => ({
    demographics: {},
    fetchStatus: {},

    setDemographics: (zip, data) => {
        set((state) => ({
            demographics: { ...state.demographics, [zip]: data },
            fetchStatus: { ...state.fetchStatus, [zip]: true },
        }));
    },

    // check if data for a zip code is already fetched
    isDataFetched: (zip) => !!get().fetchStatus[zip],
}));

export default useDemographicsStore;
