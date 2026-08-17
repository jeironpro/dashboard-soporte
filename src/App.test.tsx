import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('muestra el título principal del dashboard', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: 'Espacio de trabajo para tu equipo de soporte',
      }),
    ).toBeInTheDocument()
  })
})