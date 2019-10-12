import { initStore } from './hookStore'

const configureStore = () => {
	const actions = {
		PICK_DISC: curState => {
			return { towers }
		}
	}

	initStore()
}

export default configureStore;