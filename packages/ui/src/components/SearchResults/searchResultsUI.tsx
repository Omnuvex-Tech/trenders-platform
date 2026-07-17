import styles from "../../styles/SearchResults/searchResults.module.css";

export interface SearchResultItem {
    title: string;
    titleHtml: string;
    url: string;
    breadcrumb: string;
    excerptHtml: string;
}

export interface SearchResultsUIProps {
    query: string;
    total: number;
    results: SearchResultItem[];
    foundLabel?: string;
    noResultsLabel?: string;
}

export function SearchResultsUI({
    query,
    total,
    results,
    foundLabel = "Found",
    noResultsLabel = "Nəticə tapılmadı",
}: SearchResultsUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <p className={styles.foundCount}>{foundLabel}: {total}</p>

                {results.length === 0 ? (
                    <p className={styles.noResults}>{noResultsLabel}</p>
                ) : (
                    <div className={styles.list}>
                        {results.map((item, i) => (
                            <a key={i} href={item.url} className={styles.resultItem}>
                                <span
                                    className={styles.resultBreadcrumb}
                                >
                                    {item.breadcrumb}
                                </span>
                                <span
                                    className={styles.resultTitle}
                                    dangerouslySetInnerHTML={{ __html: item.titleHtml }}
                                />
                                {item.excerptHtml && (
                                    <span
                                        className={styles.resultExcerpt}
                                        dangerouslySetInnerHTML={{ __html: item.excerptHtml }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}