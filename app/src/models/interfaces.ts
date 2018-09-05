export interface Player {
	id: number
	name: string
	password: string
}

export interface Game {
	id: number
	player1: Player
	player2: Player
}

export interface Requirement {
	name: string
	type: string
}

export function isPlayer(player: Player | null): player is Player {
	return (
		!!(<Player>player).id &&
		typeof (<Player>player).id === 'number' &&
		!!(<Player>player).name &&
		typeof (<Player>player).name === 'string' &&
		!!(<Player>player).name.length &&
		(<Player>player).password !== undefined &&
		typeof (<Player>player).password === 'string'
	)
}
