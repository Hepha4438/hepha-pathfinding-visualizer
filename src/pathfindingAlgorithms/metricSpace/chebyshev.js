// Chebyshev Distance (L∞ norm)
// Also known as chessboard distance or maximum metric
export function chebyshevDistance(nodeA, nodeB) {
  return Math.max(
    Math.abs(nodeA.row - nodeB.row),
    Math.abs(nodeA.col - nodeB.col)
  );
}

// Weighted Chebyshev Distance
export function weightedChebyshevDistance(nodeA, nodeB, weight = 1) {
  return weight * chebyshevDistance(nodeA, nodeB);
}