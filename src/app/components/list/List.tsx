import React, { useRef, useCallback } from 'react';
// import Grid, { accessibilityOverscanIndicesGetter } from '../Grid';
import clsx from 'clsx';
import { RenderedRows } from 'react-virtualized/dist/es/List';
import { Alignment, Grid } from 'react-virtualized';
import { CellPosition } from 'react-virtualized/dist/es/CellMeasurer';
// import type {
//   NoContentRenderer,
//   Alignment,
//   CellSize,
//   CellPosition,
//   OverscanIndicesGetter,
//   RenderedSection,
//   CellRendererParams,
//   Scroll as GridScroll
// } from '../Grid';
// import type { RowRenderer, RenderedRows, Scroll } from './types';

type CellRendererParams = {
	columnIndex: number;
	isScrolling: boolean;
	isVisible: boolean;
	key: string;
	parent: Object;
	rowIndex: number;
	style: any;
};

type Props = {
	'aria-label'?: string;
	autoHeight: boolean;
	className?: string;
	estimatedRowSize: number;
	height: number;
	noRowsRenderer: any;
	onRowsRendered: (params: RenderedRows) => void;
	onScroll: (params: any) => void;
	// overscanIndicesGetter: OverscanIndicesGetter;
	// overscanRowCount: number;
	rowHeight: any;
	rowRenderer: any;
	rowCount: number;
	scrollToAlignment: 'auto' | 'end' | 'start' | 'center';
	scrollToIndex: number | undefined;
	scrollTop?: number;
	style: Object;
	tabIndex?: number;
	width: number;
};

const List: React.FC<Props> = ({
	autoHeight = false,
	className,
	estimatedRowSize = 30,
	height,
	noRowsRenderer = () => null,
	onRowsRendered = () => {},
	onScroll = () => {},
	// overscanIndicesGetter = accessibilityOverscanIndicesGetter,
	// overscanRowCount = 10,
	rowHeight,
	rowRenderer,
	rowCount,
	scrollToAlignment = 'auto',
	scrollToIndex = -1,
	scrollTop,
	style = {},
	tabIndex,
	width,
}) => {
	const gridRef = useRef<React.ElementRef<typeof Grid> | null>(null);

	const forceUpdateGrid = useCallback(() => {
		if (gridRef.current) {
			gridRef.current.forceUpdate();
		}
	}, []);

	const getOffsetForRow = useCallback(
		({ alignment, index }: { alignment: Alignment; index: number }) => {
			if (gridRef.current) {
				const { scrollTop } = gridRef.current.getOffsetForCell({
					alignment,
					rowIndex: index,
					columnIndex: 0,
				});
				return scrollTop;
			}
			return 0;
		},
		[]
	);

	const invalidateCellSizeAfterRender = useCallback(
		({ columnIndex, rowIndex }: CellPosition) => {
			if (gridRef.current) {
				gridRef.current.invalidateCellSizeAfterRender({
					rowIndex,
					columnIndex,
				});
			}
		},
		[]
	);

	const measureAllRows = useCallback(() => {
		if (gridRef.current) {
			gridRef.current.measureAllCells();
		}
	}, []);

	// const recomputeGridSize = useCallback(
	// 	({ columnIndex = 0, rowIndex = 0 }: CellPosition = {}) => {
	// 		if (gridRef.current) {
	// 			gridRef.current.recomputeGridSize({
	// 				rowIndex,
	// 				columnIndex,
	// 			});
	// 		}
	// 	},
	// 	[]
	// );

	const recomputeRowHeights = useCallback((index: number = 0) => {
		if (gridRef.current) {
			gridRef.current.recomputeGridSize({
				rowIndex: index,
				columnIndex: 0,
			});
		}
	}, []);

	// const scrollToPosition = useCallback((scrollTop: number = 0) => {
	// 	if (gridRef.current) {
	// 		gridRef.current.scrollToPosition({ scrollTop });
	// 	}
	// }, []);

	const scrollToRow = useCallback((index: number = 0) => {
		if (gridRef.current) {
			gridRef.current.scrollToCell({
				columnIndex: 0,
				rowIndex: index,
			});
		}
	}, []);

	const _cellRenderer = useCallback(
		({
			parent,
			rowIndex,
			style,
			isScrolling,
			isVisible,
			key,
		}: CellRendererParams) => {
			const widthDescriptor = Object.getOwnPropertyDescriptor(
				style,
				'width'
			);
			if (widthDescriptor && widthDescriptor.writable) {
				style.width = '100%'; // Ensure 100% width to avoid overflow under a scrollbar
			}
			return rowRenderer({
				index: rowIndex,
				style,
				isScrolling,
				isVisible,
				key,
				parent,
			});
		},
		[rowRenderer]
	);

	const _onScroll = useCallback(
		({
			clientHeight,
			scrollHeight,
			scrollTop,
		}: {
			clientHeight: number;
			scrollHeight: number;
			scrollTop: number;
		}) => {
			onScroll({ clientHeight, scrollHeight, scrollTop });
		},
		[onScroll]
	);

	const _onSectionRendered = useCallback(
		({
			rowOverscanStartIndex,
			rowOverscanStopIndex,
			rowStartIndex,
			rowStopIndex,
		}: {
			rowOverscanStartIndex: number;
			rowOverscanStopIndex: number;
			rowStartIndex: number;
			rowStopIndex: number;
		}) => {
			onRowsRendered({
				overscanStartIndex: rowOverscanStartIndex,
				overscanStopIndex: rowOverscanStopIndex,
				startIndex: rowStartIndex,
				stopIndex: rowStopIndex,
			});
		},
		[onRowsRendered]
	);

	const classNames = clsx('ReactVirtualized__List', className);

	return (
		<Grid
			autoContainerWidth
			{...{
				autoHeight,
				estimatedRowSize,
				height,
				noContentRenderer: noRowsRenderer,
				// overscanIndicesGetter,
				// overscanRowCount,
				rowHeight,
				rowCount,
				scrollToAlignment,
				scrollToIndex,
				scrollTop,
				style,
				tabIndex,
				width,
			}}
			cellRenderer={_cellRenderer}
			className={classNames}
			columnWidth={width}
			columnCount={1}
			onScroll={_onScroll}
			onSectionRendered={_onSectionRendered}
			ref={gridRef}
			scrollToRow={scrollToIndex}
		/>
	);
};

export default List;
