interface Props {
    width?: string;
    height?: string;
    amount: number;
    bg?: string;
    fg?: string;
}

export type Chart = React.FC<Props>;
