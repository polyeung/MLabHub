import React, { useContext, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import usePrevious from 'hooks/usePrevious';

let nextId = 0;
function genId() {
	return nextId++;
}

interface AlertInfo {
	severity: 'error' | 'info' | 'success' | 'warning';
	message: string;
}

interface NotifInfo extends AlertInfo {
	id: number;
}

function Notifications({ notifs, onClose }: { notifs: NotifInfo[]; onClose: (id: number) => void }) {
	const [addedSet, setAddedSet] = useState<Set<number>>(new Set());
	const [deletingSet, setDeletingSet] = useState<Set<number>>(new Set());
	const prevNotifs = usePrevious(notifs);
	const timeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());

	function handleOnClose(id: number) {
		clearTimeout(timeouts.current.get(id));
		timeouts.current.delete(id);
		setDeletingSet(deletingSet => {
			const newSet = new Set(deletingSet);
			newSet.add(id);
			return newSet;
		});
		setTimeout(() => {
			onClose(id);
			setDeletingSet(deletingSet => {
				const newSet = new Set(deletingSet);
				newSet.delete(id);
				return newSet;
			});
		}, 200);
	}

	useEffect(() => {
		// check for new element
		const prevIds = new Set();
		prevNotifs?.forEach(notif => prevIds.add(notif.id));
		for (let i = 0; i < notifs.length; i++) {
			const currNotif = notifs[notifs.length - i - 1];

			if (!prevIds.has(currNotif.id)) {
				// slide up from bottom
				requestAnimationFrame(() => {
					setAddedSet(addingSet => {
						const newSet = new Set(addingSet);
						newSet.add(currNotif.id);
						return newSet;
					});
				});

				// set timer for alert to close on its own
				timeouts.current.set(
					currNotif.id,
					setTimeout(() => handleOnClose(currNotif.id), 5000),
				);
			}
		}
	}, [notifs]);

	return (
		<>
			{notifs.map((notif, idx) => (
				<Alert
					ref={React.createRef()}
					key={notif.id}
					severity={notif.severity}
					onClose={() => handleOnClose(notif.id)}
					sx={{
						position: 'fixed',
						left: '50%',
						transform: 'translate(-50%, 0)',
						bottom: !addedSet.has(notif.id) ? 32 - 90 : 32 + 90 * (notifs.length - idx - 1),
						opacity: deletingSet.has(notif.id) ? 0 : 1,
						transition: !addedSet.has(notif.id)
							? ''
							: deletingSet.has(notif.id)
							? 'opacity 200ms'
							: 'bottom 400ms',
					}}
				>
					<AlertTitle style={{ fontWeight: 'bolder' }}>
						{notif.severity.charAt(0).toUpperCase() + notif.severity.slice(1)}
					</AlertTitle>
					{notif.message}
				</Alert>
			))}
		</>
	);
}

interface NotifContextState {
	notifs: NotifInfo[];
}

type NotifReducerAction = { type: 'Add'; alert: AlertInfo } | { type: 'Remove'; id: number };

function notifReducer(state: NotifContextState, action: NotifReducerAction): NotifContextState {
	switch (action.type) {
		case 'Add':
			return { notifs: [...state.notifs, { ...action.alert, id: genId() }] };
		case 'Remove':
			return { notifs: state.notifs.filter(e => e.id !== action.id) };
		default:
			return state;
	}
}

interface NotifContextValue {
	state: NotifContextState;
	addNotif: (alert: AlertInfo) => void;
	removeNotif: (id: number) => void;
}

const NotifContext = React.createContext<NotifContextValue>(undefined!);

export function NotifProvider(props: React.PropsWithChildren<{}>) {
	const [state, dispatch] = useReducer(notifReducer, { notifs: [] });

	function addNotif(alert: AlertInfo) {
		dispatch({ type: 'Add', alert });
	}

	function removeNotif(id: number) {
		dispatch({ type: 'Remove', id });
	}

	const ctxValue = { state, addNotif, removeNotif };

	return (
		<NotifContext.Provider value={ctxValue}>
			{props.children}
			<Notifications notifs={state.notifs} onClose={id => removeNotif(id)} />
		</NotifContext.Provider>
	);
}

export function useNotifs() {
	const context = useContext(NotifContext);
	if (context === undefined) {
		throw new Error('useNotifs must be used within a NotifProvider');
	}
	return context;
}
