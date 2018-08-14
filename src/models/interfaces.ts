export interface Player {
	uid: number
	name: string
	password: string
}

export interface Game {
	uid: number
	player1: Player
	player2: Player
}

export interface Requirement {
	name: string
	type: string
}
