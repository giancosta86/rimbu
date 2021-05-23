import { OptLazy, RelatedTo } from '@rimbu/common';
import { Stream, Streamable } from '@rimbu/stream';
import { VariantGraphBase, WithGraphValues } from '../graph-custom';
import { ValuedLink, ValuedGraphElement } from '../internal';

export interface VariantValuedGraphBase<
  N,
  V,
  Tp extends VariantValuedGraphBase.Types = VariantValuedGraphBase.Types
> extends VariantGraphBase<N, V, Tp> {
  /**
   * Returns the value of the connection between given `node1` and `node2`
   * @param node1 - the first connection node
   * @param node2 - the second connection node
   * @param otherwise - (default: undefined) the fallback value to return if the connection does not exist
   * @example
   * const g = ArrowValuedGraphHashed.of([1, 2, 'a'], [2, 3, 'b'])
   * g.getValue(1, 2) // => 'a'
   * g.getValue(3, 4) // => undefined
   * g.getValue(1, 2, 'z')  // => 'a'
   * g.getValue(3, 4, 'z')  // => 'z'
   */
  getValue<UN = N>(
    node1: RelatedTo<N, UN>,
    node2: RelatedTo<N, UN>
  ): V | undefined;
  getValue<UN, O>(
    node1: RelatedTo<N, UN>,
    node2: RelatedTo<N, UN>,
    otherwise: OptLazy<O>
  ): V | O;
  /**
   * Returns a graph with the same connections, but where the given `mapFun` function is applied to each connection value.
   * @param mapFun - a function taking a `value` and connection's `node1` and `node2`, and returning a new value
   * @example
   * ArrowValuedGraphHashed.of([1, 2, 'a'], [2, 3, 'bc']).mapValues(v => v.length).toArray()
   * // => [[1, 2, 1], [2, 3, 2]]
   */
  mapValues<V2>(
    mapFun: (value: V, node1: N, node2: N) => V2
  ): WithGraphValues<Tp, N, V2>['normal'];
}

export namespace VariantValuedGraphBase {
  type NonEmptyBase<
    N,
    V,
    Tp extends VariantValuedGraphBase.Types
  > = VariantGraphBase.NonEmpty<N, V, Tp> & VariantValuedGraphBase<N, V, Tp>;

  export interface NonEmpty<
    N,
    V,
    Tp extends VariantValuedGraphBase.Types = VariantValuedGraphBase.Types
  > extends NonEmptyBase<N, V, Tp>,
      Streamable.NonEmpty<ValuedGraphElement<N, V>> {
    /**
     * Returns a non-empty Stream containing all entries of this collection as tuples of key and value.
     * @example
     * ArrowValuedGraphHashed.of([1, 2, 'a'], [2, 3, 'b']).stream().toArray()
     * // => [[1, 2, 'a'], [2, 3, 'b']]
     */
    stream(): Stream.NonEmpty<ValuedGraphElement<N, V>>;
    /**
     * Returns a non-empty graph with the same connections, but where the given `mapFun` function is applied to each connection value.
     * @param mapFun - a function taking a `value` and connection's `node1` and `node2`, and returning a new value
     * @example
     * ArrowValuedGraphHashed.of([1, 2, 'a'], [2, 3, 'bc']).mapValues(v => v.length).toArray()
     * // => [[1, 2, 1], [2, 3, 2]]
     */
    mapValues<V2>(
      mapFun: (value: V, node1: N, node2: N) => V2
    ): WithGraphValues<Tp, N, V2>['nonEmpty'];
  }

  export interface Types extends VariantGraphBase.Types {
    normal: VariantValuedGraphBase<this['_N'], this['_V']>;
    nonEmpty: VariantValuedGraphBase.NonEmpty<this['_N'], this['_V']>;
    link: ValuedLink<this['_N'], this['_V']>;
    linkTarget: ValuedLink.Target<this['_N'], this['_V']>;
  }
}
