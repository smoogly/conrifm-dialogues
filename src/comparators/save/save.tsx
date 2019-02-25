import styles from "./save.module.scss";

import React, { PureComponent } from 'react';
import { ComparatorProps } from "../icomparator";
import { ComparatorBase } from "../base";

export class SaveButton extends PureComponent<ComparatorProps, { selected: number | null, saved: boolean }> {
    constructor(props: ComparatorProps) {
        super(props);

        this.state = {
            selected: null,
            saved: false
        }
    }

    private attempt = (selected: number) => this.setState({ selected, saved: false });
    private save = () => {
        this.props.onSelect(this.state.selected!);
        this.setState({ saved: true });
    };

    public render() {
        return <div className={ styles.save }>
            <ComparatorBase { ...this.props } show={ this.state.saved } selected={ this.state.selected } onSelect={ this.attempt }/>
            <button onClick={this.save} disabled={ this.state.selected === null} className={ styles.btn }>Save</button>
        </div>
    }
}
