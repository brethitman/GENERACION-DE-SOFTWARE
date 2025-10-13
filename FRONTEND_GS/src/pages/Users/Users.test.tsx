import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// 👇 Mockea el cliente API que usa tu Users.tsx
vi.mock('../../services/api', () => ({
  default: { get: vi.fn() },
}))
import api from '../../services/api'
import Users from './Users'

describe('<Users />', () => {
  afterEach(() => vi.clearAllMocks())

  test('carga y muestra usuarios', async () => {
    ;(api.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      // Ajusta al shape que use tu Users.tsx:
      // si hace: const { data } = await api.get(...); y data es un array
      data: [{ id: 1, nombre: 'Ana' }, { id: 2, nombre: 'Luis' }],
      // si fuera data.users: { data: { users: [...] } }
    })

    render(<Users />)

    expect(screen.getByText(/cargando/i)).toBeInTheDocument()
    expect(await screen.findByText('Ana')).toBeInTheDocument()
    expect(screen.getByText('Luis')).toBeInTheDocument()
  })
})
