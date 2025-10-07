import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// 🔧 Usa la MISMA ruta que tu Home.tsx usa para importar el hook
vi.mock('../../hooks/useAuth', () => ({ useAuth: vi.fn() }))

import * as useAuthModule from '../../hooks/useAuth'
import Home from './Home'

describe('<Home />', () => {
  afterEach(() => vi.clearAllMocks())

  test('muestra mensaje para no autenticados', () => {
    const mockedUseAuth = useAuthModule.useAuth as unknown as ReturnType<typeof vi.fn>
    mockedUseAuth.mockReturnValue({ estaAutenticado: false, usuario: null })

    render(<Home />)

    expect(screen.getByRole('heading', { name: /inicio/i })).toBeInTheDocument()
    expect(screen.getByText(/inicia sesión para acceder a tu cuenta/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /bienvenido a la plataforma/i })).toBeInTheDocument()
    expect(screen.queryByText(/rol:/i)).not.toBeInTheDocument()
  })

  test('muestra perfil y tarjetas cuando está autenticado', () => {
    const mockedUseAuth = useAuthModule.useAuth as unknown as ReturnType<typeof vi.fn>
    mockedUseAuth.mockReturnValue({
      estaAutenticado: true,
      usuario: { nombre: 'María Pérez', rol: 'docente' },
    })

    render(<Home />)

    expect(screen.getByText(/bienvenido a tu panel principal/i)).toBeInTheDocument()
    expect(screen.getByText('María Pérez')).toBeInTheDocument()
    expect(screen.getByText(/rol:\s*docente/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /resumen general/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /actividades/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /noticias/i })).toBeInTheDocument()
  })
})
