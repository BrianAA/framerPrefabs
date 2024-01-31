import {
    checkForCachedData,
    setCachedData
} from "https://framer.com/m/cache-YMiL.js@b9aplVZjN51x28yfNK16";
const VERSION = 1;
const defaultLocaleId = "default";
export function isDefaultLocaleId(localeId) {
    return !localeId || localeId === "default";
}
const INDEX_KEY = "searchIndexCache";

function getIndexKey(localeId) {
    if (isDefaultLocaleId(localeId)) return INDEX_KEY;
    return `${INDEX_KEY}-${localeId}`;
}
const METADATA_KEY = "searchCacheMetadata";

function getMetadataKey(localeId) {
    if (isDefaultLocaleId(localeId)) return METADATA_KEY;
    return `${METADATA_KEY}-${localeId}`;
}
export async function getCachedIndex(localeId) { // A check here for metadata can be added later if we need to
    // migrate or expire the index. Though most likely, any version change
    // should result in deleting the cache and starting again.
    const indexKey = getIndexKey(localeId);
    const cachedIndex = await checkForCachedData(indexKey);
    if (cachedIndex) {
        return cachedIndex;
    }
}
export function setCachedIndex(localeId, index) {
    const indexKey = getIndexKey(localeId);
    setCachedData(indexKey, index);
    const metadata = {
        version: VERSION,
        timestamp: Date.now()
    };
    const metadataKey = getMetadataKey(localeId);
    setCachedData(metadataKey, metadata);
}
export const __FramerMetadata__ = {
    "exports": {
        "getCachedIndex": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "setCachedIndex": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "isDefaultLocaleId": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./cachedIndex.map