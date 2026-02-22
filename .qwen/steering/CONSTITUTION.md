# Steering Constitution: 3-Tier MVVM Architecture

## Overview

This project follows a **3-tier MVVM (Model-ViewModel-View)** architecture with clean code principles, modular design, and reusable functions. This constitution establishes the guidelines for all development.

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  (Views: Screens, Components, UI Elements)                   │
├─────────────────────────────────────────────────────────────┤
│                      BUSINESS LOGIC LAYER                    │
│  (ViewModels: State, Commands, Data Transformation)          │
├─────────────────────────────────────────────────────────────┤
│                         DATA LAYER                           │
│  (Models: Entities, Interfaces, Services, Repositories)      │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
src/
├── models/                    # Data Layer
│   ├── entities/              # Core data entities
│   ├── interfaces/            # TypeScript interfaces
│   └── dtos/                  # Data Transfer Objects
│
├── services/                  # Data Layer
│   ├── api/                   # API services
│   ├── storage/               # Local storage services
│   └── repositories/          # Data repositories
│
├── viewmodels/                # Business Logic Layer
│   ├── base/                  # Base ViewModel classes
│   └── features/              # Feature-specific ViewModels
│
├── views/                     # Presentation Layer
│   ├── screens/               # Full screen components
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Generic components
│   │   └── features/          # Feature-specific components
│   └── hooks/                 # React hooks for UI
│
└── core/                      # Cross-cutting concerns
    ├── navigation/            # Navigation configuration
    ├── theme/                 # Theme configuration
    └── utils/                 # Utility functions
```

---

## Layer Responsibilities

### 1. Model Layer (Data)

**Purpose**: Define data structures and handle data access.

**Principles**:
- Pure data objects with no UI logic
- Define interfaces for type safety
- Repositories abstract data sources

**Example**:

```typescript
// models/entities/memory.ts
export interface Memory {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

// models/interfaces/memory-repository.ts
export interface IMemoryRepository {
  getAll(): Promise<Memory[]>;
  getById(id: string): Promise<Memory | null>;
  create(memory: Memory): Promise<Memory>;
  update(memory: Memory): Promise<Memory>;
  delete(id: string): Promise<void>;
}

// services/repositories/memory-repository.ts
export class MemoryRepository implements IMemoryRepository {
  private storage: IStorageService;
  
  constructor(storage: IStorageService) {
    this.storage = storage;
  }
  
  async getAll(): Promise<Memory[]> {
    // Implementation
  }
  
  // Other methods...
}
```

---

### 2. ViewModel Layer (Business Logic)

**Purpose**: Handle business logic, state management, and data transformation for views.

**Principles**:
- No direct UI references
- Expose observable state
- Provide commands/actions for user interactions
- Dependency injection for services

**Example**:

```typescript
// viewmodels/base/base-viewmodel.ts
export abstract class BaseViewModel<TState> {
  protected stateListeners: ((state: TState) => void)[] = [];
  protected _state: TState;
  
  constructor(initialState: TState) {
    this._state = initialState;
  }
  
  get state(): TState {
    return this._state;
  }
  
  protected setState(newState: Partial<TState>): void {
    this._state = { ...this._state, ...newState };
    this.notifyStateChange();
  }
  
  subscribe(listener: (state: TState) => void): () => void {
    this.stateListeners.push(listener);
    return () => {
      this.stateListeners = this.stateListeners.filter(l => l !== listener);
    };
  }
  
  protected notifyStateChange(): void {
    this.stateListeners.forEach(listener => listener(this._state));
  }
  
  abstract dispose(): void;
}

// viewmodels/features/memory-viewmodel.ts
interface MemoryState {
  memories: Memory[];
  isLoading: boolean;
  error: string | null;
  selectedMemory: Memory | null;
}

export class MemoryViewModel extends BaseViewModel<MemoryState> {
  private repository: IMemoryRepository;
  
  constructor(repository: IMemoryRepository) {
    super({
      memories: [],
      isLoading: false,
      error: null,
      selectedMemory: null,
    });
    this.repository = repository;
  }
  
