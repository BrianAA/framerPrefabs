import {
    clamp
} from "framer-motion";
import {
    useEffect,
    useMemo,
    useState
} from "react";
import {
    SearchResultTitleType
} from "https://framerusercontent.com/modules/tV9haTHllpHHc9Fjue2H/iZf5Ur6STrcvFnlp0XQ3/SearchModal.js";
import {
    getCachedIndex,
    setCachedIndex,
    isDefaultLocaleId
} from "https://framerusercontent.com/modules/uU1mtMKXsrVAg8N5hW7w/PCK1x1QLNluYNoEoapwx/cachedIndex.js";
import {
    fakeResults
} from "https://framerusercontent.com/modules/K9JZRwJcE6slDAf8rUmh/mJ54py1Ecnn1RoC4N1m4/fakeResults.js";
import {
    distance
} from "https://framerusercontent.com/modules/TwRgbWuhHeB95MPifel4/YW8Hlm59FG3PajbrVsaR/fuzzySearch.js";
import {
    createLogger,
    localStorageDebugFlag,
    safeDocument,
    safeWindow
} from "https://framerusercontent.com/modules/MWsEnYfRnoOQq31DN4ql/UyHGCSLuZlZBvIaCnOlc/utils.js";
const {
    log,
    time,
    timeEnd
} = createLogger(localStorageDebugFlag);

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_error) {
        return false;
    }
}

function splitWords(text) {
    try { // Regex lookbehind is used to ignore ampersands when splitting
        // words. For example "H&M" will not be split and is considered as
        // one word, but "H & M" will be split.
        // However, some browsers (like Safari iOS 15) don't support
        // lookbehind and will crash. When it's not supported, fallback to
        // a safer regex that always splits ampersands.
        return text.split(RegExp("[\\s.,;!?\\p{P}\\p{Z}]+(?<!\\p{L}&)(?!&\\p{L})", "u"));
    } catch {
        log("Falling back to regex without lookbehind");
        return text.split(RegExp("[\\s.,;!?\\p{P}\\p{Z}]+", "u"));
    }
}

function getUniqueWords(str) {
    const words = splitWords(str).filter(word => word.trim() && word.length > 0);
    return new Set(words);
}
/**
 * Replace accented characters with equivilant non-accented versions and
 * make everything lowercase.
 */
