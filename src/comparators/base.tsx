import React, { CSSProperties, PureComponent } from 'react';
import { ComparatorProps } from "./icomparator";

const _wh: CSSProperties = {
    width: "2em",
    height: "2em"
};

const correctStyle: CSSProperties = {
    background: "green",
    ..._wh
};
const incorrectStyle: CSSProperties = {
    background: "red",
    ..._wh
};

const notSelectedStyle: CSSProperties = { ..._wh };
const defaultSelectedStyle: CSSProperties = {
    background: "black",
    ..._wh
};

const getStyle = (correct: boolean, selected: boolean, show: boolean): CSSProperties => {
    if (!selected) { return notSelectedStyle; }
    if (!show) { return defaultSelectedStyle; }
    return correct ? correctStyle : incorrectStyle;
};

type BaseProps = ComparatorProps & { selected: number | null, show: boolean };
export class ComparatorBase extends PureComponent<BaseProps> {
    private selectors: {[props: number]: () => void} = {};
    private _setSelectors(props: BaseProps) {
        this.selectors = props.choices.reduce((_sel, val) => {
            _sel[val] = () => this.props.onSelect(val);
            return _sel;
        }, {} as ComparatorBase["selectors"]);
    }

    constructor(props: BaseProps) {
        super(props);
        this._setSelectors(props);
    }
    public componentWillReceiveProps(props: BaseProps): void {
        this._setSelectors(props);
    }

    public render() {
        const correct = this.props.selected === this.props.correct;
        return <div>{
            this.props.choices.map(c => {
                const selected = c === this.props.selected;
                return <button
                    key={ c }
                    style={ getStyle(correct, selected, this.props.show) }
                    onClick={ this.selectors[c] }
                >{
                    selected && this.props.show ? c : <span>&nbsp;</span>
                }</button>;
            })
        }</div>
    }
}
