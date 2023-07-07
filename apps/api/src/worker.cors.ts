export async function handleCorsRequest(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response()
  }
}

export async function handleCorsResponse(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', '*')
  response.headers.set('Access-Control-Allow-Headers', '*')
  response.headers.set('Access-Control-Max-Age', '86400')

  return response
}
