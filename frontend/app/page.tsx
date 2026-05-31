'use client'

import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${apiUrl}/health/test`)
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        marginTop: '4rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}>
            HealthOS
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#94a3b8',
            fontWeight: 300,
          }}>
            AI Health Intelligence System
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          <input
            type="text"
            placeholder="Describe your health concern..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            style={{
              flex: 1,
              padding: '1rem 1.25rem',
              borderRadius: '0.75rem',
              border: '1px solid #1e293b',
              background: '#1e293b',
              color: '#e2e8f0',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Processing...' : 'Send Query'}
          </button>
        </div>

        {loading && (
          <div style={{
            padding: '1.5rem',
            borderRadius: '0.75rem',
            background: '#1e293b',
            border: '1px solid #334155',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '1rem',
          }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>⏳</div>
            Connecting to HealthOS backend...
          </div>
        )}

        {error && (
          <div style={{
            padding: '1.5rem',
            borderRadius: '0.75rem',
            background: '#450a0a',
            border: '1px solid #dc2626',
            color: '#fca5a5',
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {response && (
          <div style={{
            padding: '1.5rem',
            borderRadius: '0.75rem',
            background: '#0f172a',
            border: '1px solid #334155',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              color: '#34d399',
              fontWeight: 600,
            }}>
              <span style={{ fontSize: '1.25rem' }}>✓</span>
              Backend Response
            </div>
            <pre style={{
              margin: 0,
              color: '#e2e8f0',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {response}
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}
