import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, test, expect, afterEach } from 'vitest'

vi.mock('axios', () => ({ default: { post: vi.fn() } }))
import axios from 'axios'
import Login from './Login'

describe('<Login />', () => {
  test('renderiza el título', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  test('muestra campos y permite iniciar sesión', async () => {
    ;(axios.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { token: 'TOKEN_FAKE' },
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'a@a.com' } })
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'goodpass' } })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('TOKEN_FAKE')
    })
  })

  test('muestra error si el backend responde 401', async () => {
    ;(axios.post as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
      response: { status: 401, data: { message: 'Credenciales inválidas' } },
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'a@a.com' } })
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'bad' } })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(await screen.findByText(/no se pudo iniciar sesión/i)).toBeInTheDocument()
  })
})
