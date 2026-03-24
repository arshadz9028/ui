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
      ? `/api/search?q=${query}&page=${page}&limit=${limit}`
      : null,
    fetcher
  );

  const results = data?.results || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const inputRef = useRef(null);
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
                const text = `Name: ${item.name_original}\nFather/Husband: ${item.father_or_husband_original}\nVoter ID: ${item.voter_id}\nAddress: ${item.address_original}\nWard: ${item.ward}\nPage: ${item.page}\nFile: ${item.file_name}\nSource line: ${item._raw_line}`;
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

            <div className={styles.resultRow}><span className={styles.fieldLabel}>Name:</span> {item.name_original}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Father/Husband:</span> {item.father_or_husband_original}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Voter ID:</span> {item.voter_id}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Address:</span> {item.address_original}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Ward:</span> {item.ward}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Page:</span> {item.page}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>File:</span> {item.file_name}</div>
            <div className={styles.resultRow}><span className={styles.fieldLabel}>Source line:</span> {item._raw_line}</div>
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