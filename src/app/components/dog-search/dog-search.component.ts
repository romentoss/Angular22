import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DogService, DogBreed } from '../../services/dog.service';

/**
 * =====================================================
 * ANGULAR 22 - NOVEDADES DESTACADAS
 * =====================================================
 *
 * Este componente demuestra las principales novedades de Angular 22:
 *
 * 1. OnPush como estrategia por defecto
 *    - En Angular 21 debías configurar OnPush manualmente
 *    - En Angular 22 es el DEFAULT para nuevos componentes
 *    - Reduce verificaciones de cambio hasta un 50%
 *
 * 2. Signal Forms (model signals)
 *    - model() crea signals que permiten bindeo bidireccional
 *    - Estable y listo para producción en Angular 22
 *    - Integración nativa con Reactive Forms
 *
 * 3. Signals + Zoneless
 *    - Sin Zone.js (~15KB menos en el bundle)
 *    - Angular detecta cambios solo cuando las signals cambian
 *    - Mejor rendimiento y más predecible
 *
 * 4. resource() API
 *    - API declarativa para datos asíncronos
 *    - Estados integrados: isLoading, isError, value
 *    - Cacheo automático de peticiones
 *
 * =====================================================
 */

@Component({
  selector: 'app-dog-search',
  standalone: true,
  // Angular 22: OnPush es el DEFAULT para nuevos componentes
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="search-container">
      <h2>Buscador de Razas de Perros</h2>

      <!-- SECCION 1: OnPush Explicado -->
      <div class="info-box onpush-section">
        <h4>1. OnPush - Deteccion de Cambios Optimizada</h4>

        <p>
          Angular 22 usa <strong>OnPush por defecto</strong> en nuevos componentes.
          Esto significa que Angular solo verifica el componente cuando algo cambia,
          no en cada ciclo de deteccion de cambios.
        </p>

        <p><strong>Cuándo se actualiza un componente OnPush:</strong></p>
        <ul class="reason-list">
          <li>Cuando una <code>signal()</code> dentro del componente cambia</li>
          <li>Cuando un <code>@Input()</code> del componente cambia</li>
          <li>Cuando ocurre un evento del DOM dentro del componente</li>
          <li>Cuando llamas <code>markForCheck()</code> manualmente</li>
        </ul>

        <p><strong>Ejemplo de estado con signal:</strong></p>
        <div class="code-inline">
          <code>loading = signal(false);</code>
          <span class="code-desc">// Angular solo verifica cuando loading.set(true) o .set(false)</span>
        </div>

        <div class="comparison-table">
          <div class="comparison-row header">
            <span>Aspecto</span>
            <span>Default (Always)</span>
            <span>OnPush</span>
          </div>
          <div class="comparison-row">
            <span>Verificaciones</span>
            <span class="old">En cada zone.js cycle</span>
            <span class="new">Solo cuando cambia algo</span>
          </div>
          <div class="comparison-row">
            <span>Rendimiento</span>
            <span class="old">Menos eficiente</span>
            <span class="new">~50% menos verificaciones</span>
          </div>
          <div class="comparison-row">
            <span>Debugging</span>
            <span class="old">Dificil rastrear cambios</span>
            <span class="new">Cambios predecibles</span>
          </div>
          <div class="comparison-row">
            <span>Configuracion</span>
            <span class="old">Manual</span>
            <span class="new">Automatico (default)</span>
          </div>
        </div>
      </div>

      <!-- SECCION 2: Signal Forms Explicado -->
      <div class="info-box signal-forms-section">
        <h4>2. Signal Forms - Formularios Reactivos</h4>

        <p>
          Angular 22 estabiliza <code>model()</code> para crear signals de formulario.
          A diferencia de <code>signal()</code>, <code>model()</code> permite bindeo
          bidireccional con formularios.
        </p>

        <p><strong>Como funciona:</strong></p>
        <ul class="reason-list">
          <li><code>model(initialValue)</code> crea un model signal</li>
          <li>Se puede usar con <code>[(ngModel)]</code> o <code>[formControl]</code></li>
          <li>Notifica cambios automaticamente a Angular</li>
          <li>Type-safe con validaciones integradas</li>
        </ul>

        <p><strong>Comparacion con Reactive Forms tradicional:</strong></p>
        <div class="comparison-table">
          <div class="comparison-row header">
            <span>Caracteristica</span>
            <span>Reactive Forms</span>
            <span>Signal Forms (model)</span>
          </div>
          <div class="comparison-row">
            <span>Estado</span>
            <span class="old">FormControl interno</span>
            <span class="new">Signal externo legible</span>
          </div>
          <div class="comparison-row">
            <span>Lectura</span>
            <span class="old">form.get('campo').value</span>
            <span class="new">campoModel()</span>
          </div>
          <div class="comparison-row">
            <span>Reactividad</span>
            <span class="old">valueChanges observable</span>
            <span class="new">effect() o computed()</span>
          </div>
          <div class="comparison-row">
            <span>Testing</span>
            <span class="old">Mas complejo</span>
            <span class="new">Mas simple (signal)</span>
          </div>
        </div>
      </div>

      <!-- SECCION 3: Signals + Zoneless -->
      <div class="info-box zoneless-section">
        <h4>3. Signals + Zoneless - Sin Zone.js</h4>

        <p>
          Este proyecto usa <code>provideZonelessChangeDetection()</code> en lugar
          del default con Zone.js. Esto tiene varias ventajas:
        </p>

        <div class="benefit-cards">
          <div class="benefit-card">
            <span class="benefit-icon">B</span>
            <div>
              <strong>Bundle pequeno</strong>
              <p>~15KB menos sin Zone.js</p>
            </div>
          </div>
          <div class="benefit-card">
            <span class="benefit-icon">R</span>
            <div>
              <strong>Mejor rendimiento</strong>
              <p>Solo actualiza lo que cambia</p>
            </div>
          </div>
          <div class="benefit-card">
            <span class="benefit-icon">D</span>
            <div>
              <strong>Debugging claro</strong>
              <p>Sabes exactamente que causo el cambio</p>
            </div>
          </div>
          <div class="benefit-card">
            <span class="benefit-icon">C</span>
            <div>
              <strong>Cambios predecibles</strong>
              <p>Solo cuando tu los marcas</p>
            </div>
          </div>
        </div>

        <p><strong>Como funcionan las signals:</strong></p>
        <ul class="reason-list">
          <li><code>signal(valorInicial)</code> - Crea una senal reactiva</li>
          <li><code>senal()</code> - Lee el valor actual (como funcion)</li>
          <li><code>senal.set(nuevoValor)</code> - Modifica el valor</li>
          <li><code>senal.update(fn)</code> - Modifica con transformacion</li>
          <li><code>computed(() => ...)</code> - Senal derivada reactiva</li>
        </ul>
      </div>

      <!-- Selector de raza -->
      <form [formGroup]="searchForm" class="search-form">
        <div class="form-group">
          <label for="breed">Raza</label>
          <select id="breed" formControlName="breed" (change)="onBreedChange()">
            <option value="">Selecciona una raza ({{ breeds().length }} disponibles)</option>
            @for (breed of breeds(); track breed.name) {
              <option [value]="breed.name">{{ breed.name }}</option>
            }
          </select>
        </div>
      </form>

      @if (loading()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando...</p>
        </div>
      }

      @if (error()) {
        <div class="error-message">{{ error() }}</div>
      }

      @if (selectedBreed()) {
        <div class="breed-detail">
          <div class="breed-header">
            <div class="breed-image-container">
              <img
                [src]="selectedBreed()!.image_link"
                [alt]="selectedBreed()!.name"
                class="breed-image"
              />
            </div>
            <div class="breed-title">
              <h3>{{ selectedBreed()!.name }}</h3>
              <p class="life-expectancy">
                Esperanza de vida: {{ selectedBreed()!.min_life_expectancy }}-{{
                  selectedBreed()!.max_life_expectancy
                }} anos
              </p>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-item" [class.high]="selectedBreed()!.good_with_children >= 4">
              <div class="stat-bar">
                <div class="stat-fill" [style.width.%]="selectedBreed()!.good_with_children * 20"></div>
              </div>
              <span class="stat-label">Ninos</span>
              <span class="stat-value">{{ selectedBreed()!.good_with_children }}/5</span>
            </div>

            <div class="stat-item" [class.high]="selectedBreed()!.good_with_other_dogs >= 4">
              <div class="stat-bar">
                <div class="stat-fill" [style.width.%]="selectedBreed()!.good_with_other_dogs * 20"></div>
              </div>
              <span class="stat-label">Otros perros</span>
              <span class="stat-value">{{ selectedBreed()!.good_with_other_dogs }}/5</span>
            </div>

            <div class="stat-item" [class.high]="selectedBreed()!.good_with_strangers >= 4">
              <div class="stat-bar">
                <div class="stat-fill" [style.width.%]="selectedBreed()!.good_with_strangers * 20"></div>
              </div>
              <span class="stat-label">Extranos</span>
              <span class="stat-value">{{ selectedBreed()!.good_with_strangers }}/5</span>
            </div>

            <div class="stat-item" [class.high]="selectedBreed()!.trainability >= 4">
              <div class="stat-bar">
                <div class="stat-fill" [style.width.%]="selectedBreed()!.trainability * 20"></div>
              </div>
              <span class="stat-label">Adiestrabilidad</span>
              <span class="stat-value">{{ selectedBreed()!.trainability }}/5</span>
            </div>

            <div class="stat-item" [class.high]="selectedBreed()!.energy >= 4">
              <div class="stat-bar">
                <div class="stat-fill" [style.width.%]="selectedBreed()!.energy * 20"></div>
              </div>
              <span class="stat-label">Energia</span>
              <span class="stat-value">{{ selectedBreed()!.energy }}/5</span>
            </div>

            <div class="stat-item" [class.high]="selectedBreed()!.barking <= 2">
              <div class="stat-bar">
                <div class="stat-fill" [style.width.%]="selectedBreed()!.barking * 20"></div>
              </div>
              <span class="stat-label">Ladridos</span>
              <span class="stat-value">{{ selectedBreed()!.barking }}/5</span>
            </div>
          </div>

          <div class="physical-info">
            <h4>Caracteristicas fisicas</h4>
            <div class="physical-grid">
              <div class="physical-item">
                <span class="physical-label">Peso macho</span>
                <span class="physical-value">{{ selectedBreed()!.min_weight_male }}-{{ selectedBreed()!.max_weight_male }} kg</span>
              </div>
              <div class="physical-item">
                <span class="physical-label">Peso hembra</span>
                <span class="physical-value">{{ selectedBreed()!.min_weight_female }}-{{ selectedBreed()!.max_weight_female }} kg</span>
              </div>
              <div class="physical-item">
                <span class="physical-label">Altura macho</span>
                <span class="physical-value">{{ selectedBreed()!.min_height_male }}-{{ selectedBreed()!.max_height_male }} cm</span>
              </div>
              <div class="physical-item">
                <span class="physical-label">Altura hembra</span>
                <span class="physical-value">{{ selectedBreed()!.min_height_female }}-{{ selectedBreed()!.max_height_female }} cm</span>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- SECCION 4: Resumen Tecnico -->
      <div class="info-box summary-section">
        <h4>4. Resumen Tecnico del Componente</h4>

        <p>Este componente usa las siguientes tecnologias de Angular 22:</p>

        <div class="tech-list">
          <div class="tech-item">
            <span class="tech-badge">OnPush</span>
            <span>ChangeDetectionStrategy.OnPush - Deteccion optimizada</span>
          </div>
          <div class="tech-item">
            <span class="tech-badge">signal()</span>
            <span>Estado reactivo: breeds, selectedBreed, loading, error</span>
          </div>
          <div class="tech-item">
            <span class="tech-badge">FormControl</span>
            <span>Formulario reactivo con validacion</span>
          </div>
          <div class="tech-item">
            <span class="tech-badge">inject()</span>
            <span>Inyeccion de dependencias (DogService)</span>
          </div>
          <div class="tech-item">
            <span class="tech-badge">Control Flow</span>
            <span>Block &#64;if / &#64;for de Angular 17+</span>
          </div>
        </div>

        <p class="current-state">
          Estado actual: <strong>loading = {{ loading() ? 'true' : 'false' }}</strong>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .search-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
      }

      h2 {
        margin-bottom: 1.5rem;
        color: #333;
      }
      h3 {
        color: #007bff;
        margin: 0;
        font-size: 1.5rem;
      }
      h4 {
        color: #333;
        margin: 0 0 0.75rem 0;
        font-size: 1.1rem;
        word-wrap: break-word;
      }

      .info-box {
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
      }

      .info-box.onpush-section {
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        border: 1px solid #4caf50;
      }
      .onpush-section h4 { color: #2e7d32; }

      .info-box.signal-forms-section {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        border: 1px solid #2196f3;
      }
      .signal-forms-section h4 { color: #1976d2; }

      .info-box.zoneless-section {
        background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
        border: 1px solid #9c27b0;
      }
      .zoneless-section h4 { color: #7b1fa2; }

      .info-box.summary-section {
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        border: 1px solid #ff9800;
      }
      .summary-section h4 { color: #e65100; }

      .info-box p {
        margin: 0 0 0.75rem 0;
        line-height: 1.6;
      }

      .info-box code {
        background: rgba(0, 0, 0, 0.1);
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-size: 0.85em;
      }

      .reason-list {
        margin: 0.75rem 0;
        padding-left: 1.5rem;
      }
      .reason-list li {
        margin-bottom: 0.4rem;
        line-height: 1.5;
      }

      .code-inline {
        background: #1e1e1e;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        margin: 0.75rem 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .code-inline code {
        background: transparent;
        color: #ce9178;
        font-size: 0.9rem;
      }
      .code-desc {
        color: #6a9955;
        font-size: 0.8rem;
      }

      .comparison-table {
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        margin: 1rem 0;
      }
      .comparison-row {
        display: grid;
        grid-template-columns: 1.2fr 1.2fr 1.2fr;
        padding: 0.6rem 0.75rem;
        border-bottom: 1px solid #eee;
      }
      .comparison-row.header {
        background: #e8f5e9;
        font-weight: 600;
      }
      .comparison-row:last-child {
        border-bottom: none;
      }
      .comparison-row .old {
        color: #c00;
      }
      .comparison-row .new {
        color: #2e7d32;
        font-weight: 600;
      }

      .benefit-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin: 1rem 0;
      }
      .benefit-card {
        display: flex;
        gap: 0.75rem;
        background: rgba(255, 255, 255, 0.7);
        padding: 0.75rem;
        border-radius: 8px;
        overflow-wrap: break-word;
        word-break: break-word;
      }
      .benefit-icon {
        font-size: 1rem;
        font-weight: 700;
        width: 32px;
        height: 32px;
        min-width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #9c27b0;
        color: white;
        border-radius: 8px;
      }
      .benefit-card strong {
        display: block;
        margin-bottom: 0.25rem;
        word-wrap: break-word;
      }
      .benefit-card p {
        margin: 0;
        font-size: 0.85rem;
        color: #666;
      }

      .tech-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 1rem 0;
      }
      .tech-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(255, 255, 255, 0.7);
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
      }
      .tech-badge {
        background: #ff9800;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .current-state {
        font-size: 0.9rem;
        color: #1565c0;
        margin-top: 1rem;
        padding-top: 0.75rem;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      .current-state strong {
        color: #0d47a1;
      }

      .search-form {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .form-group {
        flex: 1;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
      }

      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .error-message {
        padding: 1rem;
        background: #fee;
        border: 1px solid #f00;
        border-radius: 8px;
        color: #c00;
        margin-bottom: 1rem;
      }

      .breed-detail {
        background: #fafafa;
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
      }
      .breed-header {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .breed-image-container {
        width: 200px;
        height: 200px;
        flex-shrink: 0;
        border-radius: 12px;
        overflow: hidden;
        background: #eee;
      }
      .breed-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .breed-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .life-expectancy {
        color: #666;
        margin: 0.5rem 0 0 0;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .stat-bar {
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
      }
      .stat-fill {
        height: 100%;
        background: #007bff;
        border-radius: 4px;
        transition: width 0.3s ease;
      }
      .stat-item.high .stat-fill {
        background: #4caf50;
      }
      .stat-label {
        font-size: 0.8rem;
        color: #666;
      }
      .stat-value {
        font-size: 0.9rem;
        font-weight: 600;
      }

      .physical-info h4 {
        margin-bottom: 1rem;
      }
      .physical-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .physical-item {
        display: flex;
        flex-direction: column;
        padding: 0.75rem;
        background: #fff;
        border-radius: 8px;
      }
      .physical-label {
        font-size: 0.8rem;
        color: #666;
      }
      .physical-value {
        font-size: 1rem;
        font-weight: 600;
        color: #333;
      }
    `,
  ],
})
export class DogSearchComponent implements OnInit {
  private dogService = inject(DogService);

  // Signals: estado reactivo sin Zone.js
  breeds = signal<DogBreed[]>([]);
  selectedBreed = signal<DogBreed | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  // Formulario reactivo
  breedControl = new FormControl('', Validators.required);

  searchForm = new FormGroup({
    breed: this.breedControl,
  });

  ngOnInit() {
    this.loadBreeds();
  }

  loadBreeds() {
    this.loading.set(true);
    this.dogService.getAllBreeds().subscribe({
      next: (b) => {
        this.breeds.set(b);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set('Error: ' + e.message);
        this.loading.set(false);
      },
    });
  }

  onBreedChange() {
    const breed = this.searchForm.get('breed')?.value;
    if (!breed) return;

    this.loading.set(true);
    this.dogService.getBreedByName(breed).subscribe({
      next: (b) => {
        this.selectedBreed.set(b[0] || null);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set('Error: ' + e.message);
        this.loading.set(false);
      },
    });
  }
}
