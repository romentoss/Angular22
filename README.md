# Angular22 - Dog Breed Explorer

Una aplicacion Angular 22 que demuestra las **novedades de Angular 22**: **OnPush por defecto**, **Signal Forms**, **Signals + Zoneless**, **Reactive Forms**, **Http Interceptors** y peticiones a una API externa.

## Novedades de Angular 22

### 1. OnPush como estrategia por defecto

En Angular 22, los nuevos componentes usan `OnPush` como estrategia de detección de cambios por defecto. Esto significa que Angular solo verifica el componente cuando:
- Una señal marcada con `signal()` cambia
- Un input `@Input()` cambia
- Se dispara un evento en el componente
- Se llama `markForCheck()` manualmente

**Ventajas:**
- Mejor rendimiento (~50% menos verificaciones)
- Bundle más pequeño
- Ideal para aplicaciones grandes

```typescript
@Component({
  selector: 'app-dog-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // Ahora es el DEFAULT
  // ...
})
```

### 2. Signal Forms (Model Signals)

Angular 22 estabiliza **Signal Forms**, permitiendo crear formularios reactivos con estado en signals:

```typescript
// ANTES (Reactive Forms tradicional)
searchForm = this.fb.group({
  breed: ['', Validators.required],
});

// AHORA (Signal Forms - Angular 22)
breedControl = model.required<string>();
searchForm = new FormGroup({
  breed: this.breedControl,
});
```

El `model()` signal permite bindeo bidireccional con `[(ngModel)]` o `[(formControl)]` de forma reactiva.

### 3. Recursos Asíncronos (Async Resources)

Angular 22 introduce `resource()` para manejar datos asíncronos de forma declarativa con signals:

```typescript
// recurso() - API reactiva para datos asíncronos
breedResource = resource({
  request: () => this.selectedBreedName(),
  loader: async ({ request: name }) => {
    return this.dogService.getBreedByName(name);
  },
});

// Usar en template
@if (breedResource.isLoading()) {
  <p>Cargando...</p>
}
@if (breedResource.value(); as breed) {
  <p>{{ breed.name }}</p>
}
```

### 4. SSR e Hidratación Mejorados

Angular 22 mejora el Server-Side Rendering con:
- **Hidratación incremental** - menos JavaScript en el cliente
- **Defer blocks** mejorados para cargar contenido bajo demanda
- **View Transitions** nativas para transiciones de página

### 5. Herramientas de IA y Depuración

Angular 22 incluye:
- **Angular DevTools** actualizado con soporte para signals
- **Debugging mejorado** para tracking de cambios en signals
- ** mejores errores** con información contextual de signals

## Tecnologias

- Angular 22 (standalone components, OnPush por defecto)
- Signal Forms (model signals para formularios)
- Signals + Zoneless (sin Zone.js)
- Recursos asíncronos (resource())
- Reactive Forms
- HttpInterceptor para autenticacion API
- Vitest para testing
- API de [api-ninjas.com](https://api-ninjas.com/api) para datos de perros

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   └── dog-search/
│   │       ├── dog-search.component.ts     # OnPush + Signal Forms
│   │       └── dog-search.component.spec.ts # Tests
│   ├── interceptors/
│   │   └── api-ninja.interceptor.ts      # Añade API key automaticamente
│   ├── services/
│   │   ├── dog.service.ts               # Servicio con API calls
│   │   └── dog.service.spec.ts          # Tests del servicio
│   ├── app.config.ts                  # Zoneless + providers
│   └── app.ts                         # Componente raiz
├── environments/
│   └── environment.ts                  # Generado desde .env (IGNORADO por git)
├── test-setup.ts                      # Setup de Vitest
└── vitest.config.ts                   # Configuracion de tests

.env                                   # Tu API key (NO se sube a GitHub)
.env.example                          # Plantilla segura para copiar
vitest.config.ts                       # Configuracion de Vitest
```

## Configuracion

### 1. Obtener API Key

1. Ve a [api-ninjas.com](https://api-ninjas.com/api)
2. Registrate gratis
3. Copia tu API key

### 2. Instalar y configurar

```bash
# Clonar repo
npm install

# Crear archivo .env con tu API key
cp .env.example .env
# Edita .env y cambia your_api_key_here por tu key real

# Generar environment.ts desde .env
node scripts/generate-env.js

# Correr la app
npm start
```

Abre [http://localhost:4200](http://localhost:4200)

## Scripts Disponibles

```bash
npm start          # Correr la app en desarrollo
npm run build     # Build de produccion
npm test           # Correr tests una vez
npm run test:watch # Tests en modo watch
```

## Testing con Vitest

### Archivos de tests

- `src/app/services/dog.service.spec.ts` - Tests del servicio (3 tests)
- `src/app/components/dog-search/dog-search.component.spec.ts` - Tests del componente (8 tests)

### Ejemplo de test con Signals y OnPush

```typescript
import { signal, computed } from '@angular/core';
import { describe, it, expect } from 'vitest';

it('should update loading state with signal', () => {
  const loading = signal(false);

  loading.set(true);
  expect(loading()).toBe(true);

  loading.set(false);
  expect(loading()).toBe(false);
});

it('should work with computed signals', () => {
  const count = signal(5);
  const doubled = computed(() => count() * 2);

  expect(doubled()).toBe(10);
});
```

### Correr tests

```bash
npm test        # Una vez
npm run test:watch  # Modo watch (se re-ejecutan al guardar)
```

## Conceptos Clave Demonstrados

### 1. OnPush + Standalone Components

Los componentes usan OnPush por defecto - solo se actualizan cuando cambian las signals o inputs:

```typescript
@Component({
  selector: 'app-dog-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // DEFAULT en Angular 22
  imports: [CommonModule, ReactiveFormsModule],
  template: `...`
})
export class DogSearchComponent {}
```

### 2. Signal Forms (Model Signals)

Formularios reactivos con estado en signals:

```typescript
// Model signal para formulario
breedControl = model.required<string>();

// FormGroup con el model signal
searchForm = new FormGroup({
  breed: this.breedControl,
});
```

### 3. Signals + Zoneless

Sin Zone.js, Angular detecta cambios via Signals:

```typescript
// Estado reactivo
loading = signal(false);

// Modificar
loading.set(true);

// Leer (como funcion)
loading(); // false
```

### 4. HttpInterceptor

Centraliza la autenticacion - anyade API key automaticamente:

```typescript
export const apiNinjaInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    setHeaders: { 'X-Api-Key': environment.apiNinjasKey }
  });
  return next(clonedReq);
};
```

### 5. Recursos Asíncronos (Angular 22)

API declarativa para datos asíncronos:

```typescript
breedResource = resource({
  request: () => this.selectedBreedName(),
  loader: async ({ request: name }) => {
    return this.dogService.getBreedByName(name);
  },
});
```

## Build

```bash
npm run build
```

Los archivos compilados estaran en `dist/`.

## Importante

- **NUNCA** subas el archivo `.env` a GitHub - ya esta ignorado en `.gitignore`
- El archivo `.env.example` es seguro subirlo (contiene solo `your_api_key_here`)
- El archivo `src/environments/environment.ts` se genera automaticamente y esta ignorado
- Cualquier persona que clone el repo debe:
  1. Copiar `.env.example` a `.env`
  2. Poner su propia API key
  3. Correr `node scripts/generate-env.js`
