export default function calculateScore(time, count) {
    // Convert milliseconds to seconds
    const timeSeconds = time / 1000;

    // Use exponential scaling for better distribution
    const normalizedTime = Math.exp(-timeSeconds / 30); // e^(-t/30) gives nice decay
    const normalizedCount = Math.exp(-count / 30); // e^(-c/30) gives nice decay

    // Scale to 1-1000 range
    const score = Math.max(
        1,
        Math.min(1000, Math.round(normalizedTime * normalizedCount * 1000))
    );

    return score;
}