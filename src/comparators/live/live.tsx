import React, { PureComponent } from 'react';
import { ComparatorProps } from "../icomparator";
import { ComparatorBase } from "../base";

export class Live extends PureComponent<ComparatorProps, { selected: number | null}> {
    constructor(props: ComparatorProps) {
        super(props);

        this.state = {
            selected: null,
        }
    }

    private attempt = (selected: number) => {
        this.setState({ selected });
        this.props.onSelect(selected);
    };
    public render() {
        return <div>
            <ComparatorBase { ...this.props } show selected={ this.state.selected } onSelect={ this.attempt }/>
        </div>
    }
}
