import type { HashMap } from '@rimbu/hashed';
import type { SortedMap } from '@rimbu/sorted';
import type { RMap } from '@rimbu/collection-types';

import type {
  ArrowValuedGraph,
  ArrowValuedGraphHashed,
  ArrowValuedGraphSorted,
} from '@rimbu/graph';
import type { ValuedGraphBase } from '@rimbu/graph/custom';

export interface ArrowValuedGraphCreators {
  /**
   * Returns a new ArrowValuedGraph context instance based on the given `options`.
   * @typeparam UN - the upper node type for which the context can create instances
   * @param options - an object containing the following properties:<br/>
   * - linkMapContext - the map context to use to maintain link maps<br/>
   * - linkConnectionsContext - the map context to use to maintain link connection maps
   */
  createContext<UN>(options: {
    linkMapContext: RMap.Context<UN>;
    linkConnectionsContext: RMap.Context<UN>;
  }): ArrowValuedGraph.Context<UN>;
}

export interface ArrowValuedGraphHashedCreators
  extends ValuedGraphBase.Factory<ArrowValuedGraphHashed.Types> {
  /**
   * Returns a new ArrowValuedGraphHashed context instance based on the given `options`.
   * @typeparam UN - the upper node type for which the context can create instances
   * @param options - (optional) an object containing the following properties:<br/>
   * - linkMapContext - (optional) the map context to use to maintain link maps<br/>
   * - linkConnectionsContext - (optional) the map context to use to maintain link connection maps
   */
  createContext<UN>(options?: {
    linkMapContext?: HashMap.Context<UN>;
    linkConnectionsContext?: HashMap.Context<UN>;
  }): ArrowValuedGraphHashed.Context<UN>;
  /**
   * Returns the default context for this type of graph.
   * @typeparam UN - the upper node type that the context should accept
   */
  defaultContext<UN>(): ArrowValuedGraphHashed.Context<UN>;
}

export interface ArrowValuedGraphSortedCreators
  extends ValuedGraphBase.Factory<ArrowValuedGraphSorted.Types> {
  /**
   * Returns a new ArrowValuedGraphSorted context instance based on the given `options`.
   * @typeparam UN - the upper node type for which the context can create instances
   * @param options - (optional) an object containing the following properties:<br/>
   * - linkMapContext - (optional) the map context to use to maintain link maps<br/>
   * - linkConnectionsContext - (optional) the map context to use to maintain link connection maps
   */
  createContext<UN>(options?: {
    linkMapContext?: SortedMap.Context<UN>;
    linkConnectionsContext?: SortedMap.Context<UN>;
  }): ArrowValuedGraphSorted.Context<UN>;
  /**
   * Returns the default context for this type of graph.
   * @typeparam UN - the upper node type that the context should accept
   */
  defaultContext<UN>(): ArrowValuedGraphSorted.Context<UN>;
}
