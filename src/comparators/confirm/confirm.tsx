import styles from "./confirm.module.scss";

import React, { PureComponent } from 'react';
import { ComparatorProps } from "../icomparator";
import { ComparatorBase } from "../base";

export class ConfirmDialog extends PureComponent<ComparatorProps, { selected: number | null, confirmed: boolean }> {
    constructor(props: ComparatorProps) {
        super(props);

        this.state = {
            selected: null,
            confirmed: false
        }
    }

    private attempt = (selected: number) => this.setState({ selected, confirmed: false });
    private cancel = () => this.setState({ selected: null });
    private confirm = () => {
        this.props.onSelect(this.state.selected!);
        this.setState({ confirmed: true });
    };

    public render() {
        if (!this.state.confirmed && this.state.selected !== null) {
            return <div className={ styles.confirmation }>
                <span>You have selected { this.state.selected }</span>
                <button onClick={ this.cancel } className={ styles.btn }>Cancel</button>
                <button onClick={ this.confirm } className={ styles.btn }>Save</button>
            </div>;
        }

        return <div>
            <ComparatorBase { ...this.props } show selected={ this.state.selected } onSelect={ this.attempt }/>
        </div>
    }
}
