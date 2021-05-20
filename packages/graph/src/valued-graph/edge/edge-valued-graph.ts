import { RMap } from '@rimbu/collection-types';
import { Stream, Streamable } from '@rimbu/stream';
import { EdgeValuedGraphBase, ValuedGraphContext } from '../../graph-custom';
import { ValuedGraphElement } from '../../internal';

/**
 * An type-invariant immutable valued edge (undirected) graph.
 * @typeparam N - the node type
 * @typeparam V - the connection value type
 */
export interface EdgeValuedGraph<N, V>
  extends EdgeValuedGraphBase<N, V, EdgeValuedGraph.Types> {}

export namespace EdgeValuedGraph {
  type NonEmptyBase<N, V> = EdgeValuedGraphBase.NonEmpty<
    N,
    V,
    EdgeValuedGraph.Types
  > &
    EdgeValuedGraph<N, V>;

  /**
   * A non-empty type-invariant immutable valued edge (undirected) graph.
   * @typeparam N - the node type
   * @typeparam V - the connection value type
   */
  export interface NonEmpty<N, V>
    extends NonEmptyBase<N, V>,
      Streamable.NonEmpty<ValuedGraphElement<N, V>> {
    /**
     * Returns a non-empty Stream containing all entries of this collection as tuples of key and value.
     * @example
     * EdgeValuedGraphHashed.of([1, 2, 'a'], [2, 3, 'b']).stream().toArray()
     * // => [[1, 2, 'a'], [2, 3, 'b']]
     */
    stream(): Stream.NonEmpty<ValuedGraphElement<N, V>>;
  }

  /**
   * A mutable `EdgeValuedGraph` builder used to efficiently create new immutable instances.
   * @typeparam N - the node type
   * @typeparam V - the connection value type
   */
  export interface Builder<N, V>
    extends EdgeValuedGraphBase.Builder<N, V, EdgeValuedGraph.Types> {}

  /**
   * The EdgeValuedGraph's Context instance that serves as a factory for all related immutable instances and builders.
   * @typeparam UN - the upper type limit for node types for which this context can create instances
   */
  export interface Context<UN>
    extends EdgeValuedGraphBase.Context<UN, EdgeValuedGraph.Types> {}

  export interface Types extends EdgeValuedGraphBase.Types {
    normal: EdgeValuedGraph<this['_N'], this['_V']>;
    nonEmpty: EdgeValuedGraph.NonEmpty<this['_N'], this['_V']>;
    context: EdgeValuedGraph.Context<this['_N']>;
    builder: EdgeValuedGraph.Builder<this['_N'], this['_V']>;
  }
}

interface TypesImpl extends EdgeValuedGraph.Types {
  context: ValuedGraphContext<this['_N'], string, any>;
}

export const EdgeValuedGraph = {
  /**
   * Returns a new EdgeValuedGraph context instance based on the given `options`.
   * @typeparam UN - the upper node type for which the context can create instances
   * @param options - an object containing the following properties:
   * * linkMapContext - the map context to use to maintain link maps
   * * linkConnectionsContext - the map context to use to maintain link connection maps
   */
  createContext<UN>(options: {
    linkMapContext: RMap.Context<UN>;
    linkConnectionsContext: RMap.Context<UN>;
  }): EdgeValuedGraph.Context<UN> {
    return new ValuedGraphContext<UN, 'ArrowValuedGraph', TypesImpl>(
      true,
      'ArrowValuedGraph',
      options.linkMapContext,
      options.linkConnectionsContext
    );
  },
};
