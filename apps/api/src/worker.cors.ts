import type { Env } from './worker.env'

export async function handleCorsRequest(request: Request) {
	if (request.method === 'OPTIONS') {
		return new Response()
	}
}

export async function handleCorsResponse(response: Response, { env }: { env: Env }) {
	response.headers.set('Access-Control-Allow-Origin', env.WEB_URL)
	response.headers.set('Access-Control-Allow-Methods', '*')
	response.headers.set('Access-Control-Allow-Headers', '*')
	response.headers.set('Access-Control-Max-Age', '86400')

	return response
}
