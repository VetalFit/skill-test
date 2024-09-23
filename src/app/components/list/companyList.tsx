import clsx from 'clsx';
import Immutable from 'immutable';
import React, { useContext, useState } from 'react';
import styles from './List.module.css';
import { AutoSizer } from 'react-virtualized';
import List from 'react-virtualized/dist/commonjs/List';
// import {
//   ContentBox,
//   ContentBoxHeader,
//   ContentBoxParagraph,
// } from '../demo/ContentBox';
// import { LabeledInput, InputRow } from '../demo/LabeledInput';

// Контекст для списка
const ListContext = React.createContext(Immutable.List());

const ListExample = () => {
	const list = useContext(ListContext); // Доступ к контексту списка
	const [listHeight, setListHeight] = useState(300);
	const [listRowHeight, setListRowHeight] = useState(50);
	// const [overscanRowCount, setOverscanRowCount] = useState(10);
	const [rowCount, setRowCount] = useState(list.size);
	const [scrollToIndex, setScrollToIndex] = useState<number | undefined>(
		undefined
	);
	const [showScrollingPlaceholder, setShowScrollingPlaceholder] =
		useState(false);
	const [useDynamicRowHeight, setUseDynamicRowHeight] = useState(false);

	const getDatum = (index: number) => {
		return list.get(index % list.size);
	};

	const getRowHeight = ({ index }: { index: number }) => {
		return getDatum(index).size;
	};

	const noRowsRenderer = () => {
		return <div className={styles.noRows}>No rows</div>;
	};

	const onRowCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newRowCount = parseInt(event.target.value, 10) || 0;
		setRowCount(newRowCount);
	};

	const onScrollToRowChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		let newScrollToIndex = Math.min(
			rowCount - 1,
			parseInt(event.target.value, 10)
		);

		// if (isNaN(newScrollToIndex)) {
		// 	newScrollToIndex = undefined;
		// }

		setScrollToIndex(newScrollToIndex);
	};

	const rowRenderer = ({
		index,
		isScrolling,
		key,
		style,
	}: {
		index: number;
		isScrolling: boolean;
		key: string;
		style: React.CSSProperties;
	}) => {
		if (showScrollingPlaceholder && isScrolling) {
			return (
				<div
					className={clsx(styles.row, styles.isScrollingPlaceholder)}
					key={key}
					style={style}
				>
					Scrolling...
				</div>
			);
		}

		const datum = getDatum(index);

		let additionalContent;
		if (useDynamicRowHeight) {
			switch (datum.size) {
				case 75:
					additionalContent = <div>It is medium-sized.</div>;
					break;
				case 100:
					additionalContent = (
						<div>
							It is large-sized.
							<br />
							It has a 3rd row.
						</div>
					);
					break;
			}
		}

		return (
			<div className={styles.row} key={key} style={style}>
				<div
					className={styles.letter}
					style={{
						backgroundColor: datum.color,
					}}
				>
					{datum.name.charAt(0)}
				</div>
				<div>
					<div className={styles.name}>{datum.name}</div>
					<div className={styles.index}>This is row {index}</div>
					{additionalContent}
				</div>
				{useDynamicRowHeight && (
					<span className={styles.height}>{datum.size}px</span>
				)}
			</div>
		);
	};

	return (
		<div>
			<AutoSizer disableHeight>
				{({ width }) => (
					<List
						className={styles.List}
						height={listHeight}
						// overscanRowCount={overscanRowCount}
						noRowsRenderer={noRowsRenderer}
						rowCount={rowCount}
						rowHeight={
							useDynamicRowHeight ? getRowHeight : listRowHeight
						}
						rowRenderer={rowRenderer}
						scrollToIndex={scrollToIndex}
						width={width}
					/>
				)}
			</AutoSizer>
		</div>
	);
};

export default ListExample;
