export const dbName = getDBName()
export const dbUser = getDBUser()

function getDBName(): string {
	switch (process.env.NODE_ENV) {
		case 'test': {
			return 'gursch_test'
		}
		case 'dev': {
			return 'gursch'
		}
	}
	return ''
}

function getDBUser(): string {
	switch (process.env.NODE_ENV) {
		case 'test': {
			return 'antonhagermalm'
		}
		case 'dev': {
			return 'antonhagermalm'
		}
	}
	return ''
}
