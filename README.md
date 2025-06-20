# Pokédex App

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)

![PokeAPI](https://img.shields.io/badge/PokeAPI-EF5350?style=for-the-badge)

A Pokémon encyclopedia built with Ionic + Angular using the PokeAPI to list Pokémon and display their details.

## 🚀 Technical Implementation

### 🧩 Architecture
- **Standalone components** approach (no NgModules)
- Feature-based organization
- Reactive programming with RxJS Observables
- Strict typing with dedicated interfaces

### 🛠 Core Features
- Paginated Pokémon listing with dynamic loading
- Detailed view with multiple Pokémon attributes
- Responsive design (mobile-first with desktop adaptations)
- Clean navigation with Angular Router
- State management for favorites (in progress)
- Proper subscription cleanup with OnDestroy

### ⚠️ Why OnDestroy Matters
    1. Memory Leak Prevention
        - Active Observable subscriptions maintain component references in memory
        - Without cleanup, Angular cannot garbage-collect destroyed components
    2. Performance Optimization
        - Stops unnecessary background operations after component destruction
        - Prevents duplicate subscriptions when components reinitialize
    3. Data Integrity
        - Avoids "update-after-destroy" errors when components try to modify non-existent DOM elements
        - Eliminates "Cannot read property of undefined" runtime errors
    4. Reactive Best Practices
        - The takeUntil(this.destroy$) pattern is the Angular/RxJS gold standard
        - More scalable than manual subscription tracking    

### ✅ Completed Features
| Feature | Status |
|---------|--------|
| Main screen with Pokémon list | ✅ |
| Responsive grid layout | ✅ |
| Detail navigation (`/details/:name`) | ✅ |
| Detail view with 6+ attributes | ✅ |
| Clean commit history | ✅ |
| Pagination (offset/limit) | ✅ |
| Dependency injection | ✅ |
| Strict typing | ✅ |
| Favorite persistence | ✅ |

### 🟡 Improvements Needed
- Desktop responsiveness refinements
- Additional media in documentation
- Unit test coverage
- Technical documentation
- Webhook integrations
