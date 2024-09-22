// import React, { useRef, useCallback } from 'react';
// import clsx from 'clsx';
// import type { RenderedSection } from 'react-virtualized/dist/commonjs/Grid';
// import Grid, {
// 	OverscanIndicesGetter,
// } from 'react-virtualized/dist/commonjs/Grid';
// import { RenderedRows } from 'react-virtualized/dist/es/List';
// import NoContentRenderer from 'react-virtualized/dist/commonjs/Grid';
// import Alignment from 'react-virtualized/dist/commonjs/Grid';
// import CellSize from 'react-virtualized/dist/commonjs/Grid';
// import CellPosition from 'react-virtualized/dist/commonjs/Grid';
// import CellRendererParams from 'react-virtualized/dist/commonjs/Grid';
// import GridScroll from 'react-virtualized/dist/commonjs/Grid';

// type Props = {
// 	'aria-label'?: string;
// 	autoHeight: boolean;
// 	className?: string;
// 	estimatedRowSize: number;
// 	height: number;
// 	noRowsRenderer: NoContentRenderer;
// 	onRowsRendered: (params: RenderedRows) => void;
// 	// onScroll: (params: Scroll) => void;
// 	overscanIndicesGetter: OverscanIndicesGetter;
// 	overscanRowCount: number;
// 	rowHeight: CellSize;
// 	// rowRenderer: RowRenderer;
// 	rowCount: number;
// 	scrollToAlignment: Alignment;
// 	scrollToIndex: number;
// 	scrollTop?: number;
// 	// style: Object;
// 	tabIndex?: number;
// 	width: number;
// };

// const List: React.FC<Props> = ({
// 	className,
// 	noRowsRenderer,
// 	scrollToIndex,
// 	width,
// 	onScroll,
// 	onRowsRendered,
// 	...props
// }) => {
// 	const gridRef = useRef<React.ElementRef<typeof Grid> | null>(null);

// 	const forceUpdateGrid = useCallback(() => {
// 		if (gridRef.current) {
// 			gridRef.current.forceUpdate();
// 		}
// 	}, []);

// 	const getOffsetForRow = useCallback(
// 		({ alignment, index }: { alignment: Alignment; index: number }) => {
// 			if (gridRef.current) {
// 				const { scrollTop } = gridRef.current.getOffsetForCell({
// 					alignment,
// 					rowIndex: index,
// 					columnIndex: 0,
// 				});
// 				return scrollTop;
// 			}
// 			return 0;
// 		},
// 		[]
// 	);

// 	const invalidateCellSizeAfterRender = useCallback(
// 		({ columnIndex, rowIndex }: CellPosition) => {
// 			if (gridRef.current) {
// 				gridRef.current.invalidateCellSizeAfterRender({
// 					rowIndex,
// 					columnIndex,
// 				});
// 			}
// 		},
// 		[]
// 	);

// 	const measureAllRows = useCallback(() => {
// 		if (gridRef.current) {
// 			gridRef.current.measureAllCells();
// 		}
// 	}, []);

// 	const recomputeGridSize = useCallback(
// 		({ columnIndex = 0, rowIndex = 0 }: CellPosition = {}) => {
// 			if (gridRef.current) {
// 				gridRef.current.recomputeGridSize({ rowIndex, columnIndex });
// 			}
// 		},
// 		[]
// 	);

// 	const recomputeRowHeights = useCallback((index: number = 0) => {
// 		if (gridRef.current) {
// 			gridRef.current.recomputeGridSize({
// 				rowIndex: index,
// 				columnIndex: 0,
// 			});
// 		}
// 	}, []);

// 	const scrollToPosition = useCallback((scrollTop: number = 0) => {
// 		if (gridRef.current) {
// 			gridRef.current.scrollToPosition({ scrollTop });
// 		}
// 	}, []);

// 	const scrollToRow = useCallback((index: number = 0) => {
// 		if (gridRef.current) {
// 			gridRef.current.scrollToCell({
// 				columnIndex: 0,
// 				rowIndex: index,
// 			});
// 		}
// 	}, []);

// 	const _cellRenderer = useCallback(
// 		({
// 			parent,
// 			rowIndex,
// 			style,
// 			isScrolling,
// 			isVisible,
// 			key,
// 		}: CellRendererParams) => {
// 			const { rowRenderer } = props;

// 			const widthDescriptor = Object.getOwnPropertyDescriptor(
// 				style,
// 				'width'
// 			);
// 			if (widthDescriptor && widthDescriptor.writable) {
// 				style.width = '100%';
// 			}

// 			return rowRenderer({
// 				index: rowIndex,
// 				style,
// 				isScrolling,
// 				isVisible,
// 				key,
// 				parent,
// 			});
// 		},
// 		[props]
// 	);

// 	const _onScroll = useCallback(
// 		({ clientHeight, scrollHeight, scrollTop }: GridScroll) => {
// 			onScroll({ clientHeight, scrollHeight, scrollTop });
// 		},
// 		[onScroll]
// 	);

// 	const _onSectionRendered = useCallback(
// 		({
// 			rowOverscanStartIndex,
// 			rowOverscanStopIndex,
// 			rowStartIndex,
// 			rowStopIndex,
// 		}: RenderedSection) => {
// 			onRowsRendered({
// 				overscanStartIndex: rowOverscanStartIndex,
// 				overscanStopIndex: rowOverscanStopIndex,
// 				startIndex: rowStartIndex,
// 				stopIndex: rowStopIndex,
// 			});
// 		},
// 		[onRowsRendered]
// 	);

// 	const classNames = clsx('ReactVirtualized__List', className);

// 	return (
// 		<Grid
// 			{...props}
// 			autoContainerWidth
// 			cellRenderer={_cellRenderer}
// 			className={classNames}
// 			columnWidth={width}
// 			columnCount={1}
// 			noContentRenderer={noRowsRenderer}
// 			onScroll={_onScroll}
// 			onSectionRendered={_onSectionRendered}
// 			ref={gridRef}
// 			scrollToRow={scrollToIndex}
// 		/>
// 	);
// };

// List.defaultProps = {
// 	autoHeight: false,
// 	estimatedRowSize: 30,
// 	onScroll: () => {},
// 	noRowsRenderer: () => null,
// 	onRowsRendered: () => {},
// 	overscanIndicesGetter: accessibilityOverscanIndicesGetter,
// 	overscanRowCount: 10,
// 	scrollToAlignment: 'auto',
// 	scrollToIndex: -1,
// 	style: {},
// };

// export default List;
