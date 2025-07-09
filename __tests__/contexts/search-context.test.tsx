import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchProvider, useSearch } from '@/contexts/search-context'
import { FavoritesProvider } from '@/contexts/favorites-context'

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
        {
          title: 'JavaScript Guide',
          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          description: 'Complete JavaScript reference',
          tags: ['javascript', 'reference'],
        },
      ],
    },
    {
      title: 'Developer Tools',
      links: [
        {
          title: 'Visual Studio Code',
          href: 'https://code.visualstudio.com/',
          description: 'Popular code editor',
          tags: ['editor', 'tool'],
        },
      ],
    },
  ],
}))

// Mock the filter hook
jest.mock('@/hooks/useFilter', () => ({
  useFilter: () => ({
    selectedTags: [],
    toggleTag: jest.fn(),
    isTagSelected: jest.fn(),
    clearAllTags: jest.fn(),
    hasSelectedTags: false,
    selectedTagCount: 0,
    filterResourcesByTags: jest.fn((resources) => resources),
  }),
}))

// Test component to access the search context
const TestComponent = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    clearSearch,
    currentCategory,
    setCurrentCategory 
  } = useSearch()

  return (
    <div>
      <input 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        data-testid="search-input"
      />
      <button onClick={clearSearch} data-testid="clear-button">
        Clear
      </button>
      <div data-testid="search-query">{searchQuery}</div>
      <div data-testid="results-count">{searchResults.length}</div>
      <div data-testid="current-category">{currentCategory || 'none'}</div>
      <button 
        onClick={() => setCurrentCategory('Learning Resources')}
        data-testid="set-category-button"
      >
        Set Category
      </button>
      <div data-testid="results">
        {searchResults.map((result, index) => (
          <div key={index} data-testid={`result-${index}`}>
            {result.title}
          </div>
        ))}
      </div>
    </div>
  )
}

// Wrapper component with all providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>
    <SearchProvider>
      {children}
    </SearchProvider>
  </FavoritesProvider>
)

describe('SearchProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with empty search query', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )
    
    expect(screen.getByTestId('search-query')).toHaveTextContent('')
    expect(screen.getByTestId('results-count')).toHaveTextContent('0')
  })

  it('should update search query when input changes', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )
    
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'react' } })
    
    expect(screen.getByTestId('search-query')).toHaveTextContent('react')
  })

  it('should return search results when searching', async () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )
    
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'react' } })
    
    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('1')
      expect(screen.getByTestId('result-0')).toHaveTextContent('React Tutorial')
    })
  })

  it('should clear search when clearSearch is called', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )
    
    const input = screen.getByTestId('search-input')
    const clearButton = screen.getByTestId('clear-button')
    
    fireEvent.change(input, { target: { value: 'react' } })
    expect(screen.getByTestId('search-query')).toHaveTextContent('react')
    
    fireEvent.click(clearButton)
    expect(screen.getByTestId('search-query')).toHaveTextContent('')
  })

  it('should set and get current category', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )
    
    expect(screen.getByTestId('current-category')).toHaveTextContent('none')
    
    const setCategoryButton = screen.getByTestId('set-category-button')
    fireEvent.click(setCategoryButton)
    
    expect(screen.getByTestId('current-category')).toHaveTextContent('Learning Resources')
  })

  it('should search across title, description, and section', async () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )
    
    const input = screen.getByTestId('search-input')
    
    // Search by title
    fireEvent.change(input, { target: { value: 'React Tutorial' } })
    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('1')
    })
    
    // Search by description
    fireEvent.change(input, { target: { value: 'reference' } })
    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('1')
    })
    
    // Search by section
    fireEvent.change(input, { target: { value: 'Learning Resources' } })
    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('2')
    })
  })

  it('should handle empty search results', async () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    )
    
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'nonexistent' } })
    
    await waitFor(() => {
      expect(screen.getByTestId('results-count')).toHaveTextContent('0')
    })
  })

  it('should throw error when used outside provider', () => {
    const TestComponentWithoutProvider = () => {
      useSearch()
      return null
    }

    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      render(<TestComponentWithoutProvider />)
    }).toThrow('useSearch must be used within a SearchProvider')

    console.error = originalError
  })
})