  async loadMemories(): Promise<void> {
    this.setState({ isLoading: true, error: null });
    try {
      const memories = await this.repository.getAll();
      this.setState({ memories, isLoading: false });
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  }
  
  async selectMemory(id: string): Promise<void> {
    const memory = await this.repository.getById(id);
    if (memory) {
      this.setState({ selectedMemory: memory });
    }
  }
  
  async createMemory(title: string, description: string): Promise<boolean> {
    const newMemory: Memory = {
      id: generateId(),
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
    };
    
    try {
      await this.repository.create(newMemory);
      await this.loadMemories();
      return true;
    } catch (error) {
      return false;
    }
  }
  
  dispose(): void {
    this.stateListeners = [];
  }
}
```

---

### 3. View Layer (Presentation)

**Purpose**: Display data and capture user interactions.

**Principles**:
- No business logic
- Bind to ViewModel state
- Delegate actions to ViewModel commands
- Reusable and modular components

**Example**:

```typescript
// views/components/common/button.tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  style 
}: ButtonProps): ReactElement {
  const colors = useThemeColor();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

// views/screens/memory-list-screen.tsx
export function MemoryListScreen(): ReactElement {
  const viewModel = useMemoryViewModel(); // Dependency injected
  const [state, setState] = useState<MemoryState>(viewModel.state);
  
  useEffect(() => {
    const unsubscribe = viewModel.subscribe(setState);
    viewModel.loadMemories();
    return unsubscribe;
  }, []);
  
  return (
    <ThemedView style={styles.container}>
      {state.isLoading ? (
        <LoadingIndicator />
      ) : state.error ? (
        <ErrorMessage message={state.error} onRetry={() => viewModel.loadMemories()} />
      ) : (
        <MemoryList 
          memories={state.memories}
          onSelect={(id) => viewModel.selectMemory(id)}
        />
      )}
      <Button 
        title="Add Memory" 
        onPress={() => navigation.navigate('CreateMemory')} 
      />
    </ThemedView>
  );
}
```

---

## Clean Code Principles

### 1. Modular Functions

- **Single Responsibility**: Each function does one thing well
- **Small Size**: Functions should be short (ideally < 20 lines)
- **Descriptive Names**: Function names should clearly describe intent

```typescript
// ❌ Bad: Multiple responsibilities
async function handleMemory() {
  // loading, fetching, error handling, navigation all in one
}

// ✅ Good: Separated concerns
async function fetchMemories(): Promise<Memory[]> { ... }
function handleLoading(isLoading: boolean): void { ... }
function handleError(error: Error): void { ... }
function navigateToMemory(id: string): void { ... }
```

### 2. Reusable Components

- **Composable**: Components should be composable building blocks
- **Configurable**: Use props for customization
- **Generic**: Avoid hard-coded values

```typescript
// ✅ Reusable generic list component
interface ListProps<T> {
  data: T[];
  renderItem: (item: T) => ReactElement;
  keyExtractor: (item: T) => string;
  emptyComponent?: ReactElement;
  loading?: boolean;
}

export function List<T>({ 
  data, 
  renderItem, 
  keyExtractor,
  emptyComponent,
  loading 
}: ListProps<T>): ReactElement { ... }
```

### 3. Dependency Injection

- **Constructor Injection**: Pass dependencies via constructor
- **Inversion of Control**: Depend on abstractions, not concretions
- **Testability**: Easy to mock dependencies

```typescript
// ✅ Constructor injection with interface
export class MemoryViewModel {
  constructor(
    private repository: IMemoryRepository,
    private navigator: INavigator,
    private logger: ILogger
  ) {}
}
```

### 4. Immutability

- **Never mutate state directly**: Always create new objects
- **Use spread operators**: For updating nested objects
- **Readonly types**: Mark interfaces as readonly where possible

```typescript
// ❌ Bad: Direct mutation
state.memories.push(newMemory);

// ✅ Good: Immutable update
setState({ 
  memories: [...state.memories, newMemory] 
});
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Models | `kebab-case.ts` | `memory-model.ts` |
| ViewModels | `kebab-case.viewmodel.ts` | `memory.viewmodel.ts` |
| Views | `kebab-case.view.tsx` | `memory-list.view.tsx` |
| Services | `kebab-case.service.ts` | `storage.service.ts` |
| Repositories | `kebab-case.repository.ts` | `memory.repository.ts` |
| Components | `PascalCase.tsx` | `MemoryCard.tsx` |
| Hooks | `usePascalCase.ts` | `useMemory.ts` |
| Utils | `kebab-case.ts` | `date-formatter.ts` |

---

## Example: Complete Feature Implementation

### Feature: Memory Detail Modal

```
┌─────────────────────────────────────────────────────────┐
│  View: MemoryDetailScreen                               │
│  - Binds to MemoryDetailViewModel                       │
│  - Displays memory data                                 │
│  - Handles user actions (edit, delete, share)           │
├─────────────────────────────────────────────────────────┤
│  ViewModel: MemoryDetailViewModel                       │
│  - Loads memory by ID                                   │
│  - Handles edit/delete actions                          │
│  - Manages loading/error states                         │
├─────────────────────────────────────────────────────────┤
│  Model: Memory                                          │
│  - Data entity                                          │
│  - Repository for data access                           │
└─────────────────────────────────────────────────────────┘
```

**Implementation Files**:
```
src/
├── models/entities/memory.ts
├── services/repositories/memory-repository.ts
├── viewmodels/features/memory-detail.viewmodel.ts
└── views/screens/memory-detail.screen.tsx
```

---

## Testing Guidelines

### Unit Tests (ViewModels)

```typescript
describe('MemoryViewModel', () => {
  let viewModel: MemoryViewModel;
  let mockRepository: MockMemoryRepository;
  
  beforeEach(() => {
    mockRepository = new MockMemoryRepository();
    viewModel = new MemoryViewModel(mockRepository);
  });
  
  it('should load memories successfully', async () => {
    await viewModel.loadMemories();
    expect(viewModel.state.memories.length).toBeGreaterThan(0);
    expect(viewModel.state.isLoading).toBe(false);
  });
  
  it('should handle load error', async () => {
    mockRepository.getAll = jest.fn().mockRejectedValue(new Error('Failed'));
    await viewModel.loadMemories();
    expect(viewModel.state.error).toBe('Failed');
  });
});
```

### Component Tests (Views)

```typescript
describe('MemoryListScreen', () => {
  it('should render loading state', () => {
    render(<MemoryListScreen />);
    expect(screen.getByTestId('loading')).toBeTruthy();
  });
  
  it('should render memories when loaded', async () => {
    render(<MemoryListScreen />);
    await waitFor(() => {
      expect(screen.getAllByTestId('memory-item')).toHaveLength(3);
    });
  });
});
```

---

## Quick Reference

### DO ✅
- Separate concerns across layers
- Use interfaces for dependencies
- Keep components small and focused
- Write pure functions where possible
- Handle errors at each layer
- Use meaningful names

### DON'T ❌
- Put business logic in views
- Import UI components in ViewModels
- Mutate state directly
- Create monolithic functions
- Ignore error handling
- Use vague names

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-22 | Initial constitution |

---

*This constitution serves as the guiding document for architecture decisions. All new features and refactoring should align with these principles.*
