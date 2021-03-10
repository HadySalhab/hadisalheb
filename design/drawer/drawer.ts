interface DrawerState {
	isOpened: boolean;
	isClosing: boolean;
	isAnimating: boolean;
	isOpening: boolean;
}
export default class Drawer {
	state: DrawerState;
	drawerToggler: HTMLElement;
	drawer: HTMLElement;
	scrim: HTMLElement;

	constructor() {
		this.drawerToggler = document.querySelector("#drawer-toggler");
		this.drawer = document.querySelector(".drawer");
		this.scrim = document.querySelector(".drawer__scrim");
		this.setState({
			isOpened: false,
			isClosing: false,
			isAnimating: false,
			isOpening: false,
		});
		this.registerListeners();
	}

	private setState(newState: Partial<DrawerState>): void {
		this.state = {
			...this.state,
			...newState,
		};
	}
	private registerListeners() {
		this.scrim.addEventListener("click", () => {
			this.closeDrawer();
		});
		this.drawerToggler.addEventListener("click", (e) => {
			if (
				this.state.isAnimating ||
				this.state.isClosing ||
				this.state.isOpening
			) {
				return;
			}
			if (this.state.isOpened) {
				this.closeDrawer();
			} else {
				this.openDrawer();
			}
		});
		this.drawer.addEventListener("transitionend", () => {
			if (this.state.isClosing) {
				this.setState({
					isOpened: false,
					isClosing: false,
				});
				this.drawer.classList.remove("drawer--opened", "drawer--closing");
			} else if (this.state.isOpening) {
				this.setState({
					isOpened: true,
					isOpening: false,
					isAnimating: false,
				});
				this.drawer.classList.remove("drawer--opening");
				this.drawer.classList.remove("drawer--animate");
			}
		});
	}

	private closeDrawer() {
		this.drawer.classList.add("drawer--closing");
		this.setState({
			isClosing: true,
		});
	}
	private openDrawer() {
		this.setState({
			isAnimating: true,
			isOpening: true,
		});
		this.drawer.classList.add("drawer--opened", "drawer--animate");
		setTimeout(() => {
			this.drawer.classList.add("drawer--opening");
		});
	}
}
