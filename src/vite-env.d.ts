/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module "monaco-editor/esm/vs/base/browser/ui/sash/sash.js" {
	/**
	 * A vertical sash layout provider provides position and height for a sash.
	 */
	interface IVerticalSashLayoutProvider {
		getVerticalSashLeft(sash: Sash): number;
		getVerticalSashTop?(sash: Sash): number;
		getVerticalSashHeight?(sash: Sash): number;
	}
	/**
	 * A vertical sash layout provider provides position and width for a sash.
	 */
	interface IHorizontalSashLayoutProvider {
		getHorizontalSashTop(sash: Sash): number;
		getHorizontalSashLeft?(sash: Sash): number;
		getHorizontalSashWidth?(sash: Sash): number;
	}
	interface ISashEvent {
		readonly startX: number;
		readonly currentX: number;
		readonly startY: number;
		readonly currentY: number;
		readonly altKey: boolean;
	}
	declare enum OrthogonalEdge {
		North = "north",
		South = "south",
		East = "east",
		West = "west"
	}
	interface IBoundarySashes {
		readonly top?: Sash;
		readonly right?: Sash;
		readonly bottom?: Sash;
		readonly left?: Sash;
	}
	interface ISashOptions {
		/**
		 * Whether a sash is horizontal or vertical.
		 */
		readonly orientation: Orientation;
		/**
		 * The width or height of a vertical or horizontal sash, respectively.
		 */
		readonly size?: number;
		/**
		 * A reference to another sash, perpendicular to this one, which
		 * aligns at the start of this one. A corner sash will be created
		 * automatically at that location.
		 *
		 * The start of a horizontal sash is its left-most position.
		 * The start of a vertical sash is its top-most position.
		 */
		readonly orthogonalStartSash?: Sash;
		/**
		 * A reference to another sash, perpendicular to this one, which
		 * aligns at the end of this one. A corner sash will be created
		 * automatically at that location.
		 *
		 * The end of a horizontal sash is its right-most position.
		 * The end of a vertical sash is its bottom-most position.
		 */
		readonly orthogonalEndSash?: Sash;
		/**
		 * Provides a hint as to what mouse cursor to use whenever the user
		 * hovers over a corner sash provided by this and an orthogonal sash.
		 */
		readonly orthogonalEdge?: OrthogonalEdge;
	}
	interface IVerticalSashOptions extends ISashOptions {
		readonly orientation: Orientation.VERTICAL;
	}
	interface IHorizontalSashOptions extends ISashOptions {
		readonly orientation: Orientation.HORIZONTAL;
	}
	declare const enum Orientation {
		VERTICAL = 0,
		HORIZONTAL = 1
	}
	declare const enum SashState {
		/**
		 * Disable any UI interaction.
		 */
		Disabled = 0,
		/**
		 * Allow dragging down or to the right, depending on the sash orientation.
		 *
		 * Some OSs allow customizing the mouse cursor differently whenever
		 * some resizable component can't be any smaller, but can be larger.
		 */
		AtMinimum = 1,
		/**
		 * Allow dragging up or to the left, depending on the sash orientation.
		 *
		 * Some OSs allow customizing the mouse cursor differently whenever
		 * some resizable component can't be any larger, but can be smaller.
		 */
		AtMaximum = 2,
		/**
		 * Enable dragging.
		 */
		Enabled = 3
	}
	/**
	 * The {@link Sash} is the UI component which allows the user to resize other
	 * components. It's usually an invisible horizontal or vertical line which, when
	 * hovered, becomes highlighted and can be dragged along the perpendicular dimension
	 * to its direction.
	 *
	 * Features:
	 * - Touch event handling
	 * - Corner sash support
	 * - Hover with different mouse cursor support
	 * - Configurable hover size
	 * - Linked sash support, for 2x2 corner sashes
	 */
	declare class Sash extends Disposable {
		private el;
		private layoutProvider;
		private orientation;
		private size;
		private hoverDelay;
		private hoverDelayer;
		private _state;
		private readonly onDidEnablementChange;
		private readonly _onDidStart;
		private readonly _onDidChange;
		private readonly _onDidReset;
		private readonly _onDidEnd;
		private readonly orthogonalStartSashDisposables;
		private _orthogonalStartSash;
		private readonly orthogonalStartDragHandleDisposables;
		private _orthogonalStartDragHandle;
		private readonly orthogonalEndSashDisposables;
		private _orthogonalEndSash;
		private readonly orthogonalEndDragHandleDisposables;
		private _orthogonalEndDragHandle;
		get state(): SashState;
		get orthogonalStartSash(): Sash | undefined;
		get orthogonalEndSash(): Sash | undefined;
		/**
		 * The state of a sash defines whether it can be interacted with by the user
		 * as well as what mouse cursor to use, when hovered.
		 */
		set state(state: SashState);
		/**
		 * An event which fires whenever the user starts dragging this sash.
		 */
		readonly onDidStart: Event<ISashEvent>;
		/**
		 * An event which fires whenever the user moves the mouse while
		 * dragging this sash.
		 */
		readonly onDidChange: Event<ISashEvent>;
		/**
		 * An event which fires whenever the user double clicks this sash.
		 */
		readonly onDidReset: Event<void>;
		/**
		 * An event which fires whenever the user stops dragging this sash.
		 */
		readonly onDidEnd: Event<void>;
		/**
		 * A linked sash will be forwarded the same user interactions and events
		 * so it moves exactly the same way as this sash.
		 *
		 * Useful in 2x2 grids. Not meant for widespread usage.
		 */
		linkedSash: Sash | undefined;
		/**
		 * A reference to another sash, perpendicular to this one, which
		 * aligns at the start of this one. A corner sash will be created
		 * automatically at that location.
		 *
		 * The start of a horizontal sash is its left-most position.
		 * The start of a vertical sash is its top-most position.
		 */
		set orthogonalStartSash(sash: Sash | undefined);
		/**
		 * A reference to another sash, perpendicular to this one, which
		 * aligns at the end of this one. A corner sash will be created
		 * automatically at that location.
		 *
		 * The end of a horizontal sash is its right-most position.
		 * The end of a vertical sash is its bottom-most position.
		 */
		set orthogonalEndSash(sash: Sash | undefined);
		/**
		 * Create a new vertical sash.
		 *
		 * @param container A DOM node to append the sash to.
		 * @param verticalLayoutProvider A vertical layout provider.
		 * @param options The options.
		 */
		constructor(
			container: HTMLElement,
			verticalLayoutProvider: IVerticalSashLayoutProvider,
			options: IVerticalSashOptions
		);
		/**
		 * Create a new horizontal sash.
		 *
		 * @param container A DOM node to append the sash to.
		 * @param horizontalLayoutProvider A horizontal layout provider.
		 * @param options The options.
		 */
		constructor(
			container: HTMLElement,
			horizontalLayoutProvider: IHorizontalSashLayoutProvider,
			options: IHorizontalSashOptions
		);
		private onPointerStart;
		private onPointerDoublePress;
		private static onMouseEnter;
		private static onMouseLeave;
		/**
		 * Forcefully stop any user interactions with this sash.
		 * Useful when hiding a parent component, while the user is still
		 * interacting with the sash.
		 */
		clearSashHoverState(): void;
		/**
		 * Layout the sash. The sash will size and position itself
		 * based on its provided {@link ISashLayoutProvider layout provider}.
		 */
		layout(): void;
		private getOrthogonalSash;
		dispose(): void;
	}

	export {
		type IBoundarySashes,
		type IHorizontalSashLayoutProvider,
		type IHorizontalSashOptions,
		type ISashEvent,
		type ISashOptions,
		type IVerticalSashLayoutProvider,
		type IVerticalSashOptions,
		Orientation,
		OrthogonalEdge,
		Sash,
		SashState
	};
}
