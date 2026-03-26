// place files you want to import through the `$lib` alias in this folder.

import type { QueryDocumentSnapshot } from "firebase/firestore";

export function random_number_between_0_and(x: number) {
  return Math.floor(Math.random() * x);
}

export function pick_random_author(database_records: QueryDocumentSnapshot[]) {
  const distinct_authors: string[] = [
    ...new Set(database_records.map((r) => r.data().author || "anonymous")),
  ];

  const number_of_authors = distinct_authors.length;
  const random_author_index = random_number_between_0_and(number_of_authors);
  const picked_author = distinct_authors[random_author_index];

  return picked_author;
}

export function get_ideas_of_author(
  records: QueryDocumentSnapshot[],
  auhtor: string,
) {
  return records.filter((d) => d.data().author === auhtor);
}
