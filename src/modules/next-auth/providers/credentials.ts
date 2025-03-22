// Mock next-auth credentials provider
interface CredentialsConfig {
  id?: string
  name: string
  credentials: Record<string, any>
  authorize: (credentials: Record<string, any>) => Promise<any>
}

export default function Credentials(options: CredentialsConfig) {
  return {
    id: options.id || 'credentials',
    name: options.name,
    type: 'credentials',
    credentials: options.credentials,
    authorize: options.authorize
  }
}