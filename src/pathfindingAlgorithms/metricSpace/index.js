// Import the functions for the switch statement
import { manhattanDistance } from './manhattan.js';
import { euclideanDistance } from './euclidean.js'; 
import { chebyshevDistance } from './chebyshev.js';

// Export all metric space functions
export * from './manhattan.js';
export * from './euclidean.js';
export * from './chebyshev.js';

// Metric type constants
export const METRIC_TYPES = {
  MANHATTAN: 'manhattan',
  EUCLIDEAN: 'euclidean', 
  CHEBYSHEV: 'chebyshev'
};

// Get heuristic function based on metric type
export function getHeuristicFunction(metricType, weight = 1) {
  switch (metricType) {
    case METRIC_TYPES.MANHATTAN:
      return (nodeA, nodeB) => weight * manhattanDistance(nodeA, nodeB);
    case METRIC_TYPES.EUCLIDEAN:
      return (nodeA, nodeB) => weight * euclideanDistance(nodeA, nodeB);
    case METRIC_TYPES.CHEBYSHEV:
      return (nodeA, nodeB) => weight * chebyshevDistance(nodeA, nodeB);
    default:
      return (nodeA, nodeB) => weight * manhattanDistance(nodeA, nodeB);
  }
}