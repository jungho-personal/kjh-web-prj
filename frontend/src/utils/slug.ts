export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    // 한글/특수문자 정리: 공백/언더스코어/연속 하이픈 처리
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