function getNormalizedString(text) {
    if (Array.isArray(text)) {
        return text.map(getNormalizedString);
    }
    return text.normalize("NFD") // From: https://stackoverflow.com/a/37511463
        .replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getNormalizedItem(item) {
    const normalizedItem = {};
    for (const [key, value] of Object.entries(item)) {
        if (typeof value === "string") {
            normalizedItem[key] = getNormalizedString(value);
            continue;
        }
        if (Array.isArray(value)) {
            normalizedItem[key] = getNormalizedString(value);
            continue;
        }
        normalizedItem[key] = value;
    }
    return normalizedItem;
}

function getMatchRange(currentRange, start, end) {
    const result = {
        ...currentRange
    };
    if (start < result.start) {
        result.start = start;
    }
    if (end > result.end) {
        result.end = end;
    }
    return result;
}
/**
 * Score index item based on the contents of it's fields such as title, description, headings etc.
 *
 * Note that this does not normalize the item or query. Normalization is expected to happen
 * before passing the data into this.
 */
function getScoreForSearchIndexItem(item, query, words, fullQuery) {
    let score = 0;
    const match = {
        title: {
            start: Infinity,
            end: 0
        },
        description: {
            start: Infinity,
            end: 0
        }
    };
    const urlWords = getUniqueWords(item.url); // Match query based on words in the URL so that random strings inside
    // other strings are not matched.
    if (urlWords.has(query)) {
        score += 10;
    } // Really boost single word queries that match single word URLs.
    if (words.size === 1 && urlWords.size === 1 && urlWords.values().next().value === query) {
        score += score * 5;
    } // Score shorter URLs higher so `/pricing` is before `/lala/pricing`.
    if (score > 0) {
        const splitLength = item.url.split("/").length;
        score += clamp(10 - splitLength, 0, splitLength);
    }
    const titleWords = getUniqueWords(item.title); // Prefer full word matches in the title.
    if (titleWords.has(query)) {
        score += 10;
    }
    const titleIndex = item.title.indexOf(query);
    if (titleIndex !== -1) {
        score += 10; // TODO: Matches are currently not used, but they can be used in the
        // future to add text highlighting.
        match.title = getMatchRange(match.title, titleIndex, titleIndex + query.length);
    } // If the full query is close to being the heading, score this highly as
    // the user is most likely looking for that exact title.
    if (distance(item.title, fullQuery) <= 2) {
        score += score * 10;
    } // Fuzzy match full words in the title.
    for (const titleWord of titleWords) {
        const distanceScore = distance(query, titleWord); // Small distance score helps with small typos.
        if (distanceScore <= 2) {
            score += 10;
        }
    }
    const headings = [...item.h1, ...item.h2, ...item.h3, ...item.h4, ...item.h5, ...item.h6];
    for (const heading of headings) {
        const headingWords = getUniqueWords(heading); // If the full query is close to being the heading, score this highly as
        // the user is most likely looking for that exact title.
        if (distance(heading, fullQuery) <= 2) {
            score += score * 10;
        } // Bias headings that start with the query as this helps when
        // you know the title you are searching for.
        if (heading.startsWith(query)) {
            score += 10;
        }
        if (headingWords.has(query)) {
            score += 10;
        }
        if (heading.includes(query)) {
            score += 1;
        } // Fuzzy match full words in headings.
        for (const headingWord of headingWords) {
            const distanceScore = distance(query, headingWord);
            if (distanceScore <= 2) {
                score += 1;
            }
        }
    }
    const descriptionIndex = item.description.indexOf(query);
    if (descriptionIndex !== -1) {
        score += 10;
        match.description = getMatchRange(match.description, descriptionIndex, descriptionIndex + query.length);
    }
    for (const p of item.p) {
        if (p.includes(query)) {
            score += .5;
        }
    }
    for (const codeblock of item.codeblock) { // If the full query is close to being the codeblock, score this highly as
        // the user is most likely looking for that exact code.
        if (distance(codeblock, fullQuery) <= 2) {
            score *= 10;
        }
        if (codeblock.includes(fullQuery)) {
            score += 10;
        }
        if (codeblock.includes(query)) {
            score += .5;
        }
    }
    return {
        score,
        match
    };
}

function getSearchIndexItemScore(item, query) {
    const normalizedItem = getNormalizedItem(item);
    const normalizedQuery = getNormalizedString(query);
    const queryWords = getUniqueWords(normalizedQuery);
    let total = 0;
    for (const queryWord of queryWords) {
        const {
            score
        } = getScoreForSearchIndexItem(normalizedItem, queryWord, queryWords, normalizedQuery);
        total += score;
    }
    return total;
}

function useRawSearch(index, query, settings) {
    const results = useMemo(() => {
        if (!query || !index) {
            return [];
        }
        const path = safeWindow === null || safeWindow === void 0 ? void 0 : safeWindow.location.pathname;
        time("query"); // Filter the results.
        const results = Object.values(index).map(item => {
            const score = getSearchIndexItemScore(item, query);
            const heading = item.h1.length && item.h1[0];
            const title = (settings === null || settings === void 0 ? void 0 : settings.titleType) === SearchResultTitleType.Title ? item.title : heading ? heading : item.title; // Convert index item to result item.
            const result = {
                url: item.url,
                title,
                description: item.description,
                body: [...item.p, item.codeblock].join(" "),
                score
            };
            return result;
        }).filter(item => item.score > settings.minimumScore || 0).filter(item => {
            if (!path) return true;
            return item.url !== path;
        }).sort((itemA, itemB) => itemB.score - itemA.score);
        timeEnd("query");
        return results;
    }, [index, query]);
    return results;
}

function getIndexedScopedToUrl(index, rawUrlScope) {
    const scopedIndex = {};
    const baseScopeUrlHasVariable = rawUrlScope.includes(":");
    const urlUpToPathVariable = rawUrlScope.split(":")[0];
    const urlScope = urlUpToPathVariable.length > 1 ? urlUpToPathVariable : "";
    for (const url in index) {
        if (!url.startsWith(urlScope)) {
            continue;
        }
        if (baseScopeUrlHasVariable && url.length <= urlScope.length) {
            continue;
        }
        scopedIndex[url] = index[url];
    }
    return scopedIndex;
}
export function useSearch(query, localeId, settings) {
    const [searchIndex, _setSearchIndex] = useState({});
    const [status, setStatus] = useState("loading");
    const results = useRawSearch(searchIndex, query, settings); // Seperate setter function so that the URL scope is always applied
    // to indexes loaded from either the cache or network.
    function setSearchIndex(index, options = {
        ignoreScope: false
    }) {
        let scopedIndex = index;
        if (settings.urlScope && !options.ignoreScope) {
            scopedIndex = getIndexedScopedToUrl(index, settings.urlScope);
            log("Using URL scope", settings.urlScope);
        }
        _setSearchIndex(scopedIndex);
    }
    useEffect(() => {
        async function loadSearchIndex() {
            setStatus("loading");
            const metaTag = safeDocument === null || safeDocument === void 0 ? void 0 : safeDocument.querySelector('meta[name="framer-search-index"]');
            if (!metaTag) {
                setStatus("no-meta-tag-found");
                setSearchIndex(fakeResults, {
                    ignoreScope: true
                });
                log("No meta tag found");
                return;
            }
            const cachedIndex = await getCachedIndex(localeId);
            const metaTagContent = metaTag.getAttribute("content");
            const isOverLimit = metaTagContent === "limit-reached";
            if (isOverLimit) {
                log("Page limit for plan exceeded");
            } // If a cached index exists, use the cached version until latest one
            // from the network loads.
            if (cachedIndex && !isOverLimit) {
                setSearchIndex(cachedIndex);
                setStatus("loading-with-cache");
                log("Using cached index");
            } // Return early and do not make a fetch request if the URL is not valid.
            if (!metaTagContent || !isValidUrl(metaTagContent)) {
                log("Meta tag exists but URL is not valid yet"); // If there is no cached index, show the pending index message.
                // Otherwise use the cache to as the index to search.
                if (!cachedIndex) {
                    setStatus("pending-index-generation");
                    log("No cache to use, page reload required to check for meta tag");
                } else {
                    log("Continue using cache");
                }
                return;
            }
            const searchIndexURL = getSearchIndexURL(metaTagContent, localeId);
            const response = await fetch(searchIndexURL);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const downloadedIndex = await response.json();
            setSearchIndex(downloadedIndex);
            setCachedIndex(localeId, downloadedIndex);
            setStatus("success");
            log("Using downloaded index");
        }
        loadSearchIndex().catch(error => { // TODO: Check for error type here. If it's a network error,
            // we could do a few retries.
            setStatus("error");
            log("Failed to load search index", error);
        });
    }, [localeId]);
    log({
        status,
        results
    });
    return {
        results,
        status
    };
}

function getSearchIndexURL(baseURL, localeId) {
    if (isDefaultLocaleId(localeId)) return baseURL;
    return baseURL.replace(".json", `-${localeId}.json`);
}
export const __FramerMetadata__ = {
    "exports": {
        "useSearch": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchIndex": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./useSearch.map