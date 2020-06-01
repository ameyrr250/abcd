/** Fun1
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=80 icon="\uf1ec" block="Fun Blocks"
namespace fun {
    /**
    * Computes the famous Fibonacci number sequence!
    */

    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value - 1) + fib(value - 2);
    }

     /**
     * Calculates fibo`.
     * @param Number for fibo eg: 4
     */
    //% weight=80
    //% blockId=Fibonacci block="FibonacciCalc" blockGap=8
    //% parts="headphone"
    //% useEnumVal=1
    //% group="New"
    export function fibonacci(value: number): number {
        return value <= 1 ? value : fibonacci(value - 1) + fibonacci(value - 2);
    }

}