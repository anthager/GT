export const dbName = getDBName()
export const dbUser = getDBUser()
export const dbPassword = process.env.PGPASSWORD
export const secretKey = process.env.SECRETKEY || 'secretKey'

function getDBName(): string {
	switch (process.env.NODE_ENV) {
		case 'test': {
			return 'gursch_test'
		}
		case 'dev': {
			return 'gursch'
		}
		case 'production': {
			return process.env.PGDB as string
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
		case 'production': {
			return process.env.PGUSER as string
		}
	}
	return ''
}
