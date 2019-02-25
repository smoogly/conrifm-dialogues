import styles from "./App.module.scss"

import React, { PureComponent } from 'react';
import { ConfirmDialog } from "./comparators/confirm/confirm";
import { SaveButton } from "./comparators/save/save";
import { Live } from "./comparators/live/live";
import { getRandomInt, rollover, shuffle } from "./util";

const variants = [
    {
        name: "Confirm",
        comp: ConfirmDialog
    },
    {
        name: "Save",
        comp: SaveButton
    },
    {
        name: "Live",
        comp: Live
    }
];


type PreparedChoice = { expected: number, order: ReadonlyArray<number> };
const prepareChoices = (size: number): ReadonlyArray<PreparedChoice> => Array
    .from(Array(size))
    .map((x, i) => {
        const expected = getRandomInt(1, 4);
        if (i % nthFailing !== nthFailing - 1) { return {
            expected,
            order: [1, 2, 3] // Correct order
        }; }

        const shuffled = shuffle([1, 2, 3]);
        return {
            expected,
            order: shuffled[expected - 1] === expected ? rollover(shuffled) : shuffled
        }
    });

interface AppState {
    examples: number;
    exampleChoices: ReadonlyArray<PreparedChoice>;
    results: {[type: string]: ReadonlyArray<boolean>};
    times: { [type: string]: number };
    choices: ReadonlyArray<PreparedChoice>;
}

const numExamples = 3;

const numTestsPerComparator = 10;
const nthFailing = 4;

class App extends PureComponent<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            examples: 0,
            exampleChoices: prepareChoices(numExamples),
            choices: prepareChoices(numTestsPerComparator),
            results: variants.reduce((_res, option) => {
                _res[option.name] = [];
                return _res;
            }, {} as AppState["results"]),
            times: variants.reduce((_res, option) => {
                _res[option.name] = 0;
                return _res;
            }, {} as AppState["times"]),
        };
    }

    private isExample() { return this.state.examples < variants.length * numExamples; }
    private getVariant() { return variants.find((v, i) => {
        if (this.isExample()) { return i === Math.floor(this.state.examples / numExamples); }
        return this.state.results[v.name].filter(x => x === true).length < numTestsPerComparator;
    }); }

    private start = Date.now();
    private prevVariant: any = variants[0];
    public render() {
        const isExample = this.isExample();
        const variant = this.getVariant();
        if (this.prevVariant && variant !== this.prevVariant) {
            const now = Date.now();
            this.setState({
                times: {...this.state.times, [this.prevVariant.name]: now - this.start }
            });

            this.start = now;
            this.prevVariant = variant;
        }

        if (!variant) { return <table className={ styles.result }>{
            Object.keys(this.state.times).map(k => <tr key={ k }>
                <td>{ k }</td>
                <td>{ this.state.times[k] / 1000 } seconds</td>
            </tr>)
        }</table>; }

        const Component = variant.comp;
        return <div className={ styles.wrap }>{
            Array.from(Array(isExample ? numExamples : numTestsPerComparator)).map((x, i) => {
                const test = isExample ? this.state.exampleChoices[i] : this.state.choices[i];
                return <div key={ variant.name + i } className={ styles["test-row"] }>
                    <div className={styles["test-row__directions"]}>Select { test.expected }:</div>

                    <Component choices={ test.order }
                               correct={ test.expected }
                               onSelect={ (val: number) => {
                                   if (isExample) { return this.setState({ examples: this.state.examples + 1 }); }

                                   const variantResponses = [...this.state.results[variant.name]];
                                   const passes = test.expected === val;
                                   variantResponses[i] = passes;
                                   this.setState({ results: { ...this.state.results, [variant.name]: variantResponses } });
                               } }/>
                </div>;
            })
        }</div>;
    }
}

export default App;
