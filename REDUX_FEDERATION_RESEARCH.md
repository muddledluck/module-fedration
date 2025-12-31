# Redux Federation Research

This document outlines the research and strategies for sharing a Redux store between a Host application (React 17) and a Remote application (React 18) in Module Federation.

## Attempt 1: Props Injection (Reverted)

We initially implemented a strategy where the Host explicitly passes its Redux `store` instance as a prop to every Remote component.

**Implementation Details:**
-   **Host**: `<RemoteCounter store={store} />`
-   **Remote**: Component accepts `store` prop and uses it in a `<Provider>`.

**Verdict**:
While functional, this approach was rejected due to "prop drilling" concerns. It requires every single Remote component to accept a `store` prop, which leads to repetition and tighter coupling in the consumption layer.

---

## Alternative Strategies

Below are the recommended alternatives that avoid explicit prop drilling.

### Option 1: The "Store Registry" Pattern (Recommended)

Instead of passing the store down the component tree, the Host exposes a "Registry" module. The Host registers the store once at startup. The Remote imports this registry to grab the store.

**Mechanism:**
1.  Host exposes a `./storeRegistry` file.
2.  Host `src/index.js` imports it and calls `setStore(store)`.
3.  Remote components import `import { getStore } from 'host/storeRegistry'`.
4.  Remote wraps itself in `<Provider store={getStore()}>`.

**Pros:**
*   **Zero Prop Drilling**: You don't pass `store={store}` ever.
*   **Clean Usage**: Remote components look like normal imports.

**Cons:**
*   **Tight Coupling**: Remote cannot run standalone easily without mocking the Host.
*   **Async Timing**: Remote must wait for Host to initialize the store (usually fine in MF).

### Option 2: Global Window Namespace (Easiest)

Attach the store to the `window` object. This is "old school" but effective for simple interop.

**Mechanism:**
1.  Host: `window.hostStore = store;` inside `bootstrap.js`.
2.  Remote: `const store = window.hostStore || localStore;`

**Pros:**
*   Extremely simple to implement.
*   No Webpack federation config changes needed for the registry.

**Cons:**
*   **Pollution**: Adds variables to the global scope.
*   **Type Safety**: TypeScript hates `window.any`.
*   **Fragile**: If multiple micro-frontends try to do this, they might clash.

### Option 3: Custom Event Bus (Decoupled)

Instead of sharing the *Store Instance* (which couples the redux logic), you strictly share *Events*. The Host and Remote maintain separate stores but sync them via events.

**Mechanism:**
1.  Host subscribes to its store. On change, it dispatches a `CustomEvent` ('HOST_STATE_CHANGE').
2.  Remote listens for 'HOST_STATE_CHANGE' and dispatches a local action to update its data.
3.  Remote dispatches events ('REMOTE_ACTION') that the Host listens to.

**Pros:**
*   **Framework Agnostic**: Works even if one app is Angular or Vue.
*   **Total Decoupling**: Differing Redux versions/middlewares don't crash each other.

**Cons:**
*   **High Complexity**: You write a lot of "glue" code to sync states.
*   **Performance**: duplicating state in memory twice.

### Summary Comparison

| Strategy | Prop Drilling | Store Registry | Window Object | Event Bus |
| :--- | :--- | :--- | :--- | :--- |
| **Ease of Setup** | Moderate | Moderate | High | Low |
| **Decoupling** | Low | Low | Low | High |
| **Type Safety** | High | High | Low | Moderate |
| **Best For** | Specific Components | extensive Sharing | Quick Hacks | Large/Mixed Tech Stacks |

---

## TypeScript Strategy: Consuming JS Host in TS Remote

A common challenge in Module Federation is mismatched languages: The Host is JavaScript (untyped), but the Remote is TypeScript.

**Q: How does the Remote know the types of the Host's Redux store?**<br>
**A: The Host cannot export types because it is JavaScript. The Remote must "reverse engineer" or contractually define the types locally.**

### Step-by-Step Solution

Since you cannot import `RootState` from a JS file, you must define the shape of the Host's state manually in the Remote application.

1.  **Create a Type Declaration**: In the Remote app, create a file (e.g., `src/declarations.d.ts` or `src/hostMap.ts`) to define the expected Host state.

```typescript
// remote/src/hostTypes.ts

// Define the shape of the part of the Host store you care about
export interface HostState {
  count: number;
  user?: {
    name: string;
    id: number;
  };
}

// Define the detailed actions if you plan to dispatch them from Remote
export type HostActions =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' };
```

2.  **Combine with Local State**: Use union types or intersection types in your components to handle both states.

```typescript
import { HostState } from './hostTypes';
import { RootState as RemoteState } from './store';

// Combined state for useSelector
type GlobalState = RemoteState & { host: HostState } | any; // 'any' fallback is often needed for dynamic federation
```

3.  **Use it in Components**:

```typescript
const count = useSelector((state: GlobalState) => {
    // Safely access potentially missing host state
    return state.count ?? state.counter?.value ?? 0;
});
```

**Conclusion**: You DO NOT (and cannot) pass the `RootState` type from the JS Host. You must recreate the interface in the Remote application based on what you know about the Host's implementation.
