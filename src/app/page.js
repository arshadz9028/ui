"use client";

import useSWR from "swr";
import { useState, useRef } from "react";
import Spinner from "../components/Spinner";
import styles from "./page.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const limit = 50;

  const { data, isLoading } = useSWR(
    query.length > 1
      ? `/api/newSearch?q=${query}&page=${page}&limit=${limit}`
      : null,
    fetcher
  );

  const results = data?.results || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const inputRef = useRef(null);
  console.log("Search results:", results);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Voter Search</h2>

      <div className={styles.searchWrapper}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by voter ID, name, address, father name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className={styles.searchInput}
        />

        {query.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            className={styles.searchClearButton}
            onClick={() => {
              setQuery("");
              setPage(1);
              if (inputRef.current) inputRef.current.focus();
            }}
          >
            <IoIosCloseCircle />
          </button>
        )}
      </div>

      {isLoading && query && <Spinner />}

      {!query || query.length < 2 ? (
        <p className={styles.infoText}>Type at least 2 characters to start searching.</p>
      ) : null}

      {query && !isLoading && total === 0 && (
        <div className={styles.noResults}>
          No results found for <span className={styles.emphasis}>{query}</span>. Try a different keyword or check spelling.
        </div>
      )}

      {query && total > 0 && (
        <p className={styles.infoText}>
          Showing {Math.min((page - 1) * limit + 1, total)} to {Math.min(page * limit, total)} of {total} results
        </p>
      )}

      {/* RESULTS */}
      <div className={styles.resultsGrid}>
        {results.map((item) => (
          <div key={item._id} className={styles.resultCard}>
            {copiedId === item._id && <div className={styles.copiedBadge}>Copied</div>}
            <button
              type="button"
              aria-label="Copy result"
              className={styles.copyButton}
              onClick={async () => {
                const text = `Name: ${item.name}\nRelative: ${item.relative}\nRelation: ${item.relation}\nEPIC: ${item.epic}\nHouse: ${item.house}\nAge: ${item.age}\nGender: ${item.gender}\nSr: ${item.sr}\nPage: ${item._page}\nFile: ${item._file}\nRaw Line: ${item._raw_line}`;
                try {
                  await navigator.clipboard.writeText(text);
                  setCopiedId(item._id);
                  setTimeout(() => setCopiedId(null), 1800);
                } catch (err) {
                  console.error('Copy failed', err);
                }
              }}
            >
              <IoCopy />
            </button>

            <div className={styles.resultRow}><span className={styles.fieldLabel}>Name:</span> {item.name}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Relative:</span> {item.relative}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Relation:</span> {item.relation}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>EPIC:</span> {item.epic}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>House:</span> {item.house}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Age:</span> {item.age}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Gender:</span> {item.gender}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Sr:</span> {item.sr}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Page:</span> {item._page}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>File:</span> {item._file}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
            className={[styles.buttonPrimary, page <= 1 && styles.buttonDisabled].filter(Boolean).join(" ")}
          >
            Previous
          </button>

          <div style={{ flex: 1 }} />

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className={[styles.buttonPrimary, page >= totalPages && styles.buttonDisabled].filter(Boolean).join(" ")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
// import React from 'react'

// function page() {
//   return (
//     <div>Temporary unavailable</div>
//   )
// }

// export default page