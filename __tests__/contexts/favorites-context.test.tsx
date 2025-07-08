import { render, screen, fireEvent, act } from '@testing-library/react'
import { FavoritesProvider, useFavorites } from '@/contexts/favorites-context'
import type { Resource } from '@/contexts/favorites-context'

// Mock the sections data
jest.mock('@/constants/sections', () => ({
  SECTIONS: [
    {
      title: 'Learning Resources',
      links: [
        {
          title: 'React Tutorial',
          href: 'https://react.dev',
          description: 'Learn React fundamentals',
          tags: ['react', 'tutorial'],
        },
      ],
    },
  ],
}))

// Mock the resource mappings
jest.mock('@/lib/data/resource-mappings', () => ({
  getResourceIcon: jest.fn(() => 'simple-icons:react'),
}))

// Test component to access the favorites context
const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite, clearFavorites, isLoading } = useFavorites()

  const testResource: Resource = {
    title: 'React Tutorial',
    href: 'https://react.dev',
    description: 'Learn React fundamentals',
    section: 'Learning Resources',
  }

  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <div data-testid="is-favorite">{isFavorite('https://react.dev') ? 'true' : 'false'}</div>
      <button onClick={() => addFavorite(testResource)} data-testid="add-favorite">
        Add Favorite
      </button>
      <button onClick={() => removeFavorite('https://react.dev')} data-testid="remove-favorite">
        Remove Favorite
      </button>
      <button onClick={clearFavorites} data-testid="clear-favorites">
        Clear Favorites
      </button>
      <div data-testid="favorites-list">
        {favorites.map((fav, index) => (
          <div key={index} data-testid={`favorite-${index}`}>
            {fav.title}
          </div>
        ))}
      </div>
    </div>
  )
}

describe('FavoritesProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('should initialize with empty favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false')
  })

  it('should add a favorite', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    const addButton = screen.getByTestId('add-favorite')
    
    act(() => {
      fireEvent.click(addButton)
    })

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('true')
    expect(screen.getByTestId('favorite-0')).toHaveTextContent('React Tutorial')
  })

  it('should remove a favorite', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    const addButton = screen.getByTestId('add-favorite')
    const removeButton = screen.getByTestId('remove-favorite')
    
    act(() => {
      fireEvent.click(addButton)
    })

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    
    act(() => {
      fireEvent.click(removeButton)
    })

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false')
  })

  it('should clear all favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    const addButton = screen.getByTestId('add-favorite')
    const clearButton = screen.getByTestId('clear-favorites')
    
    act(() => {
      fireEvent.click(addButton)
    })

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
    
    act(() => {
      fireEvent.click(clearButton)
    })

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0')
  })

  it('should not add duplicate favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    )

    const addButton = screen.getByTestId('add-favorite')
    
    act(() => {
      fireEvent.click(addButton)
      fireEvent.click(addButton)
    })

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')
  })

  it('should throw error when used outside provider', () => {
    const TestComponentWithoutProvider = () => {
      useFavorites()
      return null
    }

    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      render(<TestComponentWithoutProvider />)
    }).toThrow('useFavorites must be used within a FavoritesProvider')

    console.error = originalError
  })
})