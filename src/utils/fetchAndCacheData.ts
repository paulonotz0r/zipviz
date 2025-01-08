import { fetchDemographicData } from "@/api/fetchDemographicData";
import useDemographicsStore from "@/store/useDemographicsStore";

export async function fetchAndCacheData(
    zip: string,
    retries = 3
): Promise<void> {
    const store = useDemographicsStore.getState();

    if (store.isDataFetched(zip)) return;

    try {
        const data = await fetchDemographicData(zip);
        store.setDemographics(zip, data);
    } catch (error) {
        if (retries > 0) {
            console.warn(
                `Retrying fetch for ${zip}, attempts left: ${retries}`
            );
            await fetchAndCacheData(zip, retries - 1);
        } else {
            console.error(`Failed to fetch data for ${zip}:`, error);
        }
    }
}
